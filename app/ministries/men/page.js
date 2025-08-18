// app/ministries/men/page.js
export const metadata = { title: 'Men in the STORY' };

export default function MenMinistryPage() {
    return (
        <section className="about-section" style={{ color: '#1e2a38' }}>
            <div className="content-container" style={{ maxWidth: 900, textAlign: 'left' }}>
                <h1 className="about-title" style={{ marginBottom: '0.25rem' }}>
                    Men in the STORY
                </h1>
                <p className="about-subtitle" style={{ marginTop: 0 }}>
                    우정과 신앙을 나누는 형제들의 모임
                </p>

                {/* Schedule / Hero */}
                <div className="worship-card" style={{ marginBottom: '1.25rem' }}>
                    <h3 style={{ color: '#28C3EA', marginTop: 0 }}>
                        Once A Month
                    </h3>
                    <p style={{ margin: '0.25rem 0 0.25rem' }}>
                        한 달에 한 번
                    </p>
                    <p style={{ margin: 0 }}>
                        함께 모여 <strong>액티비티와 교제</strong>를 나누는 신나는 <strong>남성들만의 시간</strong>
                    </p>
                </div>

                {/* Vision / Invite */}
                <div className="worship-card" style={{ marginBottom: '1.25rem' }}>
                    <h3 style={{ color: '#28C3EA', marginTop: 0 }}>
                        친해져야 나눔이 가능한 남성들
                    </h3>
                    <p style={{ marginTop: '.5rem' }}>
                        교회에 오면 어색하신가요? 친해지고 나면 삶의 이야기들도 술술 풀어 놓게 될 것입니다.
                    </p>
                    <p style={{ margin: 0 }}>
                        우정과 신앙을 나누는 <strong>브라더쉽(Brothership)</strong>에 여러분을 초대합니다.
                    </p>
                </div>

                {/* Contact */}
                <div className="worship-card">
                    <h3 style={{ color: '#28C3EA', marginTop: 0 }}>
                        Contact Us
                    </h3>
                    <p style={{ marginTop: '.5rem' }}>
                        참여를 원하시는 남성은 누구나 환영합니다.
                    </p>
                    <p style={{ margin: 0 }}>
                        이메일: <a href="mailto:thestorywc@gmail.com">thestorywc@gmail.com</a><br />
                        전화: <a href="tel:+16786821250">678-682-1250</a>
                    </p>
                </div>
            </div>
        </section>
    );
}