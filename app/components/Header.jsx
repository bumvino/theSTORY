'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();
    const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

    return (
        <header className="site-header">
            <div className="header-container">
                {/* Logo */}
                <Link href="/" className="logo" aria-label="The STORY Home">
                    <img src="/logo.png" alt="The STORY logo" />
                </Link>

                {/* Nav */}
                <nav className="main-nav">
                    {/* ABOUT */}
                    <div className="nav-item">
                        <a
                            href="/about"
                            className={`nav-link ${pathname.startsWith('/about') || pathname.startsWith('/pastor') ? 'active' : ''}`}
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            ABOUT
                        </a>
                        <div className="dropdown-content">
                            <Link href="/about">About Us</Link>
                            <Link href="/pastor">Our Pastor</Link>
                            <Link href="/bulletins">Bulletins 주보</Link>
                        </div>
                    </div>

                    <Link href="/visit" className={`nav-link ${isActive('/visit') ? 'active' : ''}`}>VISIT</Link>

                    {/* MINISTRIES */}
                    <div className="nav-item">
                        <a
                            href="/ministries"
                            className={`nav-link ${pathname.startsWith('/ministries') ? 'active' : ''}`}
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            MINISTRIES
                        </a>
                        <div className="dropdown-content">
                            <Link href="/ministries/women">Women in the STORY</Link>
                            <Link href="/ministries/men">Men in the STORY</Link>
                        </div>
                    </div>

                    <Link href="/connect" className={`nav-link ${isActive('/connect') ? 'active' : ''}`}>CONNECT</Link>
                    <Link href="/events"  className={`nav-link ${isActive('/events')  ? 'active' : ''}`}>EVENTS</Link>
                    <Link href="/give"    className={`nav-link ${isActive('/give')    ? 'active' : ''}`}>GIVE</Link>
                </nav>

                {/* Social */}
                <div className="header-social" aria-label="Social links">
                    <a href="https://instagram.com/the.story.wc" target="_blank" rel="noreferrer" aria-label="Instagram">
                        <img src="/icons/instagram.svg" alt="Instagram" />
                    </a>
                    <a href="https://youtube.com/@TheStoryWorshipingCommunity" target="_blank" rel="noreferrer" aria-label="YouTube">
                        <img src="/icons/youtube.svg" alt="YouTube" />
                    </a>
                </div>
            </div>
        </header>
    );
}