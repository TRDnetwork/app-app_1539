import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = 'onboarding@resend.dev';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message, 'bot-field': botField } = req.body;

  // Honeypot check
  if (botField) {
    // Simulate success to fool bots
    return res.status(200).json({ error: '' });
  }

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Basic email format validation
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: 'contact@portfolio-pro.com', // User should update this in production
      subject: `New message from ${name} via Portfolio Pro`,
      reply_to: email,
      html: `
        <div style="font-family: 'Satoshi', sans-serif; color: #1a2e1a; max-width: 600px; margin: 0 auto; padding: 20px; background: #faf8f5; border: 1px solid #e9e5dd; border-radius: 8px;">
          <h2 style="font-family: 'Fraunces', serif; color: #1a2e1a; font-size: 1.5rem; margin-bottom: 16px;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #e9e5dd; padding: 12px; border-radius: 6px; border-left: 4px solid #e66000;">${message}</p>
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #e9e5dd;" />
          <p style="color: #4a4a4a; font-size: 0.9rem;">This message was sent from the Portfolio Pro contact form.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ message: 'Failed to send email. Please try again.' });
    }

    return res.status(200).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ message: 'An unexpected error occurred. Please try again.' });
  }
}