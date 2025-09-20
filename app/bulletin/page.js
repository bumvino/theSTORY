// /app/bulletin/page.js  (SINGULAR to match your detail route)
// Enable ISR so on-demand revalidation works
export const revalidate = 60;

import Link from 'next/link';
import { cfClient } from '@/lib/contentful';

export const metadata = { title: '주보' };

const CF_LOCALE = 'en-US'; // set to your locale

export default async function BulletinsPage() {
    const res = await cfClient.getEntries({
        content_type: 'bulletin',
        order: ['-fields.date'],   // newest first
        limit: 50,
        locale: CF_LOCALE,         // be explicit for consistent ordering
        select: 'sys.id,fields.title,fields.sermonTitle,fields.date', // faster
    });

    const items = res?.items ?? [];

    return (
        <section className="about-section">
            <div className="content-container">
                <h1 className="about-title">주보</h1>

                <ul style={{ listStyle: 'none', padding: 0, marginTop: '1.5rem' }}>
                    {items.map((e) => {
                        const f = e.fields || {};
                        const dateLabel = f.date ? new Date(f.date).toLocaleDateString('ko-KR') : '';
                        return (
                            <li key={e.sys.id} style={{ marginBottom: '1rem' }}>
                                {/* Link now matches your detail route /bulletin/[id] */}
                                <Link
                                    href={`/bulletin/${e.sys.id}`}
                                    className="feature-card"
                                    style={{ display: 'block', padding: '1rem', textDecoration: 'none' }}
                                >
                                    <strong>{dateLabel}</strong>
                                    <div style={{ marginTop: '.25rem' }}>
                                        {f.sermonTitle || f.title || '제목 없음'}
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                    {items.length === 0 && <li>아직 주보가 없습니다.</li>}
                </ul>

                {/* Debug: helps confirm ISR and revalidation */}
                <small style={{ opacity: 0.6, display: 'block', marginTop: '1rem' }}>
                    Rendered at: {new Date().toISOString()}
                </small>
            </div>
        </section>
    );
}