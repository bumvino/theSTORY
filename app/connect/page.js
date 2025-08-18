import ClientForm from './ClientForm';
import { submitConnect } from '../actions/submitConnect';

export const metadata = { title: 'Connect' };

export default function ConnectPage() {
    return (
        <section className="about-section">
            <div className="content-container">
                <h1 className="about-title">Connect</h1>
                <ClientForm action={submitConnect} />
            </div>
        </section>
    );
}