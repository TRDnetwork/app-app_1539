import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from './ContactForm';

describe('ContactForm', () => {
  const setup = () => render(<ContactForm />);

  test('renders all form fields and submit button', () => {
    setup();
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /message/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  test('shows error when name is empty on submit', async () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
  });

  test('shows error when email is invalid', async () => {
    setup();
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'not-an-email' } });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByText(/valid email is required/i)).toBeInTheDocument();
  });

  test('shows error when message is too short', async () => {
    setup();
    fireEvent.change(screen.getByRole('textbox', { name: /message/i }), { target: { value: 'Hi' } });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByText(/message must be at least 10 characters/i)).toBeInTheDocument();
  });

  test('clears errors when user starts typing after validation failure', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'John' } });
    expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
  });

  test('submits form successfully when all fields are valid', async () => {
    setup();
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByRole('textbox', { name: /message/i }), { target: { value: 'This is a detailed message with more than ten characters.' } });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByText(/message sent successfully/i)).toBeInTheDocument();
  });

  test('triggers honeypot and prevents submission if bot-field is filled', () => {
    setup();
    fireEvent.change(screen.getByTestId('bot-field'), { target: { value: 'bot' } });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(screen.queryByText(/message sent successfully/i)).not.toBeInTheDocument();
  });
});