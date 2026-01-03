// /app/events/[slug]/page.js

export const revalidate = 60;
export const dynamicParams = true;

import { cfClient } from '@/lib/contentful';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

// ----------------------------
// Constants & Helpers
// ----------------------------
const LOCALES = ['en-US', 'ko-KR', 'en'];
const SITE_TZ = 'America/New_York';

const fmtDateTime = (iso, locale = 'ko-KR') =>
    iso
        ? new Intl.DateTimeFormat(locale, {
            timeZone: SITE_TZ,
            dateStyle: 'long',
            timeStyle: 'short',
        }).format(new Date(iso))
        : '';

async function getEventWithFallback(slug) {
    if (!slug) return { entry: null, locale: null };
    for (const loc of LOCALES) {
        try {
            const res = await cfClient.getEntries({
                content_type: 'event',
                'fields.slug': slug,
                include: 2,
                limit: 1,
                locale: loc,
            });
            if (res.items?.length) return { entry: res.items[0], locale: loc };
        } catch (_) {}
    }
    return { entry: null, locale: null };
}

export async function generateStaticParams() { return []; }

// ----------------------------
// Main Component
// ----------------------------
export default async function EventDetail({ params }) {
    const { slug } = await params;
    const { entry, locale } = await getEventWithFallback(slug);

    if (!entry?.fields) return notFound();

    const f = entry.fields;

    // Check if poster is an image or video
    const asset = f.poster?.fields?.file;
    const fileUrl = asset?.url ? (asset.url.startsWith('http') ? asset.url : `https:${asset.url}`) : null;
    const isVideo = asset?.contentType?.includes('video');

    const divider = (
        <hr style={{ margin: '1.5rem 0', border: 'none', borderTop: '2px solid #ccc' }} />
    );

    return (
        <section className="about-section" style={{ fontSize: '1rem', color: '#777' }}>
            <div className="content-container" style={{ textAlign: 'left', maxWidth: 700, margin: '0 auto', padding: '0 1rem' }}>

                {/* Media Section: Handles Image OR MP4 Video */}
                {fileUrl && (
                    <div style={{ margin: '1rem 0 1.25rem' }}>
                        {isVideo ? (
                            <video
                                src={fileUrl}
                                className="w-full h-auto rounded-xl shadow"
                                controls
                                autoPlay
                                muted
                                loop
                                playsInline
                                style={{ width: '100%', borderRadius: '12px' }}
                            />
                        ) : (
                            <Image
                                src={fileUrl}
                                alt={f.title || 'Event Poster'}
                                width={1200}
                                height={1600}
                                className="w-full h-auto rounded-xl shadow"
                                unoptimized
                                priority
                            />
                        )}
                    </div>
                )}

                {/* Event Title */}
                <h1 className="about-title" style={{ fontSize: '1.5rem', color: '#28C3EA', fontWeight: 'bold', marginBottom: '1rem' }}>
                    {f.title || 'Event'}
                </h1>

                {/* Event Details */}
                <div style={{ fontSize: '1.05rem', fontWeight: 500, marginTop: '0.75rem', lineHeight: '1.8' }}>
                    {f.date && (
                        <p style={{ margin: 0 }}>
                            <span style={{ color: '#28C3EA', fontWeight: 'bold', minWidth: '4rem', display: 'inline-block' }}>일정</span>{' '}
                            <span style={{ color: '#777' }}>{fmtDateTime(f.date)}</span>
                        </p>
                    )}
                    {f.location && (
                        <p style={{ margin: 0 }}>
                            <span style={{ color: '#28C3EA', fontWeight: 'bold', minWidth: '4rem', display: 'inline-block' }}>장소</span>{' '}
                            <span style={{ color: '#777' }}>{f.location}</span>
                        </p>
                    )}
                    {f.address && (
                        <p style={{ margin: 0 }}>
                            <span style={{ color: '#28C3EA', fontWeight: 'bold', minWidth: '4rem', display: 'inline-block' }}>주소</span>{' '}
                            <span style={{ color: '#777' }}>{f.address}</span>
                        </p>
                    )}
                </div>

                {divider}

                {/* Rich Text Body */}
                {f.body && (
                    <div style={{ color: '#777', fontSize: '1.05rem', marginBottom: '2rem' }}>
                        {documentToReactComponents(f.body)}
                    </div>
                )}

                {/* Map Embed */}
                {f.mapEmbedUrl && (
                    <>
                        {(f.body || isVideo) && divider}
                        <h3 style={{ color: '#28C3EA', fontWeight: 'bold', marginBottom: '1rem' }}>지도 Location</h3>
                        <div style={{ margin: '0.75rem 0 1.5rem' }}>
                            <iframe
                                src={f.mapEmbedUrl}
                                width="100%"
                                height="400"
                                style={{ border: 0 }}
                                loading="lazy"
                                className="rounded-xl shadow"
                            />
                        </div>
                    </>
                )}

                {/* Back Link */}
                <div style={{ marginTop: '3rem', textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '2rem' }}>
                    <a href="/events" style={{ color: '#28C3EA', fontWeight: 'bold', textDecoration: 'none' }}>
                        ← 목록으로 돌아가기 (Back to Events)
                    </a>
                </div>
            </div>
        </section>
    );
}