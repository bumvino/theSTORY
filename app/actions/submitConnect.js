'use server';

import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
    firstName: z.string().min(1).max(80).trim(),
    lastName:  z.string().min(1).max(80).trim(),
    email:     z.string().email().max(200).trim(),
    address1:  z.string().min(1).max(200).trim(),
    address2:  z.string().optional().default('').transform(s => (s ?? '').trim()),
    city:      z.string().min(1).max(120).trim(),
    state:     z.string().min(1).max(120).trim(),
    zip:       z.string().min(3).max(20).trim(),
    phone:     z.string().min(7).max(40).trim(),
    dob:       z.string().min(4).max(20).trim(),
    denomination: z.array(z.enum(['장로교','감리교','침례교','성결교','그외'])).min(1),
    // If your form uses radios for baptized, prefer this:
    // baptized: z.enum(['예','아니오']),
    // If you keep checkboxes, keep array:
    baptized:  z.array(z.enum(['예','아니오'])).min(1),
    family:    z.string().min(1).max(4000).trim(),

    honey: z.string().optional(),
    ts:    z.string().optional(),
});

export async function submitConnect(formData) {
    try {
        // --- Spam gate (less aggressive) ---
        const honey = (formData.get('company') || '').toString();
        const tsNum = Number(formData.get('ts') || 0);
        const tooFast = !tsNum || (Date.now() - tsNum < 1000); // ~1s
        if (honey) return { ok: true }; // silent for bots
        if (tooFast) return { ok: false, error: '잠시 후 다시 시도해 주세요.' };

        // --- Collect multi-value fields ---
        // Make sure these names match your form exactly.
        const denomination = formData.getAll('denomination').map(String);
        const baptized     = formData.getAll('baptized').map(String);

        const data = {
            firstName: formData.get('firstName')?.toString() || '',
            lastName:  formData.get('lastName')?.toString()  || '',
            email:     formData.get('email')?.toString()     || '',
            address1:  formData.get('address1')?.toString()  || '',
            address2:  formData.get('address2')?.toString()  || '',
            city:      formData.get('city')?.toString()      || '',
            state:     formData.get('state')?.toString()     || '',
            zip:       formData.get('zip')?.toString()       || '',
            phone:     formData.get('phone')?.toString()     || '',
            dob:       formData.get('dob')?.toString()       || '',
            family:    formData.get('family')?.toString()    || '',
            denomination,
            baptized,
            honey,
            ts: formData.get('ts')?.toString() || '',
        };

        const parsed = schema.safeParse(data);
        if (!parsed.success) {
            console.log('[connect] validation failed:', parsed.error.flatten());
            return { ok: false, error: 'Please check required fields.' };
        }
        const d = parsed.data;

        // --- Env sanity ---
        const toAddresses = (process.env.CONTACT_TO || '')
            .split(',')
            .map(s => s.trim())
            .filter(Boolean);
        if (!process.env.RESEND_API_KEY) {
            console.error('[connect] Missing RESEND_API_KEY');
            return { ok: false, error: 'Mailer not configured.' };
        }
        if (!process.env.CONTACT_FROM) {
            console.error('[connect] Missing CONTACT_FROM');
            return { ok: false, error: 'Sender not configured.' };
        }
        if (toAddresses.length === 0) {
            console.error('[connect] Missing CONTACT_TO');
            return { ok: false, error: 'Recipient not configured.' };
        }

        // --- Build bodies (html + text) ---
        const subject = `New Connect Card: ${d.firstName} ${d.lastName}`;
        const textBody = [
            `Name: ${d.firstName} ${d.lastName}`,
            `Email: ${d.email}`,
            `Phone: ${d.phone}`,
            `DOB: ${d.dob}`,
            `Address: ${d.address1}${d.address2 ? ', ' + d.address2 : ''}, ${d.city}, ${d.state} ${d.zip}`,
            `Denomination: ${d.denomination.join(', ')}`,
            `Baptized: ${Array.isArray(d.baptized) ? d.baptized.join(', ') : d.baptized}`,
            '',
            'Family:',
            d.family,
        ].join('\n');

        const html = `
      <h2>New Connect Submission</h2>
      <p><strong>Name:</strong> ${d.firstName} ${d.lastName}</p>
      <p><strong>Email:</strong> ${d.email}</p>
      <p><strong>Phone:</strong> ${d.phone}</p>
      <p><strong>DOB:</strong> ${d.dob}</p>
      <p><strong>Address:</strong><br/>
        ${d.address1}${d.address2 ? ', ' + d.address2 : ''}<br/>
        ${d.city}, ${d.state} ${d.zip}
      </p>
      <p><strong>교단 배경:</strong> ${d.denomination.join(', ')}</p>
      <p><strong>세례 여부:</strong> ${Array.isArray(d.baptized) ? d.baptized.join(', ') : d.baptized}</p>
      <p><strong>가족 사항:</strong><br/>${d.family.replace(/\n/g,'<br/>')}</p>
    `;

        // --- Send (with error visibility in logs) ---
        let result;
        try {
            result = await resend.emails.send({
                from: process.env.CONTACT_FROM, // e.g. "The STORY Church <connect@mg.thestorywc.org>"
                to: toAddresses,
                subject,
                html,
                text: textBody,
                reply_to: d.email,
            });
        } catch (e) {
            console.error('[connect] resend threw:', e);
            return { ok: false, error: 'Email send failed.' };
        }
        if (result?.error) {
            console.error('[connect] resend error:', result.error);
            return { ok: false, error: 'Email send failed.' };
        }

        return { ok: true };
    } catch (e) {
        console.error('[connect] unexpected:', e);
        return { ok: false, error: 'Server error.' };
    }
}