/// /app/events/page.js
export const revalidate = 60;

import { cfClient } from '@/lib/contentful';
import EventTile from './_components/EventTile';

export const metadata = {
    title: 'Events',
    description: 'Upcoming events and gatherings',
};

function formatDateLabel(iso) {
    if (!iso) return '';
    try {
        return new Date(iso).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    } catch {
        return iso;
    }
}

export default async function EventsPage() {
    const res = await cfClient.getEntries({
        content_type: 'event',
        // Uncomment next line if you created a `published` (Boolean) field and editors check it
        // 'fields.published': true,
        order: ['-fields.date'], // newest first (flip to 'fields.date' for oldest first)
        limit: 60,
        // No `locale` here so you don't accidentally filter out entries
        select: 'sys.id,fields.title,fields.slug,fields.date,fields.poster',
    });

    const items = res?.items ?? [];

    return (
        <main className="min-h-screen bg-gray-50">
            <section className="mx-auto max-w-6xl px-4 py-10">
                <h1 className="text-3xl font-bold" style={{ color: "#28C3EA" }}>Events</h1>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((e) => {
                        const f = e.fields || {};
                        const poster = f.poster?.fields?.file?.url
                            ? (f.poster.fields.file.url.startsWith('http')
                                ? f.poster.fields.file.url
                                : `https:${f.poster.fields.file.url}`)
                            : '';

                        return (
                            <EventTile
                                key={e.sys.id}
                                href={`/events/${f.slug || e.sys.id}`} // fall back to id if slug missing (debug-friendly)
                                title={f.title || 'Untitled Event'}
                                dateText={formatDateLabel(f.date)}
                                imageSrc={poster || '/placeholder.png'}
                                imageAlt={f.title || 'Event'}
                            />
                        );
                    })}
                </div>

                {items.length === 0 && (
                    <div className="mt-8 rounded-xl bg-white p-6 text-gray-700 shadow">
                        아직 이벤트가 없습니다.
                    </div>
                )}

                <small className="block opacity-60 mt-6">
                    Rendered at: {new Date().toISOString()} • items: {items.length}
                </small>
            </section>
        </main>
    );
}
