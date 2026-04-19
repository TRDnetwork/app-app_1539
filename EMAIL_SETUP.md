# 📨 Email Setup with Resend

This app uses [Resend](https://resend.com) to send transactional emails from the contact form. All email logic is handled server-side via a Vercel serverless function to keep your API key secure.

## 🔐 Step 1: Get Your Resend API Key
1. Go to [https://resend.com](https://resend.com) and sign up or log in.
2. Navigate to **API Keys** and create a new API key.
3. Copy the key (it will look like `re_12345678...`).

## ⚙️ Step 2: Set Environment Variable in Vercel
1. In your Vercel dashboard, go to your project settings.
2. Navigate to **Environment Variables**.
3. Add a new variable:
   - **Key**: `RESEND_API_KEY`
   - **Value**: Paste your Resend API key here
   - ✅ Make sure this is **NOT** marked as "VITE_" or exposed to the client
4. Redeploy your project.

## 🌐 Step 3: Verify Your Sending Domain
1. In Resend, go to **Domains** and click "Add Domain".
2. Enter your domain (e.g., `portfolio-pro.com`) and follow DNS verification steps.
3. Once verified, update the `fromEmail` in `api/contact.ts` to use your verified address (e.g., `hello@portfolio-pro.com`).

## 🧪 Step 4: Test the Contact Form
1. Fill out the contact form on your site.
2. Check that:
   - A notification email arrives at the owner inbox (`contact@portfolio-pro.com` or your updated address)
   - The user receives a confirmation email
   - No errors appear in the browser console or Vercel logs

## 📣 Frontend Integration Note
The frontend **does not** import any email SDK. It simply sends a POST request:

```js
fetch('/api/contact', {
  method: 'POST',
  body: JSON.stringify({ name, email, message }),
  headers: { 'Content-Type': 'application/json' }
})
```

Never use `import { Resend } from 'resend'` on the client — this keeps your API key safe.

## 🛠 Troubleshooting
- **500 error?** Check Vercel logs for Resend error messages.
- **Email not arriving?** Confirm domain verification in Resend.
- **Spam?** Use the honeypot field (`bot-field`) and ensure your domain has SPF/DKIM records.

✅ You're all set! Your portfolio now accepts messages securely.