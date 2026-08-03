import DynamicHeadline from './components/DynamicHeadline';
import Link from 'next/link';

export default function HomePage() {
    return (
        <>
            <DynamicHeadline />

            <section className="features-section" id="features">
                <h2 className="features-heading">Welcome to theSTORY</h2>
                <div className="features-grid">
                    <Link href="/bulletin/latest" className="feature-card">
                        <div className="feature-icon">📰</div>
                        <h3>주보</h3>
                        <p>매주 예배 순서를 확인하세요.</p>
                    </Link>

                    <Link href="/visit" className="feature-card">
                        <div className="feature-icon">📍</div>
                        <h3>오시는길</h3>
                        <p>예배 장소와 시간 정보를 <br/>확인하세요.</p>
                    </Link>

                    <Link href="/connect" className="feature-card">
                        <div className="feature-icon">🤝</div>
                        <h3>새가족안내</h3>
                        <p>처음 오셨다면 이곳을 <br/>확인하세요.</p>
                    </Link>

                    <Link href="/give" className="feature-card">
                        <div className="feature-icon">💝</div>
                        <h3>온라인 헌금</h3>
                        <p>감사와 헌신을 온라인으로 <br/>드릴 수 있어요.</p>
                    </Link>

                    <Link href="/events" className="feature-card">
                        <div className="feature-icon">📅</div>
                        <h3>이벤트</h3>
                        <p>다가오는 교회 모임과 사역을 <br/>확인하세요.</p>
                    </Link>
                </div>
            </section>

            <section className="worship-info">
                <h2>예배 안내</h2>
                <div className="worship-grid">
                    <div className="worship-card">
                        <h3>주일 예배</h3>
                        <ul>
                            <li>주일 오전 11:00</li>
                        </ul>
                    </div>
                    <div className="worship-card">
                        <h3>주중 예배</h3>
                        <ul>
                            <li>Prayer Night | 금요일 오후 7:30</li>
                            <li>찬양예배 | 매달 첫 목요일 오후 7:30</li>
                        </ul>
                    </div>
                    <div className="worship-card">
                        <h3>In theSTORY</h3>
                        <ul>
                            <li>Women | 수요일 오전 10:30</li>
                            <li>Men | 주일 예배/교제 후</li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}