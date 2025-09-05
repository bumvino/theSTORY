export const metadata = {
    title: "the STORY", // 👈 this controls the browser tab text
    description: "Welcome to the STORY", // optional
    icons: {
        icon: "/favicon.ico",              // standard favicon
        shortcut: "/favicon.ico",
        apple: "/apple-touch-icon.png",    // for iOS home screen
    },
};

import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>
        <Header />
        <main>{children}</main>
        <Footer />
        </body>
        </html>
    );
}