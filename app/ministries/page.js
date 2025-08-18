import Link from "next/link";

export const metadata = { title: "Ministries" };

export default function MinistriesLanding() {
    return (
        <section className="features-section">
            {/* Match style to Visit page */}
            <h1 className="features-heading" style={{ color: "#28C3EA" }}>
                Ministries in the STORY
            </h1>

            <div className="features-grid">
                {/* Women in theSTORY */}
                <Link href="/ministries/women" className="feature-card">
                    <div className="feature-icon">👩🏻</div>
                    <h3>Women in the STORY</h3>
                    <p>
                        자매들이 함께 예배하며 말씀 묵상과
                        기도로 삶을 나누는 공동체입니다.
                    </p>
                </Link>

                {/* Men in theSTORY */}
                <Link href="/ministries/men" className="feature-card">
                    <div className="feature-icon">🧑🏻</div>
                    <h3>Men in the STORY</h3>
                    <p>
                        형제들이 함께 모여 말씀과 삶을 나누며,
                        서로를 세워가는 공동체입니다.
                    </p>
                </Link>
            </div>
        </section>
    );
}