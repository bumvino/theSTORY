// /app/events/[slug]/page.js

export const revalidate = 60;
export const dynamicParams = true;

import { cfClient } from '@/lib/contentful';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

// ----------------------------
// Locale + Timezone constants
// ----------------------------
const LOCALES = ['en-US', 'ko-KR', 'en'];
const SITE_TZ = 'America/New_York';

// Helper: consistent Eastern time formatting
const fmtDateTime = (iso, locale = 'ko-KR') =>
    iso
        ? new Intl.DateTimeFormat(locale, {
            timeZone: SITE_TZ,
            dateStyle: 'long',
            timeStyle: 'short',
        }).format(new Date(iso))
        : '';

// ----------------------------
// Fetch with locale fallback
// ----------------------------
async function getEventWithFallback(slug) {
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

export async function generateStaticParams() {
    return [];
}

export async function generateMetadata({ params }) {
    const { entry } = await getEventWithFallback(params.slug);
    const f = entry?.fields || {};
    const title = f.title || 'Event';
    return {
        title: `${title} | The STORY`,
        description: f.excerpt || f.title || '',
        openGraph: { title: `${title} | The STORY`, description: f.excerpt || f.title },
        twitter: { title: `${title} | The STORY` },
    };
}

// ----------------------------
// Rich Text render options
// ----------------------------
const rtOptions = {
    renderMark: {
        [MARKS.BOLD]: (text) => <strong style={{ fontWeight: 700 }}>{text}</strong>,
        [MARKS.ITALIC]: (text) => <em style={{ fontStyle: 'italic' }}>{text}</em>,
    },
    renderNode: {
        [BLOCKS.HEADING_2]: (_n, ch) => (
            <h2
                style={{
                    fontSize: '1.25rem',
                    margin: '1.1rem 0 0.5rem',
                    lineHeight: 1.3,
                    color: '#333',
                }}
            >
                {ch}
            </h2>
        ),
        [BLOCKS.PARAGRAPH]: (_n, ch) => <p style={{ margin: '0.4rem 0', lineHeight: 1.6 }}>{ch}</p>,
        [BLOCKS.UL_LIST]: (_n, ch) => (
            <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', margin: '0.6rem 0' }}>{ch}</ul>
        ),
        [BLOCKS.OL_LIST]: (_n, ch) => (
            <ol style={{ listStyle: 'decimal', paddingLeft: '1.5rem', margin: '0.6rem 0' }}>{ch}</ol>
        ),
        [BLOCKS.LIST_ITEM]: (_n, ch) => <li style={{ margin: '0.25rem 0' }}>{ch}</li>,
        [BLOCKS.HR]: () => (
            <hr style={{ border: 'none', borderTop: '1px solid #e5e5e5', margin: '1rem 0' }} />
        ),
    },
};

// ----------------------------
// Main Component
// ----------------------------
export default async function EventDetail({ params }) {
    const { entry, locale } = await getEventWithFallback(params.slug);
    if (!entry?.fields) return notFound();

    const f = entry.fields;
    const imgUrl = f.poster?.fields?.file?.url
        ? f.poster.fields.file.url.startsWith('http')
            ? f.poster.fields.file.url
            : `https:${f.poster.fields.file.url}`
        : null;

    const divider = (
        <hr style={{ margin: '1.5rem 0', border: 'none', borderTop: '2px solid #ccc' }} />
    );

    return (
        <section className="about-section" style={{ fontSize: '1rem', color: '#777' }}>
            <div
                className="content-container"
                style={{ textAlign: 'left', maxWidth: 700, margin: '0 auto', padding: '0 1rem' }}
            >
                {/* Poster */}
                {imgUrl && (
                    <div style={{ margin: '1rem 0 1.25rem' }}>
                        <Image
                            src={imgUrl}
                            alt={f.title || 'Event Poster'}
                            width={1200}
                            height={1600}
                            className="w-full h-auto rounded-xl shadow"
                            unoptimized
                            priority
                        />
                    </div>
                )}

                {/* Title */}
                <h1
                    className="about-title"
                    style={{ fontSize: '1.3rem', color: '#28C3EA', fontWeight: 'bold' }}
                >
                    {f.title || 'Event'}
                </h1>

                {/* Date, Location, Address */}
                <p style={{ fontSize: '1.05rem', fontWeight: 500, marginTop: '0.75rem' }}>
                    {f.date && (
                        <>
                            <span style={{ color: '#28C3EA', fontWeight: 'bold' }}>일정</span>{' '}
                            <span style={{ color: '#777' }}>{fmtDateTime(f.date)}</span>
                            <br />
                        </>
                    )}
                    {f.location && (
                        <>
                            <span style={{ color: '#28C3EA', fontWeight: 'bold' }}>장소</span>{' '}
                            <span style={{ color: '#777' }}>{f.location}</span>
                            <br />
                        </>
                    )}
                    {f.address && (
                        <>
                            <span style={{ color: '#28C3EA', fontWeight: 'bold' }}>주소</span>{' '}
                            <span style={{ color: '#777' }}>{f.address}</span>
                        </>
                    )}
                </p>

                {divider}

                {/* Rich Text Body */}
                {f.body ? (
                    <div style={{ color: '#777', fontSize: '1rem' }}>
                        {documentToReactComponents(f.body, rtOptions)}
                    </div>
                ) : (
                    <em>상세 내용이 없습니다.</em>
                )}

                {/* Map Embed */}
                {f.mapEmbedUrl && (
                    <>
                        {divider}
                        <div style={{ margin: '0.75rem 0 1.5rem' }}>
                            <iframe
                                src={f.mapEmbedUrl}
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="rounded-xl shadow"
                            />
                        </div>
                    </>
                )}

                {/* Debug info */}
                <small style={{ display: 'block', marginTop: 24, opacity: 0.6 }}>
                    Rendered at: {new Date().toISOString()} {locale && `• locale: ${locale}`}
                </small>
            </div>
        </section>
    );
}
