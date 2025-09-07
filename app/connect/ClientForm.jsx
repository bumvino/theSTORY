'use client';

import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';

function SubmitBtn() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" className="btn-primary" disabled={pending} aria-busy={pending}>
            {pending ? 'Submitting…' : 'Submit'}
        </button>
    );
}

export default function ClientForm({ action }) {
    // timestamp for spam check
    const [ts] = useState(() => Date.now().toString());
    const [notice, setNotice] = useState(null);

    const [state, formAction] = useActionState(async (_prev, formData) => {
        const res = await action(formData);
        return res;
    }, { ok: false });

    useEffect(() => {
        if (state.ok) {
            setNotice({ type: 'success', msg: '감사합니다! 제출이 완료되었습니다.' });
        } else if (state.error) {
            setNotice({ type: 'error', msg: state.error });
        }
    }, [state]);

    const Req = () => <span style={{ color: 'red' }}> *</span>;

    return (
        <form className="form-wrap" action={formAction} noValidate>
            {/* spam fields */}
            <input type="hidden" name="ts" value={ts} />
            <input type="text" name="company" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

            {/* --- Name & Email --- */}
            <div className="form-section">
                <div className="form-row two">
                    <div className="form-group">
                        <label htmlFor="firstName" className="form-label">First Name<Req /></label>
                        <input id="firstName" name="firstName" type="text" required autoComplete="given-name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName" className="form-label">Last Name<Req /></label>
                        <input id="lastName" name="lastName" type="text" required autoComplete="family-name" />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email<Req /></label>
                    <input id="email" name="email" type="email" required autoComplete="email" inputMode="email" />
                </div>
            </div>

            {/* --- Address --- */}
            <div className="form-section">
                <div className="form-group form-span-2">
                    <label htmlFor="address1" className="form-label">Address Line 1<Req /></label>
                    <input id="address1" name="address1" type="text" required placeholder="Street address" autoComplete="address-line1" />
                </div>

                <div className="form-group form-span-2">
                    <label htmlFor="address2" className="form-label">Address Line 2</label>
                    <input id="address2" name="address2" type="text" placeholder="Apt, suite, unit (optional)" autoComplete="address-line2" />
                </div>

                <div className="form-row three">
                    <div className="form-group">
                        <label htmlFor="city" className="form-label">City<Req /></label>
                        <input id="city" name="city" type="text" required autoComplete="address-level2" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="state" className="form-label">State<Req /></label>
                        <input id="state" name="state" type="text" required autoComplete="address-level1" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="zip" className="form-label">Zip Code<Req /></label>
                        <input
                            id="zip"
                            name="zip"
                            type="text"
                            required
                            inputMode="numeric"
                            autoComplete="postal-code"
                            pattern="\d{5}(-\d{4})?"
                            placeholder="12345 or 12345-6789"
                        />
                    </div>
                </div>

                <div className="form-row two">
                    <div className="form-group">
                        <label htmlFor="phone" className="form-label">Phone<Req /></label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            inputMode="tel"
                            autoComplete="tel"
                            placeholder="(555) 555-5555"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dob" className="form-label">Date of Birth<Req /></label>
                        <input id="dob" name="dob" type="date" required autoComplete="bday" />
                    </div>
                </div>
            </div>

            {/* --- 교단 배경 & 세례 여부 --- */}
            <div className="form-section">
                <fieldset className="form-group">
                    <legend className="form-label">교단 배경<Req /></legend>
                    <div className="checkbox-group">
                        {['장로교','감리교','침례교','성결교','그외'].map((v) => (
                            <label className="checkbox-inline" key={v}>
                                <input type="checkbox" name="denomination" value={v} required />
                                {v}
                            </label>
                        ))}
                    </div>
                </fieldset>

                <fieldset className="form-group">
                    <legend className="form-label">세례 여부<Req /></legend>
                    <div className="checkbox-group">
                        {['예','아니오'].map((v) => (
                            <label className="checkbox-inline" key={v}>
                                <input type="checkbox" name="baptized" value={v} required />
                                {v}
                            </label>
                        ))}
                    </div>
                </fieldset>
            </div>

            {/* --- 가족 사항 --- */}
            <div className="form-section">
                <div className="form-group">
                    <label htmlFor="family" className="form-label">
                        가족 사항<Req /> <span style={{ color: '#777', fontWeight: 400 }}>
              (함께 참석한 가족: 이름 / 생년월일 / 전화번호 / 이메일)
            </span>
                    </label>
                    <textarea
                        id="family"
                        name="family"
                        required
                        rows={5}
                        placeholder="혼자 오신분은 N/A로 적어주세요"
                    />
                </div>
            </div>

            <SubmitBtn />

            {notice && (
                <p
                    role={notice.type === 'error' ? 'alert' : 'status'}
                    className={notice.type === 'error' ? 'text-red-600 mt-3' : 'text-green-600 mt-3'}
                >
                    {notice.msg}
                </p>
            )}
        </form>
    );
}
