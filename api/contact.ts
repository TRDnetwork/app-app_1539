import { NextApiRequest, NextApiResponse } from 'next';

// Import Resend only on server-side — never in client bundle
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Define expected request body
interface ContactRequestBody {
  name: string;
  email: string;
  message: string;
  'bot-field'?: string; // Honeypot field
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message, 'bot-field': botField }: ContactRequestBody = req.body;

  // Honeypot check — if filled, it's likely a bot
  if (botField) {
    return res.status(200).json({ success: true }); // Silent success to avoid tipping off bots
  }

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    // Send notification to site owner
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.OWNER_EMAIL || 'owner@portfolio-pro.com',
      subject: `New Contact Form Submission from ${name}`,
      html: renderContactNotification({ name, email, message }),
    });

    // Optionally send confirmation to user
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Thank you for reaching out!',
      html: renderContactConfirmation({ name }),
    });

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
}

function renderContactNotification({ name, email, message }: { name: string; email: string; message: string }) {
  return `
    <div style="font-family: 'Satoshi', sans-serif; color: #1a2e1a; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #faf8f5; border: 1px solid #e9e5dd; border-radius: 8px;">
      <h2 style="font-family: 'Fraunces', serif; font-size: 1.5rem; margin-bottom: 16px; color: #1a2e1a;">New Contact Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #e66000;">${email}</a></p>
      <p><strong>Message:</strong></p>
      <blockquote style="background: #e9e5dd; padding: 12px; border-left: 4px solid #e66000; margin: 16px 0; font-style: italic;">
        ${message}
      </blockquote>
      <footer style="margin-top: 24px; color: #4a4a4a; font-size: 0.875rem;">
        <p>Received on Portfolio Pro — your minimalist personal portfolio.</p>
      </footer>
    </div>
  `;
}

function renderContactConfirmation({ name }: { name: string }) {
  return `
    <div style="font-family: 'Satoshi', sans-serif; color: #1a2e1a; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #faf8f5; border: 1px solid #e9e5dd; border-radius: 8px;">
      <h2 style="font-family: 'Fraunces', serif; font-size: 1.5rem; margin-bottom: 16px; color: #1a2e1a;">Thank You, ${name}!</h2>
      <p>We’ve received your message and will get back to you as soon as possible.</p>
      <p>In the meantime, feel free to explore more of our work at <a href="https://portfolio-pro.com" style="color: #e66000;">portfolio-pro.com</a>.</p>
      <footer style="margin-top: 24px; color: #4a4a4a; font-size: 0.875rem;">
        <p>Sent with care from Portfolio Pro.</p>
        <p><a href="#" style="color: #4a4a4a;">Unsubscribe</a></p>
      </footer>
    </div>
  `;
}