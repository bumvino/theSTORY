// app/giving/page.js
import Image from "next/image";

export const metadata = { title: "온라인 헌금 | Giving" };

export default function GivingPage() {
    return (
        <section className="about-section" style={{ color: "#000000" }}>
            <div
                className="content-container"
                style={{ maxWidth: 700, margin: "0 auto", textAlign: "left" }}
            >
                {/* Title */}
                <h1
                    className="about-title"
                    style={{
                        color: "#28C3EA",
                        fontWeight: 700,
                        marginBottom: "0.75rem",
                    }}
                >
                    온라인 헌금 | Giving
                </h1>

                {/* Bible Verse Highlight */}
                <div
                    style={{
                        marginBottom: "2rem",
                        fontStyle: "italic",
                        fontSize: "1.2rem",
                        lineHeight: 1.7,
                        textAlign: "center",
                        color: "#1e2a38",
                    }}
                >
                    “각각 그 마음에 정한 대로 할 것이요 억지로나 인색함으로 하지 말지니
                    <br />
                    하나님은 즐겨 내는 자를 사랑하시느니라”
                    <br />
                    <span
                        style={{
                            color: "#28C3EA",
                            fontWeight: 700,
                            display: "inline-block",
                            marginTop: ".5rem",
                            fontSize: "1.1rem",
                        }}
                    >
            (고린도후서 9:7)
          </span>
                </div>

                {/* Zelle */}
                <div className="worship-card" style={{ marginBottom: "1.5rem" }}>
                    <h3
                        style={{
                            color: "#28C3EA",
                            fontWeight: 700,
                            margin: 0,
                            marginBottom: ".5rem",
                        }}
                    >
                        Zelle
                    </h3>
                    <p style={{ margin: 0 }}>Zelle 앱에서 아래 이메일을 사용하세요:</p>
                    <p
                        style={{
                            margin: ".25rem 0 1rem",
                            fontWeight: 700,
                            color: "#1e2a38",
                        }}
                    >
                        thestorywc@gmail.com
                    </p>

                    <figure
                        style={{
                            margin: 0,
                            display: "inline-flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: 180,
                        }}
                    >
                        <Image
                            src="/images/zelle-qr.png"
                            alt="Zelle QR Code"
                            width={180}
                            height={180}
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: 8,
                            }}
                        />
                        <figcaption
                            style={{
                                fontSize: ".9rem",
                                marginTop: ".5rem",
                                color: "#000000",
                                textAlign: "center",
                            }}
                        >
                            Zelle QR 코드 (스캔하여 헌금)
                        </figcaption>
                    </figure>
                </div>

                {/* Vanco */}
                <div className="worship-card" style={{ marginBottom: "1.5rem" }}>
                    <h3
                        style={{
                            color: "#28C3EA",
                            fontWeight: 700,
                            margin: 0,
                            marginBottom: ".5rem",
                        }}
                    >
                        Vanco Online Giving
                    </h3>
                    <p style={{ margin: 0 }}>
                        신용카드 또는 은행 계좌로 안전하게 헌금하시려면 아래 버튼을 클릭하세요.
                    </p>

                    {/* ✅ Use the same style as header buttons */}
                    <a
                        href="https://secure.myvanco.com/L-ZM6A/home"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-button"
                    >
                        Give via Vanco
                    </a>
                </div>
            </div>
        </section>
    );
}