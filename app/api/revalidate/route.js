// /app/api/revalidate/route.js
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { revalidatePath } from 'next/cache';

// Optional: force Node runtime if you run into edge/crypto issues
// export const runtime = 'nodejs';

const SHARED_SECRET = process.env.CONTENTFUL_WEBHOOK_SECRET || '';

function verifyHMAC(rawBody, sigHeader) {
    if (!SHARED_SECRET) return true; // skip if you didn’t set a secret
    if (!sigHeader) return false;
    const hmac = crypto.createHmac('sha256', SHARED_SECRET).update(rawBody).digest('hex');
    try {
        return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(sigHeader));
    } catch {
        return false;
    }
}

// Small sleep util
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// OPTIONAL: ping Contentful CDA to “ensure” propagation before revalidating.
// If you don’t want outbound calls here, you can just keep the waits.
async function ensureCDAVisible(entryId) {
    if (!entryId) return;
    const space = process.env.CONTENTFUL_SPACE_ID;
    const env = process.env.CONTENTFUL_ENVIRONMENT || 'master';
    const token = process.env.CONTENTFUL_CDA_TOKEN;
    if (!space || !token) return;

    const url = `https://cdn.contentful.com/spaces/${space}/environments/${env}/entries/${entryId}`;
    const opts = { headers: { Authorization: `Bearer ${token}` } };

    // Try up to ~2 seconds total
    for (let i = 0; i < 4; i++) {
        try {
            const res = await fetch(url, opts);
            if (res.ok) return; // visible
        } catch {}
        await wait(500);
    }
}

export async function POST(req) {
    // --- 1) Read raw body FIRST (needed for HMAC) ---
    const raw = await req.text();

    // --- 2) Verify signature (HMAC) ---
    const sig = req.headers.get('x-contentful-signature');
    if (!verifyHMAC(raw, sig)) {
        // If you are intentionally using a **custom** header instead of HMAC, keep this fallback:
        const custom = req.headers.get('x-contentful-secret');
        if (!(SHARED_SECRET && custom === SHARED_SECRET)) {
            return new NextResponse('Unauthorized', { status: 401 });
        }
    }

    // --- 3) Parse payload ---
    let body;
    try {
        body = JSON.parse(raw);
    } catch {
        return NextResponse.json({ ok: false, reason: 'invalid json' }, { status: 400 });
    }

    const topic = req.headers.get('x-contentful-topic') || ''; // e.g., ContentManagement.Entry.publish
    const isEntryPublish = topic.endsWith('Entry.publish');

    // Pull identifiers
    const id = body?.sys?.id || null;
    const fields = body?.fields || {};
    const slug =
        (fields?.slug && typeof fields.slug === 'object'
            ? Object.values(fields.slug)[0]
            : fields?.slug) || null;

    // --- 4) Only act on publish events (you can broaden if you wish) ---
    if (isEntryPublish) {
        // Give CDA a moment to catch up to avoid caching an old list
        await ensureCDAVisible(id);
        if (!id) await wait(500); // minimal safety wait if we don't have an id

        // Always revalidate the listing so new posts appear
        revalidatePath('/bulletin'); // listing

        // Revalidate detail pages (both id and slug if present)
        if (id) revalidatePath(`/bulletin/${id}`);
        if (slug) revalidatePath(`/bulletin/${slug}`);
    }

    return NextResponse.json({
        ok: true,
        topic,
        revalidated: isEntryPublish ? ['/_bulletin_', id && `/bulletin/${id}`, slug && `/bulletin/${slug}`].filter(Boolean) : [],
        id,
        slug,
    });
}