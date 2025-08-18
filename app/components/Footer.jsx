export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-container">
                {/* Column 1: Title & Social */}
                <div className="footer-col">
                    <h4>the STORY <br /> Worshiping Community</h4>
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
                        <li><a href="/connect">Connect</a></li>
                        <li><a href="/events">Events</a></li>
                        <li><a href="/give">Give</a></li>
                    </ul>
                </div>

                {/* Column 3: Contact */}
                <div className="footer-col">
                    <h4>Contact</h4>
                    <address>
                        3294 Peachtree Industrial Blvd #1000B<br />
                        Duluth, GA 30096<br />
                        <a href="mailto:admin@thestorywc.org">admin@thestorywc.org</a><br />
                    </address>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2025 The Story Worshiping Community. All rights reserved.</p>
            </div>
        </footer>
    );
}