// app/ministries/women/page.js
export const metadata = { title: 'Women in the STORY' };

export default function WomenMinistryPage() {
    return (
        <section className="about-section" style={{ color: '#1e2a38' }}>
            <div className="content-container" style={{ maxWidth: 900, textAlign: 'left' }}>
                <h1 className="about-title" style={{ marginBottom: '0.25rem' }}>
                    Women in theSTORY
                </h1>
                <p className="about-subtitle" style={{ marginTop: 0 }}>
                    함께 예배하고, 말씀을 나누고, 삶을 나누는 자매들의 모임
                </p>

                {/* Schedule / Hero */}
                <div className="worship-card" style={{ marginBottom: '1.25rem' }}>
                    <h3 style={{ color: '#28C3EA', marginTop: 0 }}>
                        Every Wednesday
                    </h3>
                    <p style={{ margin: '0.25rem 0 0.25rem' }}>
                        매주 수요일 <strong>오전 10시 30분</strong>
                    </p>
                    <p style={{ margin: 0 }}>
                        ☕ 커피 한잔과 함께 말씀을 나누고 삶을 나누는 <strong>여성들만의 따뜻한 만남</strong>
                    </p>
                </div>

                {/* Why / Vision */}
                <div className="worship-card" style={{ marginBottom: '1.25rem' }}>
                    <h3 style={{ color: '#28C3EA', marginTop: 0 }}>
                        나눔이 주는 마법 같은 힘
                    </h3>
                    <p style={{ marginTop: '.5rem' }}>
                        하나님의 말씀을 사모하는 여성들과의 나눔은
                        또 한 주를 <strong>감사와 기쁨</strong> 속에 살아가게 해 주는 힘이 있습니다.
                    </p>
                </div>

                {/* Contact */}
                <div className="worship-card">
                    <h3 style={{ color: '#28C3EA', marginTop: 0 }}>
                        Contact Us
                    </h3>
                    <p style={{ marginTop: '.5rem' }}>
                        참여를 원하시는 여성은 누구나 환영합니다.
                    </p>
                    <p style={{ margin: 0 }}>
                        이메일: <a href="mailto:admin@thestorywc.org">admin@thestorywc.org</a><br />
                        전화: <a href="tel:+16786821250">678-682-1250</a>
                    </p>
                </div>
            </div>
        </section>
    );
}