// Pure template function — no side effects
// Used server-side only in api/contact.ts

import { ReactElement } from 'react';

interface ContactNotificationProps {
  name: string;
  email: string;
  message: string;
}

export default function ContactNotification({
  name,
  email,
  message,
}: ContactNotificationProps): ReactElement {
  return (
    <div
      style={{
        fontFamily: 'Satoshi, sans-serif',
        color: '#1a2e1a',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '24px',
        backgroundColor: '#faf8f5',
        border: '1px solid #e9e5dd',
        borderRadius: '8px',
      }}
    >
      <h2
        style={{
          fontFamily: 'Fraunces, serif',
          fontSize: '1.5rem',
          marginBottom: '16px',
          color: '#1a2e1a',
        }}
      >
        New Contact Submission
      </h2>
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Email:</strong>{' '}
        <a href={`mailto:${email}`} style={{ color: '#e66000' }}>
          {email}
        </a>
      </p>
      <p>
        <strong>Message:</strong>
      </p>
      <blockquote
        style={{
          background: '#e9e5dd',
          padding: '12px',
          borderLeft: '4px solid #e66000',
          margin: '16px 0',
          fontStyle: 'italic',
        }}
      >
        {message}
      </blockquote>
      <footer
        style={{
          marginTop: '24px',
          color: '#4a4a4a',
          fontSize: '0.875rem',
        }}
      >
        <p>Received on Portfolio Pro — your minimalist personal portfolio.</p>
      </footer>
    </div>
  );
}