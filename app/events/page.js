// pages/event.js
import Head from "next/head";
import Image from "next/image";

export default function EventPage() {
    return (
        <>
            <Head>
                <title>더스토리교회 가을 피크닉</title>
                <meta
                    name="description"
                    content="더스토리교회 가을 피크닉 with Baby Shower - 9월 14일, 2025, 제라드 랜딩 공원"
                />
            </Head>

            <main className="min-h-screen bg-white">
                {/* Poster */}
                <div className="max-w-3xl mx-auto px-4 py-8">
                    <Image
                        src="/events/fall-picnic.png"
                        alt="더스토리교회 가을 피크닉 포스터"
                        width={800}
                        height={1000}
                        className="w-full h-auto rounded-xl shadow"
                        priority
                    />
                </div>

                {/* Google Map Embed */}
                <div className="max-w-3xl mx-auto px-4 pb-16">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.7099578741154!2d-84.26755712386365!3d33.97429367318634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5a080c4509415%3A0xc8b6e47c0bd14c29!2sGarrard%20Landing%20Park!5e0!3m2!1sen!2sus!4v1757629324245!5m2!1sen!2sus"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-xl shadow"
                    ></iframe>
                </div>
            </main>
        </>
    );
}