// /app/bulletin/[id]/page.js

// Rebuild this route at most every 60s (ISR)
export const revalidate = 60;
// Allow new IDs after build
export const dynamicParams = true;

import { cfClient } from '@/lib/contentful';
import { notFound } from 'next/navigation';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

// --- Try locales in order; adjust to your space ---
const LOCALES = ['en-US', 'ko-KR', 'en'];

// ---------- Helpers ----------
async function getEntryWithFallback(id) {
    if (!id) return { entry: null, locale: null };

    // 1) Try default locale first (important after Next.js update)
    try {
        const e = await cfClient.getEntry(id);
        if (e?.fields) return { entry: e, locale: 'default' };
    } catch (_) {
        // ignore
    }

    // 2) Try explicit locales
    for (const loc of LOCALES) {
        try {
            const e = await cfClient.getEntry(id, { locale: loc });
            if (e?.fields) return { entry: e, locale: loc };
        } catch (_) {
            // ignore and try next locale
        }
    }
    return { entry: null, locale: null };
}

// --- Rich Text render options ---
const rtOptions = {
    renderMark: {
        [MARKS.BOLD]: (text) => <strong style={{ fontWeight: 700 }}>{text}</strong>,
        [MARKS.ITALIC]: (text) => <em style={{ fontStyle: 'italic' }}>{text}</em>,
    },
    renderNode: {
        [BLOCKS.HEADING_1]: (_n, ch) => (
            <h1 style={{ fontSize: '1.4rem', margin: '1.25rem 0 0.5rem', lineHeight: 1.25, color: '#333' }}>{ch}</h1>
        ),
        [BLOCKS.HEADING_2]: (_n, ch) => (
            <h2 style={{ fontSize: '1.25rem', margin: '1.1rem 0 0.5rem', lineHeight: 1.3, color: '#333' }}>{ch}</h2>
        ),
        [BLOCKS.HEADING_3]: (_n, ch) => (
            <h3 style={{ fontSize: '1.15rem', margin: '1rem 0 0.5rem', lineHeight: 1.35, color: '#333' }}>{ch}</h3>
        ),
        [BLOCKS.HEADING_4]: (_n, ch) => (
            <h4 style={{ fontSize: '1.05rem', margin: '0.9rem 0 0.4rem', lineHeight: 1.4, color: '#333' }}>{ch}</h4>
        ),
        [BLOCKS.PARAGRAPH]: (_n, ch) => <p style={{ margin: '0.4rem 0', lineHeight: 1.6 }}>{ch}</p>,
        [BLOCKS.UL_LIST]: (_n, ch) => (
            <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', margin: '0.6rem 0' }}>{ch}</ul>
        ),
        [BLOCKS.OL_LIST]: (_n, ch) => (
            <ol style={{ listStyle: 'decimal', paddingLeft: '1.5rem', margin: '0.6rem 0' }}>{ch}</ol>
        ),
        [BLOCKS.LIST_ITEM]: (_n, ch) => <li style={{ margin: '0.25rem 0' }}>{ch}</li>,
        [BLOCKS.HR]: () => <hr style={{ border: 'none', borderTop: '1px solid #e5e5e5', margin: '1rem 0' }} />,
    },
};

// ---------- Pre-generate static params for ISR ----------
export async function generateStaticParams() {
    // Don’t force a locale here; let Contentful use the default so we at least get IDs.
    const res = await cfClient.getEntries({
        content_type: 'bulletin',
        select: 'sys.id',
        limit: 200,
    });
    return (res.items || []).map((i) => ({ id: i.sys.id }));
}

// ---------- SEO ----------
export async function generateMetadata({ params }) {
    const { id } = await Promise.resolve(params);
    try {
        const { entry } = await getEntryWithFallback(id);
        const f = entry?.fields || {};
        const title = f.title || (f.weekNumber ? `주일예배 Week ${f.weekNumber}` : 'Bulletin');
        return {
            title: `${title} | The STORY`,
            openGraph: { title: `${title} | The STORY` },
            twitter: { title: `${title} | The STORY` },
        };
    } catch {
        return { title: 'Bulletin | The STORY' };
    }
}

// ---------- Main component ----------
export default async function BulletinDetail({ params }) {
    const { id } = await Promise.resolve(params);

    const { entry, locale: resolvedLocale } = await getEntryWithFallback(id);
    if (!entry?.fields) return notFound();

    const f = entry.fields;

    const divider = (
        <hr style={{ margin: '1.5rem 0', border: 'none', borderTop: '2px solid #ccc' }} />
    );

    return (
        <section className="about-section" style={{ fontSize: '1rem', color: '#777' }}>
            <div
                className="content-container"
                style={{ textAlign: 'left', maxWidth: 700, margin: '0 auto', padding: '0 1rem' }}
            >
                {/* Title */}
                <h1 className="about-title" style={{ fontSize: '1.3rem', color: '#28C3EA', fontWeight: 'bold' }}>
                    {f.title || <>주일예배 Week {f.weekNumber ?? '—'}</>}
                </h1>

                {/* 장소 / 시간 */}
                <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>
                    <span style={{ color: '#28C3EA', fontWeight: 'bold' }}>장소</span>{' '}
                    <span style={{ color: '#777' }}>{f.location || '—'}</span>
                    <br />
                    <span style={{ color: '#28C3EA', fontWeight: 'bold' }}>시간</span>{' '}
                    <span style={{ color: '#777' }}>{f.serviceTime || '—'}</span>
                </p>

                {divider}

                {/* 말씀 / Sermon */}
                <div style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.3rem' }}>
                        <span style={{ color: '#28C3EA', fontWeight: 'bold', minWidth: '4.5rem' }}>말씀</span>
                        <span style={{ color: '#777' }}>{f.preacher || '—'}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <span style={{ color: '#28C3EA', fontWeight: 'bold', minWidth: '4.5rem' }}>Sermon</span>
                        <span style={{ color: '#777' }}>{f.preacherEng || '—'}</span>
                    </div>
                </div>

                {/* 제목(중앙) + 본문(우측) */}
                <div style={{ fontSize: '1.1rem', color: '#777' }}>
                    <p style={{ textAlign: 'center', margin: '0 0 0.5rem' }}>
                        “{f.sermonTitle || '—'}”
                    </p>
                    {f.sermonTitleEng && (
                        <p
                            style={{
                                textAlign: 'center',
                                margin: '0.5rem 0 1.5rem',
                                fontSize: '0.8rem',
                                color: '#777',
                            }}
                        >
                            {f.sermonTitleEng}
                        </p>
                    )}
                    <p
                        style={{
                            textAlign: 'right',
                            margin: '0.25rem 0 0',
                            color: '#28C3EA',
                            fontWeight: 'bold',
                            marginBottom: '1.5rem',
                        }}
                    >
                        {f.scriptureReference || ''}
                    </p>
                </div>

                {divider}

                {/* Announcement (Rich Text) */}
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#28C3EA' }}>
                    더스토리 소식 Announcement
                </h3>
                <div className="announcement-content" style={{ color: '#777', fontSize: '1rem' }}>
                    {f.announcements?.content?.length
                        ? documentToReactComponents(f.announcements, rtOptions)
                        : <em>—</em>}
                </div>

                {/* Debug timestamp for ISR */}
                <small style={{ display: 'block', marginTop: 24, opacity: 0.6 }}>
                    Rendered at: {new Date().toISOString()} {resolvedLocale && `• locale: ${resolvedLocale}`}
                </small>
            </div>
        </section>
    );
}
