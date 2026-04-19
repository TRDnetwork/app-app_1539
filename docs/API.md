# Portfolio Pro API Documentation

This site includes a single serverless API endpoint for handling contact form submissions. All logic runs on Vercel's edge network.

---

## `POST /api/contact`

Sends a contact form submission via email using Resend.

### Request

**URL**: `https://your-domain.com/api/contact`  
**Method**: `POST`  
**Headers**:
```http
Content-Type: application/json
```

**Body** (JSON):
| Field       | Type   | Required | Description |
|-------------|--------|----------|-------------|
| `name`      | string | Yes      | Sender's full name |
| `email`     | string | Yes      | Sender's email address |
| `message`   | string | Yes      | Message content |
| `bot-field` | string | No       | Honeypot field (should be empty) |

**Example**:
```json
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "message": "I love your work! Let's collaborate.",
  "bot-field": ""
}
```

### Responses

| Code | Status | Response Body | Description |
|------|--------|---------------|-------------|
| `200` | OK | `{}` | Success — email sent or honeypot triggered |
| `400` | Bad Request | `{"message": "All fields are required."}` | Missing or invalid fields |
| `429` | Too Many Requests | `"Too many requests"` | Rate limit exceeded (5/10s) |
| `500` | Internal Server Error | `{"message": "Failed to send email."}` | Email service error |

> 💡 The server returns `200` even for honeypot-triggered submissions to avoid revealing bot detection.

### Email Delivery

Two emails are sent on successful submission:

#### 1. Notification to Owner
- **To**: `OWNER_EMAIL` (from `.env`)
- **From**: `onboarding@resend.dev` (or your verified domain)
- **Subject**: `New message from {name} via Portfolio Pro`
- **Template**: `src/emails/contact-notification.tsx`
- **Includes**: Name, email, message

#### 2. Confirmation to User
- **To**: User's email (`email` field)
- **From**: Same as above
- **Subject**: `Thank you, {name}!`
- **Template**: `src/emails/contact-confirmation.tsx`

### Security & Rate Limiting

- **Rate Limit**: 5 requests per 10 seconds per IP (via Upstash Redis)
- **Headers**:
  ```http
  X-RateLimit-Limit: 5
  X-RateLimit-Remaining: 2
  X-RateLimit-Reset: 1700000000
  ```
- **Bot Protection**: Honeypot field (`bot-field`) silently rejects submissions if filled.

### Example cURL Commands

**Successful Submission**:
```bash
curl -X POST https://portfolio-pro.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bob Smith",
    "email": "bob@example.com",
    "message": "Great portfolio! Let's talk.",
    "bot-field": ""
  }'
```

**Validation Error**:
```bash
curl -X POST https://portfolio-pro.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "",
    "email": "invalid",
    "message": ""
  }'
# → 400 Bad Request
```

**Rate Limited**:
```bash
# After 5 rapid requests
curl -X POST https://portfolio-pro.com/api/contact [...]
# → 429 Too Many Requests
```

---

🔐 All email logic is server-side. Never expose `RESEND_API_KEY` to the browser.