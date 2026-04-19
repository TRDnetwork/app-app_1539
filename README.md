# Portfolio Pro

A clean, warm-minimalist personal portfolio site built with React + Vite, designed to showcase your work and let visitors get in touch seamlessly.

## Features

- **Hero Section**: Prominent display of your name and professional tagline.
- **About Section**: A descriptive paragraph introducing who you are and what you do.
- **Project Showcase**: Three responsive project cards with titles, descriptions, and optional images.
- **Contact Form**: Fully functional contact form with:
  - Client-side validation
  - Honeypot bot protection
  - Success toast notification (auto-dismisses in 4 seconds)
  - Serverless email delivery via Resend
- **Performance Optimized**: Lazy-loaded images, debounced submission, and inlined critical styles.
- **Secure**: Honeypot, rate limiting, input sanitization, and secure headers.

## Tech Stack

- **Frontend**: React, Vite, TypeScript
- **Styling**: Tailwind CSS (via CDN), Fraunces & Satoshi fonts
- **Animations**: Framer Motion (via inline keyframes)
- **Email**: Resend (serverless on Vercel)
- **Security**: Upstash Rate Limiting, CSP headers, XSS protection
- **Hosting**: Vercel (recommended)

## Setup Instructions

### 1. Clone and Install

```bash
git clone https://github.com/your-username/portfolio-pro.git
cd portfolio-pro
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and update the values:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
RESEND_API_KEY=your_resend_api_key_here
OWNER_EMAIL=contact@yourdomain.com
```

> 🔐 Never commit `.env.local`. This file is git-ignored.

### 3. Run Locally

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

### 4. Build for Production

```bash
npm run build
```

## Deployment (Vercel)

1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and import your project.
3. Add environment variables in the Vercel dashboard:
   - `RESEND_API_KEY`
   - `OWNER_EMAIL`
4. Deploy!

> ✅ This app is optimized for Vercel: serverless contact API, edge-compatible, and CDN-hosted assets.

## Folder Structure

```
portfolio-pro/
├── api/                    # Vercel serverless functions
│   └── contact.ts          # Handles form submission and email sending
├── src/
│   ├── components/
│   │   ├── ContactForm.tsx # Contact form with validation and toast
│   │   └── ProjectCard.tsx # Reusable project card component
│   ├── emails/             # Server-side React email templates
│   │   ├── contact-notification.tsx
│   │   └── contact-confirmation.tsx
│   └── App.tsx             # Main app layout
├── index.html              # Tailwind CDN + inlined critical styles
├── middleware.ts           # Rate limiting for contact form
└── next.config.js          # Security headers (CSP, X-Frame-Options, etc.)
```

## API Endpoints

### `POST /api/contact`

Handles contact form submissions.

**Request Body**:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "Hello, I'd like to work together!",
  "bot-field": "" // honeypot (hidden)
}
```

**Responses**:
- `200 OK` – Message sent successfully (or honeypot triggered)
- `400 Bad Request` – Validation error
- `429 Too Many Requests` – Rate limited (5 requests / 10s)
- `500 Internal Server Error` – Email sending failed

**Example Request**:
```bash
curl -X POST https://portfolio-pro.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

## Customization

- **Colors & Fonts**: Edit `index.html` `<script>` block under `tailwind.config`
- **Projects**: Update `projects` array in `src/components/ProjectCard.tsx`
- **Email Templates**: Modify `src/emails/*.tsx` (server-side only)
- **Rate Limiting**: Adjust in `middleware.ts` (`5 requests per 10 seconds`)

## Testing

Run unit and integration tests:

```bash
npm test
```

Test coverage includes:
- Component rendering
- Form validation
- API integration (mocked)
- Toast behavior
- Honeypot detection

## Security

This app includes:
- ✅ **Honeypot field** to silently reject bots
- ✅ **Rate limiting** (5 req/10s) via Upstash
- ✅ **CSP & security headers** (XSS, clickjacking protection)
- ✅ **Input sanitization** in email templates
- ✅ **Server-side email sending** (no API key exposure)

See `SECURITY_REPORT.md` for full audit.

## Performance

Optimized for fast load and smooth UX:
- ✅ Inlined critical CSS/animations
- ✅ Lazy-loaded project images
- ✅ Debounced form submission
- ✅ Memoized toast component
- ✅ Minimal bundle size (~165KB)

See `PERFORMANCE_REPORT.md` for details.

---

Made with ❤️ using warm minimalism — beige canvas, dark green text, burnt orange accents.