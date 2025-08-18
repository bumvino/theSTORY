'use server';

import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

// Zod schema for robust validation
const schema = z.object({
    firstName: z.string().min(1).max(80),
    lastName:  z.string().min(1).max(80),
    email:     z.string().email().max(200),
    address1:  z.string().min(1).max(200),
    address2:  z.string().optional().default(''),
    city:      z.string().min(1).max(120),
    state:     z.string().min(1).max(120),
    zip:       z.string().min(3).max(20),
    phone:     z.string().min(7).max(40),
    dob:       z.string().min(4).max(20),
    denomination: z.array(z.enum(['장로교','감리교','침례교','성결교','그외'])).min(1),
    baptized:  z.array(z.enum(['예','아니오'])).min(1),
    family:    z.string().min(1).max(4000),

    // spam fields
    honey:     z.string().optional(),
    ts:        z.string().optional(),
});

export async function submitConnect(formData) {
    // Honeypot / time gate
    const honey = formData.get('company') || '';      // should be empty
    const ts     = Number(formData.get('ts') || 0);   // ms timestamp
    const tooFast = Date.now() - ts < 2500;           // <2.5s = likely bot
    if (honey || tooFast) {
        return { ok: true }; // silently succeed
    }

    // Collect multi-value fields
    const denomination = formData.getAll('denomination');
    const baptized     = formData.getAll('baptized');

    const data = {
        firstName:  formData.get('firstName')?.toString() || '',
        lastName:   formData.get('lastName')?.toString()  || '',
        email:      formData.get('email')?.toString()     || '',
        address1:   formData.get('address1')?.toString()  || '',
        address2:   formData.get('address2')?.toString()  || '',
        city:       formData.get('city')?.toString()      || '',
        state:      formData.get('state')?.toString()     || '',
        zip:        formData.get('zip')?.toString()       || '',
        phone:      formData.get('phone')?.toString()     || '',
        dob:        formData.get('dob')?.toString()       || '',
        family:     formData.get('family')?.toString()    || '',
        denomination,
        baptized,
        honey,
        ts: formData.get('ts')?.toString() || '',
    };

    const parsed = schema.safeParse(data);
    if (!parsed.success) {
        return { ok: false, error: 'Please check required fields.' };
    }

    // Build email body
    const d = parsed.data;
    const subject = `New Connect Card: ${d.firstName} ${d.lastName}`;
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
    <p><strong>세례 여부:</strong> ${d.baptized.join(', ')}</p>
    <p><strong>가족 사항:</strong><br/>${d.family.replace(/\n/g,'<br/>')}</p>
  `;

    // Send email
    await resend.emails.send({
        from: process.env.CONTACT_FROM,
        to:   process.env.CONTACT_TO,
        subject,
        html,
        reply_to: d.email, // optional
    });

    return { ok: true };
}