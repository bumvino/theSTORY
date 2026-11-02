export default function VisitPage() {
    return (
        <section className="about-section">
            <div className="content-container">
                <h1 className="about-title">Visit</h1>
                <p>예배장소: John Creek Presbyterian Church</p>
                <p>10950 Bell Road, Johns Creek, GA 30097</p>

                <div
                    className="map-container"
                    style={{ marginTop: '1rem', borderRadius: 8, overflow: 'hidden' }}
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3084.1781048542666!2d-84.17578455570444!3d34.04891465255443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f598c529eb33a3%3A0xdccfc5614a1fbb46!2s10950%20Bell%20Rd%2C%20Johns%20Creek%2C%20GA%2030097!5e1!3m2!1sen!2sus!4v1793636263022!5m2!1sen!2sus"
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