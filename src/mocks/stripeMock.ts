// Stripe is not used in current version — reserved for future payments or subscriptions
// This mock prevents errors if Stripe is conditionally imported later

export const loadStripe = () => ({
  redirectToCheckout: () => Promise.resolve({ error: null }),
});

export const stripe = {
  redirectToCheckout: () => Promise.resolve({ error: null }),
};