// /app/events/page.js
export const revalidate = 60;

import { cfClient } from '@/lib/contentful';
import EventTile from './_components/EventTile';

export const metadata = {
    title: 'Events | The STORY',
    description: 'Upcoming events and gatherings at The STORY Worshiping Community',
};

/**
 * FIXED DATE HELPER
 * Ensures dates are displayed according to Atlanta (Eastern) Time
 * to prevent the "one day ahead/behind" UTC shift issue.
 */
function formatDateLabel(iso) {
    if (!iso) return '';
    try {
        return new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            timeZone: 'America/New_York', // Forces Atlanta Time
        }).format(new Date(iso));
    } catch (e) {
        console.error("Date formatting error:", e);
        return iso;
    }
}

export default async function EventsPage() {
    // Fetch entries from Contentful
    const res = await cfClient.getEntries({
        content_type: 'event',
        order: ['-fields.date'], // Show newest events first
        limit: 60,
        select: 'sys.id,fields.title,fields.slug,fields.date,fields.poster',
    });

    const items = res?.items ?? [];

    return (
        <main className="min-h-screen bg-gray-50">
            <section className="mx-auto max-w-6xl px-4 py-10">
                <h1 className="about-title">Event</h1>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((e) => {
                        const f = e.fields || {};
                        const asset = f.poster?.fields?.file;

                        // Clean up URL
                        const posterUrl = asset?.url
                            ? (asset.url.startsWith('http')
                                ? asset.url
                                : `https:${asset.url}`)
                            : '';

                        // Logic to detect video for the Tile component
                        const isVideo = asset?.contentType?.includes('video');

                        return (
                            <EventTile
                                key={e.sys.id}
                                href={`/events/${f.slug || e.sys.id}`}
                                title={f.title || 'Untitled Event'}
                                dateText={formatDateLabel(f.date)}
                                imageSrc={posterUrl || '/placeholder.png'}
                                imageAlt={f.title || 'Event'}
                                isVideo={isVideo} // Pass video status to component
                            />
                        );
                    })}
                </div>

                {/* Empty State */}
                {items.length === 0 && (
                    <div className="mt-8 rounded-xl bg-white p-6 text-gray-700 shadow text-center">
                        아직 이벤트가 없습니다.
                    </div>
                )}

                {/* Developer Debug Info */}
                <small className="block opacity-40 mt-10 text-center">
                    Rendered at: {new Date().toLocaleTimeString()} (Eastern) • items: {items.length}
                </small>
            </section>
        </main>
    );
}
