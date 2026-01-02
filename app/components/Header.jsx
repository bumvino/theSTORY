'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const isAboutActive = pathname.startsWith('/about') || pathname.startsWith('/pastor') || pathname.startsWith('/staff') || pathname.startsWith('/bulletin');

    return (
        <header className="site-header">
            <div className="header-container">
                {/* Logo */}
                <Link href="/" className="logo" onClick={closeMenu} aria-label="The STORY Home">
                    <img src="/logo.png" alt="The STORY logo" />
                </Link>

                {/* Right Side: Desktop Nav + Social OR Mobile Toggle */}
                <div className="header-right">
                    <nav className={`main-nav ${isOpen ? 'mobile-open' : ''}`}>
                        <div className="nav-item">
                            <Link href="/about" className={`nav-link ${isAboutActive ? 'active' : ''}`} onClick={closeMenu}>
                                ABOUT
                            </Link>
                            <div className="dropdown-content">
                                <Link href="/about" onClick={closeMenu}>About Us</Link>
                                <Link href="/pastor" onClick={closeMenu}>Our Pastor</Link>
                                <Link href="/staff" onClick={closeMenu}>Staff 섬기는 사람들</Link>
                                <Link href="/bulletin" onClick={closeMenu}>Bulletin 주보</Link>
                            </div>
                        </div>

                        <Link href="/visit" className="nav-link" onClick={closeMenu}>VISIT</Link>

                        <div className="nav-item">
                            <Link href="/ministries" className="nav-link" onClick={closeMenu}>MINISTRIES</Link>
                            <div className="dropdown-content">
                                <Link href="/ministries/women" onClick={closeMenu}>Women</Link>
                                <Link href="/ministries/men" onClick={closeMenu}>Men</Link>
                            </div>
                        </div>

                        <Link href="/connect" className="nav-link" onClick={closeMenu}>CONNECT</Link>
                        <Link href="/events" className="nav-link" onClick={closeMenu}>EVENTS</Link>
                        <Link href="/give" className="nav-link" onClick={closeMenu}>GIVE</Link>

                        {/* Social Icons inside Mobile Menu */}
                        <div className="mobile-social-links">
                            <a href="https://instagram.com/the.story.wc" target="_blank" rel="noreferrer">
                                <img src="/icons/instagram.svg" alt="Instagram" />
                            </a>
                            <a href="https://youtube.com/@TheStoryWorshipingCommunity" target="_blank" rel="noreferrer">
                                <img src="/icons/youtube.svg" alt="YouTube" />
                            </a>
                        </div>
                    </nav>

                    {/* Social Icons for Desktop */}
                    <div className="header-social desktop-only">
                        <a href="https://instagram.com/the.story.wc" target="_blank" rel="noreferrer">
                            <img src="/icons/instagram.svg" alt="Instagram" />
                        </a>
                        <a href="https://youtube.com/@TheStoryWorshipingCommunity" target="_blank" rel="noreferrer">
                            <img src="/icons/youtube.svg" alt="YouTube" />
                        </a>
                    </div>

                    {/* Mobile Toggle Button */}
                    <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>
        </header>
    );
}