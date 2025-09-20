/// /app/api/contentful/webhook/route.js
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// If you hit crypto issues on Edge runtime, uncomment:
// export const runtime = 'nodejs';

export async function POST(req) {
    // If you configured a custom header secret in Contentful (NOT HMAC):
    const secret = req.headers.get('x-contentful-secret');
    if (process.env.CONTENTFUL_WEBHOOK_SECRET && secret !== process.env.CONTENTFUL_WEBHOOK_SECRET) {
        return new NextResponse('Invalid secret', { status: 401 });
    }

    // Parse body
    let body = null;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ ok: true, skipped: true, reason: 'bad json' });
    }
    if (!body?.sys) {
        return NextResponse.json({ ok: true, skipped: true, reason: 'No sys in payload' });
    }

    const id = body.sys.id;
    const contentType = body?.sys?.contentType?.sys?.id;

    const slug =
        body?.fields?.slug && typeof body.fields.slug === 'object'
            ? Object.values(body.fields.slug)[0]
            : null;

    if (contentType === 'bulletin') {
        // listing
        revalidatePath('/bulletin', 'page');
        // detail by id
        if (id) revalidatePath(`/bulletin/${id}`, 'page');
        // if/when you switch to slug
        // if (slug) revalidatePath(`/bulletin/${slug}`, 'page');
    }

    return NextResponse.json({ ok: true, revalidated: true, id, slug, contentType });
}