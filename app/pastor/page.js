'use client';

import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react"; // Ensure you have run: npm install lucide-react

export default function PastorPage() {
    return (
        <main className="pastor-section">
            {/* Full Title Header */}
            <h1 className="pastor-heading" style={{ fontSize: '1.75rem', lineHeight: '1.2' }}>
                Founder / Lead Pastor
            </h1>

            <div className="pastor-intro-container">
                {/* Photo Section */}
                <div className="pastor-photo">
                    <Image
                        src="/images/staff/emily-choi.png"
                        alt="Pastor Emily Choi"
                        width={300}
                        height={400}
                        style={{ width: "100%", height: "auto", borderRadius: 8 }}
                        priority
                    />
                </div>

                {/* Bio Section */}
                <div className="pastor-intro">
                    <h2 style={{ fontSize: '1.6rem', marginBottom: '1rem', fontWeight: '700' }}>
                        최지선 <span style={{ fontWeight: '400', color: 'var(--muted)', fontSize: '1.2rem' }}>| Emily Choi</span>
                    </h2>

                    <div style={{ lineHeight: '1.8', color: 'var(--text)' }}>
                        <p style={{ marginBottom: '1rem' }}>
                            안녕하세요, 하나님을 예배하는 예배자, <strong>최지선 목사</strong>입니다.
                        </p>
                        <p style={{ marginBottom: '1rem' }}>
                            찬양하다 보니 예배자가 되어 있었고, 예배하다 보니 목사가 되어 있었습니다.
                            그렇게 사역하다 보니 교회를 개척하게 하셨습니다. 무대를 사랑하던 연주자가
                            예배를 더욱 사랑하게 되어 예배의 기쁨과 회복의 기적을 전하는 사람이 되었습니다.
                        </p>
                        <p style={{ marginBottom: '1rem' }}>
                            이제는 교회 안에서의 예배만이 아닌, 삶이 곧 예배가 되는 선교적 예배 공동체를 꿈꿉니다.
                            모든 이야기는 하나님께서 써 내려가십니다. 그 이야기의 한 부분으로 살아갈 수 있음에 감사하며,
                            기꺼이 하나님의 이야기가 되기로 나 자신을 내어 드립니다.
                        </p>
                        <p style={{ marginTop: '1.5rem', borderLeft: '3px solid var(--brand)', paddingLeft: '1rem' }}>
                            <strong>
                                God is writing the STORY.<br />
                                I am grateful for being a part of the STORY.<br />
                                I am the STORY of God.
                            </strong>
                        </p>
                        <p style={{ marginTop: '0.5rem' }}>
                            나는 하나님의 <strong>“더스토리”</strong>입니다.
                        </p>
                    </div>

                    {/* 📧 Email button */}
                    <div style={{ marginTop: "2rem" }}>
                        <Link
                            href="mailto:pastor@thestorywc.org?subject=문의드립니다&body=안녕하세요 목사님,"
                            className="nav-button"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '0.75rem 1.5rem',
                                color: '#fff',
                                textDecoration: 'none'
                            }}
                        >
                            <Mail size={18} />
                            목사님께 이메일 보내기
                        </Link>
                    </div>
                </div>
            </div>

            {/* Resume Section (Collapsible - All closed by default) */}
            <div className="resume-wrap" style={{ marginTop: "3rem" }}>

                {/* 1. EDUCATION */}
                <details className="resume-details">
                    <summary>Education (학력)</summary>
                    <div className="resume-content">
                        <ul>
                            <li><strong>Columbia Theological Seminary</strong> (2017) — 목회학 석사 (Master of Divinity)</li>
                            <li><strong>University of Miami</strong> (2007) — Piano Performance 박사 (DMA)</li>
                            <li><strong>University of Miami</strong> (2003) — Media Writing and Production 석사 (MM)</li>
                            <li><strong>Berklee College of Music</strong> (1999) — Contemporary Writing and Production 학사 (BM)</li>
                        </ul>
                    </div>
                </details>

                {/* 2. ORDINATION */}
                <details className="resume-details" style={{ marginTop: '1rem' }}>
                    <summary>Ordination (목사 안수)</summary>
                    <div className="resume-content">
                        <ul>
                            <li>2022년 2월 27일, PCUSA(미국장로교) Greater Atlanta 노회</li>
                        </ul>
                    </div>
                </details>

                {/* 3. MINISTRY EXPERIENCE */}
                <details className="resume-details" style={{ marginTop: '1rem' }}>
                    <summary>Ministry Experience (사역 경력)</summary>
                    <div className="resume-content">
                        <ul>
                            <li><strong>theSTORY Worshiping Community</strong> (2024–현재) — 개척목사</li>
                            <li><strong>CREDO Spiritual Faculty</strong> (2024–현재) — 미국 장로회 연금국</li>
                            <li><strong>아틀란타연합장로교회</strong> (2014–2023) — 담당목사, 전임전도사, 찬양전도사</li>
                        </ul>
                    </div>
                </details>

                {/* 4. TEACHING EXPERIENCE */}
                <details className="resume-details" style={{ marginTop: '1rem' }}>
                    <summary>Teaching Experience (교육 경력)</summary>
                    <div className="resume-content">
                        <ul>
                            <li>Teachers College-Columbia University (2023–2024)</li>
                            <li>Underwood University (2019–2020)</li>
                            <li>Pilgrim’s Theological Seminary (2012–2018)</li>
                            <li>Georgia Central University (2015–2017)</li>
                            <li>숙명여자대학원 (2005–2009)</li>
                            <li>백석대학교 (2008–2009)</li>
                            <li>부산대학교 (2006–2007)</li>
                            <li>동의대학교 (2006–2007)</li>
                            <li>동부산대학교 (2005–2007)</li>
                            <li>University of Miami (2003–2005)</li>
                        </ul>
                    </div>
                </details>
            </div>

            {/* Bottom Navigation */}
            <div style={{ textAlign: 'center', marginTop: '5rem', paddingBottom: '5rem' }}>
                <Link href="/staff" style={{ fontSize: '1rem', color: 'var(--brand)', textDecoration: 'none', fontWeight: '600' }}>
                    ← 섬기는 사람들(Staff) 페이지로 돌아가기
                </Link>
            </div>
        </main>
    );
}