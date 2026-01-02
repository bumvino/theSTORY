export default function StaffPage() {
    const staffMembers = [
        {
            nameKo: "최지선",
            nameEn: "Emily Choi",
            title: "Founder / Lead Pastor",
            image: "/images/staff/emily-choi.png",
            link: "/pastor"
        },
        {
            nameKo: "백성인",
            nameEn: "Songyin 'John' Paik",
            title: "Pastor for Media / Pastoral Care Ministry",
            image: "/images/staff/john-paik.png",
            link: "/pastor-media"
        },
        {
            nameKo: "허린",
            nameEn: "Rin Her",
            title: "Sunday School Director",
            image: null, // Set to null until you get the photo
        },
        {
            nameKo: "김신애",
            nameEn: "Shinae Kim",
            title: "Ministry Assistant",
            image: null, // No photo
            email: "admin@thestorywc.org"
        }
    ];

    return (
        <main className="staff-page">
            <section className="headline">
                <div className="content-container">
                    <h1 className="about-title">STAFF</h1>
                    <h2 className="about-subtitle">섬기는 사람들</h2>
                </div>
            </section>

            <section className="staff-grid">
                {staffMembers.map((member, index) => (
                    <div key={index} className="staff-card">

                        <div className="staff-photo-wrapper">
                            {member.image ? (
                                /* PHOTO EXISTS */
                                member.link ? (
                                    <a href={member.link}>
                                        <img src={member.image} alt={member.nameEn} className="staff-img clickable-photo" />
                                    </a>
                                ) : (
                                    <img src={member.image} alt={member.nameEn} className="staff-img" />
                                )
                            ) : (
                                /* PLACEHOLDER: Shows for both Rin Her and Shinae Kim */
                                <div className="staff-placeholder">
                                    <p className="placeholder-full-name">{member.nameEn}</p>
                                    <div className="placeholder-line"></div>
                                    <p className="placeholder-brand">theSTORY</p>
                                </div>
                            )}
                        </div>

                        <div className="staff-info">
                            <h3>{member.nameKo}</h3>
                            <span className="en-name">{member.nameEn}</span>
                            <div style={{ marginBottom: '1rem' }}>
                                <span className="staff-title-tag">{member.title}</span>
                            </div>

                            {member.email && (
                                <a href={`mailto:${member.email}`} className="nav-button" style={{ marginTop: '0.5rem', fontSize: '0.85rem', display: 'inline-block' }}>
                                    이메일 보내기
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </section>

            <div className="content-container" style={{ marginBottom: '8rem' }}>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                    theSTORY Worshiping Community
                </p>
            </div>
        </main>
    );
}