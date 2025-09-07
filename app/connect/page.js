import ClientForm from './ClientForm';
import { submitConnect } from '../actions/submitConnect';

export const metadata = {
    title: 'Connect',
    description: 'Connect with The Story Church—share your info and we’ll follow up.',
};

export default function ConnectPage() {
    return (
        <section className="about-section">
            <div className="content-container">
                <h1 className="about-title">Connect</h1>
                <p className="about-intro" style={{ marginBottom: '1rem', color: '#666' }}>
                    아래 양식을 작성해 주시면 교회에서 연락을 드리겠습니다.
                    <span style={{ color: 'red', fontWeight: 600 }}> *</span> 표시는 반드시 작성해야 합니다.
                </p>
                <ClientForm action={submitConnect} />
            </div>
        </section>
    );
}


//import { Resend } from 'resend';
//
// const resend = new Resend('re_PC9WQmNo_2cd58VDEYQuJvN3uvNSc7HE6');
//
// resend.emails.send({
//   from: 'onboarding@resend.dev',
//   to: 'bum.kim@thestorywc.org',
//   subject: 'Hello World',
//   html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
// });