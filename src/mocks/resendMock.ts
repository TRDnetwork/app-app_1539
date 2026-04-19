// Resend is used server-side only — this mock is for potential future client usage
// Currently, email is handled via Vercel serverless function

export const sendEmail = jest.fn().mockResolvedValue({
  success: true,
  message: 'Mock email sent successfully',
});

// Mock for Resend's email send function structure
export default {
  emails: {
    send: sendEmail,
  },
};