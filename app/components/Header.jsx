'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();

    const isActive = (href) =>
        href === '/'
            ? pathname === '/'
            : pathname.startsWith(href);

    return (
        <header className="site-header">
            <div className="header-container">
                {/* Logo */}
                <Link href="/" className="logo">
                    <img src="/logo.png" alt="The STORY logo" />
                </Link>

                {/* Nav (left / next to logo) */}
                <nav className="main-nav">
                    <details className="nav-item" open={pathname.startsWith('/about') || pathname.startsWith('/pastor')}>
                        <summary className={isActive('/about') || isActive('/pastor') ? 'active' : ''}>
                            ABOUT
                        </summary>
                        <div className="dropdown-content">
                            <Link href="/about">About Us</Link>
                            <Link href="/pastor">Our Pastor</Link>
                        </div>
                    </details>

                    <Link href="/visit"   className={isActive('/visit')   ? 'active' : ''}>VISIT</Link>
                    <Link href="/connect" className={isActive('/connect') ? 'active' : ''}>CONNECT</Link>
                    <Link href="/events"  className={isActive('/events')  ? 'active' : ''}>EVENTS</Link>
                    <Link href="/give"    className={isActive('/give')    ? 'active' : ''}>GIVE</Link>
                </nav>

                {/* Social (pushed to the far right) */}
                <div className="header-social">
                    <a
                        href="https://instagram.com/the.story.wc"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Instagram"
                    >
                        <img src="/icons/instagram.svg" alt="Instagram" />
                    </a>
                    <a
                        href="https://youtube.com/@TheStoryWorshipingCommunity"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="YouTube"
                    >
                        <img src="/icons/youtube.svg" alt="YouTube" />
                    </a>
                </div>
            </div>
        </header>
    );
}