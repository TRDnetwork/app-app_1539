# API Documentation

This site uses a single serverless function to handle contact form submissions.

---

## `POST /api/send-email`

Sends a contact form submission via email using Resend.

### Request
**URL**: `https://portfolio-pro.vercel.app/api/send-email`  
**Method**: `POST`  
**Content-Type**: `application/json`

#### Body Parameters
| Field | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | ✅ | Full name of the sender |
| `email` | string | ✅ | Email address (must be valid format) |
| `message` | string | ✅ | Message content |
| `bot-field` | string | ❌ | Honeypot field — must be empty |

> 🤖 The `bot-field` is a hidden input used to detect bots. If filled, the request is silently rejected.

### Validation Rules
- All required fields must be present and non-empty
- Email must match basic regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- `bot-field` must be empty or omitted

### Responses

#### `200 OK`
Email was sent successfully — or submission was blocked (e.g. bot detected).

**Response Body**:
```json
{ "success": true }
```

> 🔒 Even when blocked (honeypot triggered), the server returns `200` to avoid revealing bot detection.

#### `400 Bad Request`
Validation failed.

**Possible Errors**:
```json
{ "error": "Missing required fields" }
```
```json
{ "error": "Invalid email format" }
```

#### `500 Internal Server Error`
Email could not be sent.

**Response Body**:
```json
{ "error": "Failed to send message. Please try again." }
```

### Example Requests

#### ✅ Valid Submission
```bash
curl -X POST https://portfolio-pro.vercel.app/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "message": "I love your work! Can we collaborate?",
    "bot-field": ""
  }'
```

#### ❌ Invalid Email
```bash
curl -X POST https://portfolio-pro.vercel.app/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bob",
    "email": "not-an-email",
    "message": "Hi there",
    "bot-field": ""
  }'
```
→ Returns `400` with `"Invalid email format"`

#### 🤖 Bot Detected (Honeypot Filled)
```bash
curl -X POST https://portfolio-pro.vercel.app/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "SpamBot",
    "email": "spam@bot.com",
    "message": "Buy my thing!",
    "bot-field": "I am a bot"
  }'
```
→ Returns `200` with `{ "success": true }` (silent rejection)

---

## Email Templates

Two emails are sent on successful submission:

### 1. Notification to Site Owner
- **From**: `onboarding@resend.dev` (or verified domain)
- **To**: `process.env.OWNER_EMAIL`
- **Subject**: `New Contact Form Submission from {name}`
- **Content**: Includes name, email, and message in formatted layout

### 2. Confirmation to User
- **From**: `onboarding@resend.dev`
- **To**: User's email
- **Subject**: `Thank you for reaching out!`
- **Content**: Personalized thank-you message

> Templates are defined in React components (`src/emails/*.tsx`) but rendered to HTML strings server-side.

---

## Security Measures
- **Honeypot field** to trap bots
- **Input validation** on all fields
- **Server-side email sending** — API key never exposed to browser
- **Silent bot rejection** — prevents fingerprinting
- **Rate limiting** — enforced by Vercel (default: 100 requests/10s per IP)

---

## Deployment Notes
- Deployed on **Vercel**
- Function path: `api/send-email.ts`
- Uses Node.js runtime
- Environment variables required:
  - `RESEND_API_KEY`
  - `OWNER_EMAIL`
- Verified sending domain recommended for better deliverability