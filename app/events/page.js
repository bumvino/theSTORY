// pages/event.js
import Head from "next/head";
import Image from "next/image";

export default function EventPage() {
    return (
        <>
            <Head>
                <title>All Together Atlanta 목요찬양예배</title>
                <meta
                    name="description"
                    content="All Together Atlanta 목요찬양예배 - 10월 9일, 2025, 드림채플"
                />
            </Head>

            <main className="min-h-screen bg-white">
                {/* Poster */}
                <div className="max-w-3xl mx-auto px-4 py-8">
                    <Image
                        src="/events/ATA-Oct2025.png"
                        alt="All Together Atlanta 목요찬양예배"
                        width={800}
                        height={1000}
                        className="w-full h-auto rounded-xl shadow"
                        priority
                    />
                </div>

                {/* Google Map Embed */}
                <div className="max-w-3xl mx-auto px-4 pb-16">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d206.69221889510382!2d-84.16300157546307!3d34.016272857440384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5989fc0b50cb5%3A0xa322ab7d513f5175!2s3294%20Peachtree%20Industrial%20Blvd%2C%20Duluth%2C%20GA%2030096!5e0!3m2!1sen!2sus!4v1755013073728!5m2!1sen!2sus"
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