// /app/api/revalidate/route.js
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { revalidatePath } from 'next/cache';

// export const runtime = 'nodejs'; // uncomment if you hit edge/crypto issues

const SHARED_SECRET = process.env.CONTENTFUL_WEBHOOK_SECRET || '';

function verifyHMAC(rawBody, sigHeader) {
    if (!SHARED_SECRET) return true; // allow if secret not set
    if (!sigHeader) return false;
    const hmac = crypto.createHmac('sha256', SHARED_SECRET).update(rawBody).digest('hex');
    try {
        return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(sigHeader));
    } catch {
        return false;
    }
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function ensureCDAVisible(entryId) {
    if (!entryId) return;
    const space = process.env.CONTENTFUL_SPACE_ID;
    const env = process.env.CONTENTFUL_ENVIRONMENT || 'master';
    const token = process.env.CONTENTFUL_CDA_TOKEN;
    if (!space || !token) return;

    const url = `https://cdn.contentful.com/spaces/${space}/environments/${env}/entries/${entryId}`;
    const opts = { headers: { Authorization: `Bearer ${token}` } };

    // Try up to ~2s
    for (let i = 0; i < 4; i++) {
        try {
            const res = await fetch(url, opts);
            if (res.ok) return;
        } catch {}
        await wait(500);
    }
}

export async function POST(req) {
    // 1) Raw body for HMAC
    const raw = await req.text();

    // 2) Verify signature
    const sig = req.headers.get('x-contentful-signature');
    if (!verifyHMAC(raw, sig)) {
        // fallback to shared secret header if you use that
        const custom = req.headers.get('x-contentful-secret');
        if (!(SHARED_SECRET && custom === SHARED_SECRET)) {
            return new NextResponse('Unauthorized', { status: 401 });
        }
    }

    // 3) Parse payload
    let body;
    try {
        body = JSON.parse(raw);
    } catch {
        return NextResponse.json({ ok: false, reason: 'invalid json' }, { status: 400 });
    }

    // What happened?
    const topic = req.headers.get('x-contentful-topic') || ''; // e.g. ContentManagement.Entry.publish
    const isEntryPublish   = topic.endsWith('Entry.publish');
    const isEntryUnpublish = topic.endsWith('Entry.unpublish') || topic.endsWith('Entry.archive') || topic.endsWith('Entry.delete');

    // Identify content type + ids
    const sys = body?.sys || {};
    const entryId = sys?.id || null;
    const contentType =
        sys?.contentType?.sys?.id ||
        sys?.contentTypeId || // some older webhook templates
        null;

    // Slug can be localized; pick any present value
    const fields = body?.fields || {};
    const slug =
        (fields?.slug && typeof fields.slug === 'object'
            ? Object.values(fields.slug)[0]
            : fields?.slug) || null;

    // 4) Act on publish/unpublish/archival — anything that changes visibility
    if (isEntryPublish || isEntryUnpublish) {
        // Give CDA a moment to catch up (mainly for publish)
        if (isEntryPublish) {
            await ensureCDAVisible(entryId);
            if (!entryId) await wait(500);
        }

        // Always revalidate list pages (cheap + safe)
        revalidatePath('/bulletin');
        revalidatePath('/events');

        // Type-specific detail pages
        if (contentType === 'bulletin') {
            if (entryId) revalidatePath(`/bulletin/${entryId}`);
            if (slug)    revalidatePath(`/bulletin/${slug}`); // only if you ever switch detail route to slug
        }

        if (contentType === 'event') {
            // Detail route uses slug
            if (slug)    revalidatePath(`/events/${slug}`);
            // If you ever have an ID-based fallback:
            if (entryId) revalidatePath(`/events/${entryId}`);
        }
    }

    return NextResponse.json({
        ok: true,
        topic,
        contentType,
        id: entryId,
        slug,
        revalidated: true,
    });
}
