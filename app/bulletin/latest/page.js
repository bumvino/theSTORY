// app/bulletin/latest/page.js

// 1. DISABLE CACHE: Force this page to run fresh on every request
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { cfClient } from '@/lib/contentful';
import { redirect } from 'next/navigation';

export default async function LatestBulletinRedirect() {
    // 2. Fetch the single most recent bulletin
    const res = await cfClient.getEntries({
        content_type: 'bulletin',
        // Sort priority:
        // 1. Date (Newest date first)
        // 2. Week Number (Highest number first)
        // 3. Created At (Just in case dates are same, pick the one made last)
        order: ['-fields.date', '-fields.weekNumber', '-sys.createdAt'],
        limit: 1,
        select: 'sys.id',
    });

    const latestId = res.items[0]?.sys.id;

    // 3. Redirect logic
    if (latestId) {
        redirect(`/bulletin/${latestId}`);
    } else {
        // If no bulletins exist at all, go to the archive list
        redirect('/bulletin');
    }
}