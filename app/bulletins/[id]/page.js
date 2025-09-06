// Rebuild this route at most every 60s (ISR)
export const revalidate = 0;
// (Optional) make it explicit that new IDs after build are allowed
export const dynamicParams = true;

import { cfClient } from '@/lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const res = await cfClient.getEntries({ content_type: 'bulletin', select: 'sys.id' });
    return res.items.map(i => ({ id: i.sys.id }));
}

export default async function BulletinDetail({ params }) {
    const { id } = params;

    let entry = null;
    try {
        entry = await cfClient.getEntry(id);
    } catch (_) {
        return notFound();
    }
    const f = entry?.fields;
    if (!f) return notFound();

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
                <h1 className="about-title" style={{ fontSize: '1.6rem', color: '#28C3EA', fontWeight: 'bold' }}>
                    주일예배 Week {f.weekNumber || '—'}
                </h1>

                {/* 장소 / 시간 */}
                <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>
                    <span style={{ color: '#28C3EA', fontWeight: 'bold' }}>장소:</span>{' '}
                    <span style={{ color: '#777' }}>{f.location || '—'}</span>
                    <br />
                    <span style={{ color: '#28C3EA', fontWeight: 'bold' }}>시간:</span>{' '}
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
                    <p style={{ textAlign: 'center', margin: '0 0 1.5rem' }}>
                        “{f.sermonTitle || '—'}”
                        <br />
                        {f.sermonTitleEng || ''}
                    </p>
                    {/* FIX: marginbottom -> marginBottom */}
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
                <div style={{ color: '#777', fontSize: '1rem' }}>
                    {f.announcements ? documentToReactComponents(f.announcements) : <em>—</em>}
                </div>

                {/* debug timestamp to confirm ISR */}
                <small style={{ display: 'block', marginTop: 24, opacity: 0.6 }}>
                    Rendered at: {new Date().toISOString()}
                </small>
            </div>
        </section>
    );
}
