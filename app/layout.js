export const metadata = {
    title: "the STORY",
    description: "Welcome to the STORY",
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
};

import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import AnnouncementPopup from './components/AnnouncementPopup';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <AnnouncementPopup />
        </body>
        </html>
    );
}