export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-container">
                {/* Column 1: Title & Social */}
                <div className="footer-col text-center sm:text-left">
                    <h4>
                        theSTORY <br /> Worshiping Community
                    </h4>
                    <div className="footer-social flex justify-center sm:justify-start mt-2 gap-3">
                        <a
                            href="https://instagram.com/the.story.wc"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Instagram"
                        >
                            <img src="/icons/instagram.svg" alt="Instagram" className="w-6 h-6" />
                        </a>
                        <a
                            href="https://youtube.com/@TheStoryWorshipingCommunity"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="YouTube"
                        >
                            <img src="/icons/youtube.svg" alt="YouTube" className="w-6 h-6" />
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
                <p>© 2025 theStory Worshiping Community. All rights reserved.</p>
            </div>
        </footer>
    );
}