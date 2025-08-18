export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-container">
                {/* Column 1: Logo & Social */}
                <div className="footer-col">
                    <a href="/" className="footer-logo">
                        <img src="/logo.png" alt="The STORY logo" />
                    </a>
                    <div className="footer-social">
                        <a href="https://instagram.com/the.story.wc" target="_blank" rel="noreferrer" aria-label="Instagram">
                            <img src="/icons/instagram.svg" alt="Instagram" />
                        </a>
                        <a href="https://youtube.com/@TheStoryWorshipingCommunity" target="_blank" rel="noreferrer" aria-label="YouTube">
                            <img src="/icons/youtube.svg" alt="YouTube" />
                        </a>
                    </div>
                </div>

                {/* Column 2: Quick Links */}
                <div className="footer-col">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/pastor">Our Pastor</a></li>
                        <li><a href="/visit">Visit</a></li>
                        <li><a href="/give">Give</a></li>
                    </ul>
                </div>

                {/* Column 3: Contact */}
                <div className="footer-col">
                    <h4>Contact</h4>
                    <address>
                        3294 Peachtree Industrial Blvd #1000B<br />
                        Duluth, GA 30096<br />
                        <a href="mailto:info@thestorywc.org">info@thestorywc.org</a><br />
                        <a href="tel:+15551234567">+1 (555) 123-4567</a>
                    </address>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2025 The Story Worshiping Community. All rights reserved.</p>
            </div>
        </footer>
    );
}