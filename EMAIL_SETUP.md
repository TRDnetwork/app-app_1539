# 📨 Email Setup for Portfolio Pro

This guide walks you through setting up transactional email for your portfolio site using [Resend](https://resend.com).

---

## 🔧 Step 1: Get Your Resend API Key

1. Go to [resend.com](https://resend.com) and sign up or log in.
2. Navigate to **API Keys** and create a new key (e.g., `portfolio-pro-key`).
3. Copy the generated key (it will look like `re_abc123...`).

> 🔐 **Never commit this key to version control.**

---

## 🌐 Step 2: Set Environment Variables in Vercel

1. Go to your project dashboard on [Vercel](https://vercel.com).
2. Open your **Portfolio Pro** project.
3. Navigate to **Settings > Environment Variables**.
4. Add the following variables:

| Key               | Value                     |
|-------------------|---------------------------|
| `RESEND_API_KEY`  | `re_abc123...` (your key) |
| `OWNER_EMAIL`     | `you@yourdomain.com`      |

> ❗ Use `RESEND_API_KEY`, **not** `VITE_RESEND_API_KEY` — the latter would expose it to the browser.

---

## 📨 Step 3: Update Email Recipient (Optional)

By default, emails are sent to `process.env.OWNER_EMAIL`. Make sure this is set to your real email address.

---

## 🔄 Step 4: Verify Your Sending Domain

1. In Resend dashboard, go to **Domains**.
2. Add and verify your domain (e.g., `portfolio-pro.com`).
3. Once verified, update the `from` field in `api/contact.ts` to use a verified email like `hello@portfolio-pro.com`.

---

## 🚀 Step 5: Test the Contact Form

1. Deploy your site.
2. Fill out the contact form with real data.
3. Check:
   - You receive the notification email.
   - The user receives a confirmation email.

---

## 🛠 Frontend Integration Note

The frontend **does not** import any email SDK. Instead, it sends form data via `fetch`:

```ts
await fetch('/api/contact', {
  method: 'POST',
  body: JSON.stringify({ name, email, message }),
  headers: { 'Content-Type': 'application/json' },
});
```

This keeps the Resend SDK and API key securely on the server.

---

## 🧹 Honeypot & Security

- A hidden `bot-field` is used to detect bots.
- The server returns a 200 OK even for blocked submissions to avoid revealing bot detection.
- All inputs are validated before sending.

---

✅ Done! Your portfolio now securely sends contact form submissions.