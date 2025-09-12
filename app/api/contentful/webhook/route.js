import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// Optional: If you’re using the App Router (you are), this is fine.
// If you ever need to force Node runtime: export const runtime = 'nodejs';

export async function POST(req) {
    // 1) verify secret (recommended)
    const secret = req.headers.get('x-contentful-secret');
    if (process.env.CONTENTFUL_WEBHOOK_SECRET && secret !== process.env.CONTENTFUL_WEBHOOK_SECRET) {
        return new NextResponse('Invalid secret', { status: 401 });
    }

    // 2) parse the webhook body safely
    const body = await req.json().catch(() => null);
    if (!body?.sys) {
        return NextResponse.json({ ok: true, skipped: true, reason: 'No sys in payload' });
    }

    const id = body.sys.id; // entry sys.id
    const contentType = body?.sys?.contentType?.sys?.id;

    // If you enabled "Include content" in Contentful webhook, you can pick up slug too:
    const slug =
        body?.fields?.slug && typeof body.fields.slug === 'object'
            ? Object.values(body.fields.slug)[0] // first locale value
            : null;

    // 3) revalidate bulletin pages only
    if (contentType === 'bulletin') {
        // a) list page
        revalidatePath('/bulletin', 'page');

        // b) detail page (ID route — your current setup)
        if (id) revalidatePath(`/bulletin/${id}`, 'page');

        // If you ever switch to a slug route ([slug]), uncomment this:
        // if (slug) revalidatePath(`/bulletin/${slug}`, 'page');
    }

    return NextResponse.json({ ok: true, revalidated: true, id, slug });
}