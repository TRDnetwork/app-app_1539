# Portfolio Pro

A minimalist personal portfolio site showcasing projects and contact information.

## 📄 Description
Portfolio Pro is a static personal website built with React and Vite, designed to highlight your work and make it easy for visitors to get in touch. The site features a clean, warm minimalist aesthetic with smooth animations and a fully responsive layout.

This project uses **client-side rendering** and contains no backend logic — all contact form handling is delegated to a Vercel serverless function (`/api/send-email`) that securely sends emails via [Resend](https://resend.com). No user data is stored.

## ✨ Features
- **Hero Section**: Prominent display of name and role
- **About Section**: Descriptive paragraph about you
- **Project Showcase**: 3 project cards in a responsive grid (1 column mobile → 3 column desktop)
- **Contact Form**: With validation, honeypot anti-spam, and toast feedback
- **Visual Polish**: Framer Motion fade-in animations, hover effects, and subtle transitions
- **Accessibility & Performance**: Semantic HTML, ARIA labels, fast load times, and mobile-first design

## 🛠 Tech Stack
| Layer | Technology |
|------|------------|
| Framework | [Vite](https://vitejs.dev/) + [React](https://react.dev/) (TypeScript) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) (via CDN), inline critical styles |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Fonts | [Fraunces](https://fonts.google.com/specimen/Fraunces) (headings), [Satoshi](https://fonts.google.com/specimen/Satoshi) (body) |
| Email | [Resend](https://resend.com) via Vercel serverless function |
| Hosting | [Vercel](https://vercel.com/) (recommended) |
| Analytics (future-ready) | PostHog, Sentry (pre-configured) |

## 📦 Project Structure
```
portfolio-pro/
├── index.html                  # Main HTML with inlined styles & fonts
├── src/
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ContactForm.tsx
│   │   └── Toast.tsx
│   ├── main.tsx                # React root
│   └── App.tsx                 # Main app component
├── api/
│   └── send-email.ts           # Vercel serverless function for email
├── EMAIL_SETUP.md              # Email configuration guide
└── README.md                   # This file
```

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/portfolio-pro.git
cd portfolio-pro
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Environment Variables
Create a `.env.local` file in the root:
```env
RESEND_API_KEY=your_resend_api_key_here
OWNER_EMAIL=you@yourdomain.com
```

> 🔐 Never commit `.env.local`. It's already in `.gitignore`.

### 4. Run Locally
```bash
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173)

## 📲 Usage Guide
- Scroll through the page to view sections
- Click on project cards to visit live demos or GitHub repos
- Fill out the contact form to test submission flow (toast appears on success)
- On production, real emails are sent via Resend

## 🚀 Deployment (Vercel)
1. Push code to a GitHub repository
2. Go to [Vercel Dashboard](https://vercel.com) → "New Project"
3. Import your repo
4. Vercel auto-detects Vite + React setup
5. Add environment variables in **Settings > Environment Variables**:
   - `RESEND_API_KEY`
   - `OWNER_EMAIL`
6. Click **Deploy**

Your site will be live at `https://portfolio-pro.vercel.app`

## 📬 API Endpoints
> These are serverless functions handled by Vercel

### `POST /api/send-email`
Sends an email using Resend.

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to collaborate!",
  "bot-field": "" // honeypot (hidden field)
}
```

**Validation**:
- All fields required
- Email format validated
- `bot-field` must be empty (anti-bot)

**Responses**:
- `200 OK` – Email sent successfully (or blocked silently)
- `400 Bad Request` – Missing fields or invalid email
- `500 Internal Server Error` – Failed to send email

**Example cURL**:
```bash
curl -X POST https://portfolio-pro.vercel.app/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "message": "Great work! Let's talk.",
    "bot-field": ""
  }'
```

## 🎨 Design System
| Property | Value | Usage |
|--------|------|-------|
| Background | `#faf8f5` | Page background |
| Text | `#1a2e1a` | Headings and body |
| Dim Text | `#4a4a4a` | Secondary text |
| Accent | `#e66000` (burnt orange) | Buttons, links, highlights |
| Surface | `#e9e5dd` | Card backgrounds |
| Font (Headings) | `Fraunces` | H1–H3 |
| Font (Body) | `Satoshi` | Paragraphs, form labels |

## 📱 Responsive Behavior
- **Mobile (375px)**: Single column layout
- **Tablet (768px)**: Two-column project grid
- **Desktop (1200px)**: Full three-column project grid
- All sections have consistent vertical rhythm and padding

## 🧪 Acceptance Criteria
✅ Page loads under 2 seconds  
✅ Contact form shows toast on submit  
✅ Project cards use responsive 1→2→3 grid  
✅ Form prevents submission if honeypot triggered  
✅ No console errors in production build  

## 📝 Notes
- **No database used** — static site only
- **Supabase reserved** for future features (e.g. feedback, analytics)
- **All styles inlined** for performance (no external CSS files)
- **Fonts loaded via Google Fonts CDN**
- **Tailwind via CDN** — not compiled (suitable for small static sites)

For email setup, see [EMAIL_SETUP.md](EMAIL_SETUP.md).