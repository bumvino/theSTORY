export default function VisitPage() {
    return (
        <section className="about-section">
            <div className="content-container">
                <h1 className="about-title">Visit</h1>
                <p>주일예배: 주일 오전 11:00</p>
                <p>3294 Peachtree Industrial Blvd #1000B, Duluth, GA 30096</p>

                <div
                    className="map-container"
                    style={{ marginTop: '1rem', borderRadius: 8, overflow: 'hidden' }}
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d206.69221889510382!2d-84.16300157546307!3d34.016272857440384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5989fc0b50cb5%3A0xa322ab7d513f5175!2s3294%20Peachtree%20Industrial%20Blvd%2C%20Duluth%2C%20GA%2030096!5e0!3m2!1sen!2sus!4v1755013073728!5m2!1sen!2sus"
                        width="100%"
                        height="350"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Map Location"
                    />
                </div>
            </div>
        </section>
    );
}