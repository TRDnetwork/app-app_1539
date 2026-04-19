// Pure template function — no side effects
// Used server-side only in api/contact.ts

import { ReactElement } from 'react';

interface ContactConfirmationProps {
  name: string;
}

export default function ContactConfirmation({
  name,
}: ContactConfirmationProps): ReactElement {
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
        Thank You, {name}!
      </h2>
      <p>We’ve received your message and will get back to you as soon as possible.</p>
      <p>
        In the meantime, feel free to explore more of our work at{' '}
        <a href="https://portfolio-pro.com" style={{ color: '#e66000' }}>
          portfolio-pro.com
        </a>
        .
      </p>
      <footer
        style={{
          marginTop: '24px',
          color: '#4a4a4a',
          fontSize: '0.875rem',
        }}
      >
        <p>Sent with care from Portfolio Pro.</p>
        <p>
          <a href="#" style={{ color: '#4a4a4a' }}>
            Unsubscribe
          </a>
        </p>
      </footer>
    </div>
  );
}