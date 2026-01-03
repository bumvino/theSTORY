'use client';

import React from 'react';

export default function MediaPastorPage() {
    return (
        <main className="pastor-section">
            {/* Full Title Header */}
            <h1 className="pastor-heading" style={{ fontSize: '1.75rem', lineHeight: '1.2' }}>
                Pastor for Media & Pastoral Care Ministry
            </h1>

            {/* Intro Section: Photo + Short Bio */}
            <div className="pastor-intro-container">
                <div className="pastor-photo">
                    <img
                        src="/images/staff/john-paik.png"
                        alt="Pastor Songyin John Paik"
                    />
                </div>

                <div className="pastor-intro">
                    <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', fontWeight: '700' }}>
                        백성인 <span style={{ fontWeight: '400', color: 'var(--muted)', fontSize: '1.2rem' }}>| Songyin "John" Paik</span>
                    </h2>
                    <p style={{ marginBottom: '1rem', lineHeight: '1.8' }}>
                        백성인 목사는 theSTORY Worshiping Community에서 미디어 사역과 심방 및 돌봄 사역을 담당하고 있습니다.
                        정치학, 국제학, 그리고 신학을 아우르는 학문적 배경과 병원 및 호스피스 현장에서의 풍부한 임상목회경험(CPE)을 바탕으로,
                        성도들의 영적 돌봄과 커뮤니티의 소통을 위해 헌신하고 있습니다.
                    </p>
                    <p style={{ lineHeight: '1.8' }}>
                        Pastor John Paik serves in Media Ministry and Pastoral Care at theSTORY.
                        With a diverse background in International Studies and Clinical Pastoral Education (CPE),
                        he brings a compassionate and professional approach to spiritual care education and
                        leadership within our community.
                    </p>
                </div>
            </div>

            {/* Resume Section (Collapsible - All closed by default) */}
            <div className="resume-wrap" style={{ marginTop: '3rem' }}>

                {/* 1. EDUCATION */}
                <details className="resume-details">
                    <summary>Education (학력)</summary>
                    <div className="resume-content">
                        <ul>
                            <li><strong>Union Theological Seminary</strong> (2023) — Doctor of Ministry (D.Min.) in Spiritual Care Education and Leadership</li>
                            <li><strong>Columbia Theological Seminary</strong> (2018) — Master of Theology (Th.M.) in Pastoral Care & Counselling</li>
                            <li><strong>Columbia Theological Seminary</strong> (2015) — Master of Divinity (M.Div.)</li>
                            <li><strong>University of Denver</strong> (2011) — Josef Korbel School of International Studies, MA in International Studies</li>
                            <li><strong>대전 한남대학교</strong> (2008) — 정치·커뮤니케이션·국제학 / 광고 홍보학 학사 (BA)</li>
                        </ul>
                    </div>
                </details>

                {/* 2. MINISTRY EXPERIENCE */}
                <details className="resume-details" style={{ marginTop: '1rem' }}>
                    <summary>Ministry & Professional Experience (사역 및 경력)</summary>
                    <div className="resume-content">
                        <h4>Current Role (현재)</h4>
                        <ul>
                            <li><strong>Northside Hospital Atlanta/Gwinnett</strong> (2022–현재) — Chaplain / 원목 Supervisor, 임상목회교육(CPE) Supervisor, CPE CEC</li>
                            <li><strong>theSTORY Worshiping Community</strong> — Media Pastor / Pastoral Care</li>
                        </ul>

                        <h4>Previous Experience (이전 사역)</h4>
                        <ul>
                            <li><strong>선한사마리아인 장로교회</strong> (2018–2023) — EM Ministry and Education</li>
                            <li><strong>CPE Center of Central California</strong> (2021–2022) — 임상목회교육 (CPE CEC)</li>
                            <li><strong>SAGE / Agape Hospice Care</strong> (2020–2022) — 호스피스 원목 (Spiritual Care Coordinator)</li>
                            <li><strong>Atlanta VA Medical Center</strong> (2018–2020) — 원목 (Chaplain), CPE Certified Educator Candidate</li>
                            <li><strong>새조지아 장로교회</strong> (2012–2017) — EM Youth Director</li>
                        </ul>
                    </div>
                </details>

                {/* 3. ORDINATION */}
                <details className="resume-details" style={{ marginTop: '1rem' }}>
                    <summary>Ordination (목사 안수)</summary>
                    <div className="resume-content">
                        <ul>
                            <li>2018년 6월 24일, PCUSA(미국장로교) Greater Atlanta 노회</li>
                        </ul>
                    </div>
                </details>

            </div>

            {/* Bottom Navigation */}
            <div style={{ textAlign: 'center', marginTop: '5rem', paddingBottom: '5rem' }}>
                <a href="/staff" style={{ fontSize: '1rem', color: 'var(--brand)', textDecoration: 'none', fontWeight: '600' }}>
                    ← 섬기는 사람들(Staff) 페이지로 돌아가기
                </a>
            </div>
        </main>
    );
}