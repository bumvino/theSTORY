export const metadata = {
    title: 'The STORY',
    description: 'The STORY Worshiping Community',
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