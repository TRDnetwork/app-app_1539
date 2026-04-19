# Portfolio Pro Test Suite

## How to Run
1. Install dependencies: `npm install vitest jsdom @testing-library/react @testing-library/jest-dom`
2. Run tests: `npm test`
3. Watch mode: `npm run test:watch`
4. Coverage report: `npm run test:coverage`

## Test Coverage
- `app.test.js`: Tests the main App component rendering, including:
  - Hero section with name and role
  - About section content
  - Project cards display and layout
  - Contact form validation and submission flow
  - Toast notification display

- `api.test.js`: Tests the contact form API integration, including:
  - Proper fetch calls to /api/send-email endpoint
  - Successful submission handling
  - Validation error responses
  - Honeypot bot detection behavior
  - Mocked response handling

## Notes
- Uses Vitest with jsdom for browser-like environment
- Includes mocks for IntersectionObserver and fetch API
- Tests both happy paths and error conditions
- Focuses on user interaction flows and accessibility features