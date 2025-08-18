// app/pastor/page.js
import Image from 'next/image';

export default function PastorPage() {
    return (
        <section className="pastor-section">
            <h2 className="pastor-heading">우리 목사님 소개</h2>

            <div className="pastor-intro-container">
                <div className="pastor-photo">
                    <Image
                        src="/images/pastor.jpg"
                        alt="Pastor"
                        width={300}      // pick the natural width of your image
                        height={400}     // pick the natural height (keeps aspect ratio)
                        style={{ width: '100%', height: 'auto', borderRadius: 8 }}
                        priority
                    />
                </div>

                <div className="pastor-intro">
                    <p>안녕하세요,<br />하나님을 예배하는 예배자, <strong>최지선 목사</strong>입니다.</p>
                    <p>찬양하다 보니 예배자가 되어 있었고<br />
                        예배하다 보니 목사가 되어 있었습니다.<br />
                        그렇게 사역하다 보니 교회를 개척하게 하셨습니다.</p>
                    <p>무대를 사랑하던 연주자가 예배를 더욱 사랑하게 되어<br />
                        예배의 기쁨과 예배를 통한 회복의 기적을 전하는 사람이 되었습니다.</p>
                    <p>이제는 교회 안에서의 예배만이 아닌,<br />
                        삶이 곧 예배가 되는 선교적 예배 공동체를 꿈꿉니다.</p>
                    <p>삶의 모든 이야기는 하나님께서 써 내려가십니다.<br />
                        그 이야기의 한 부분으로 살아갈 수 있음에 감사하며,<br />
                        기꺼이 하나님의 이야기가 되기로 나 자신을 내어 드립니다.</p>
                    <p><strong>
                        God is writing the STORY.<br />
                        I am grateful for being a part of the STORY.<br />
                        I am the STORY of God.
                    </strong></p>
                    <p>나는 하나님의 <strong>“더스토리”</strong>입니다.</p>
                </div>
            </div>

            <details className="resume-details">
                <summary>이력</summary>
                <div className="resume-content">
                    <h4>Education</h4>
                    <ul>
                        <li>Berklee College of Music 학사 (1999) - Contemporary Writing and Production, BM</li>
                        <li>University of Miami 석사 (2003) - Media Writing and Production, MM</li>
                        <li>University of Miami 박사 (2007) - Piano Performance, DMA</li>
                        <li>Columbia Theological Seminary 목회학 석사 (2017) - Master of Divinity</li>
                    </ul>

                    <h4>목사안수</h4>
                    <ul>
                        <li>2022년 2월 27일, PCUSA(미국장로교) Greater Atlanta 노회</li>
                    </ul>

                    <h4>Ministry Experience</h4>
                    <ul>
                        <li>더스토리교회, 개척목사, 2024 - 현재</li>
                        <li>CREDO Spiritual Faculty, 미국 장로회 연금국, 2024 - 현재</li>
                        <li>아틀란타연합장로교회, 2014–2023 (담당목사, 전임전도사, 찬양전도사)</li>
                    </ul>

                    <h4>Teaching Experience</h4>
                    <ul>
                        <li>Teachers College-Columbia University, 2023–2024</li>
                        <li>Underwood University, 2019–2020</li>
                        <li>Pilgrim’s Theological Seminary, 2012–2018</li>
                        <li>Georgia Central University, 2015–2017</li>
                        <li>숙명여자대학원, 2005–2009</li>
                        <li>백석대학교, 2008–2009</li>
                        <li>부산대학교, 2006–2007</li>
                        <li>동의대학교, 2006–2007</li>
                        <li>동부산대학교, 2005–2007</li>
                        <li>University of Miami, 2003–2005</li>
                    </ul>
                </div>
            </details>
        </section>
    );
}