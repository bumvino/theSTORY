import { cfClient } from '@/lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export async function generateStaticParams() {
    const res = await cfClient.getEntries({ content_type: 'bulletin', select: 'sys.id' });
    return res.items.map((i) => ({ id: i.sys.id }));
}

export default async function BulletinDetail({ params }) {
    const resolved = (typeof params?.then === 'function') ? await params : params;
    const { id } = resolved;
    const entry = await cfClient.getEntry(id);
    const f = entry?.fields;
    if (!f) return <div style={{ padding: 24, color: '#777' }}>Bulletin not found.</div>;

    const divider = <hr style={{ margin: '1.5rem 0', border: 'none', borderTop: '2px solid #ccc' }} />;

    return (
        <section className="about-section" style={{ fontSize: '1rem', color: '#777' }}>
            <div
                className="content-container"
                style={{
                    textAlign: 'left',
                    maxWidth: 700,
                    margin: '0 auto',
                    padding: '0 1rem'
                }}
            >
                {/* Title - now bold */}
                <h1 className="about-title" style={{ fontSize: '1.6rem', color: '#28C3EA', fontWeight: 'bold' }}>
                    더스토리 주일예배 Week #{f.weekNumber || '—'}
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
                <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>
                    <span style={{ color: '#28C3EA', fontWeight: 'bold' }}>말씀</span>{' '}
                    <span style={{ color: '#777' }}>{f.preacher || '—'}</span>
                    <br />
                    <span style={{ color: '#28C3EA', fontWeight: 'bold' }}>Sermon</span>{' '}
                    <span style={{ color: '#777' }}>{f.preacherEng || '—'}</span>
                </p>

                {/* 제목(중앙) + 본문(우측) */}
                <div style={{ fontSize: '1.1rem', color: '#777' }}>
                    <p style={{ textAlign: 'center', margin: 0 }}>
                        “{f.sermonTitle || '—'}”
                        <br />
                        {f.sermonTitleEng || ''}
                    </p>
                    <p style={{ textAlign: 'right', margin: '0.25rem 0 0', color: '#28C3EA', fontWeight: 'bold' }}>
                        {f.scriptureReference || ''}
                    </p>
                </div>

                {divider}

                {/* Announcement (Rich Text) */}
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#28C3EA' }}>
                    더스토리 소식 Announcement
                </h3>
                <div style={{ color: '#777', fontSize: '1rem' }}>
                    {f.announcements
                        ? documentToReactComponents(f.announcements)
                        : <em>—</em>}
                </div>
            </div>
        </section>
    );
}