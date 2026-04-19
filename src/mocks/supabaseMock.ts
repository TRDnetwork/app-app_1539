// Supabase is not used in this static site — reserved for future expansion
// This mock is provided for potential future integration

export const supabase = {
  from: () => ({
    select: () => ({
      eq: () => ({ data: null, error: null }),
    }),
    insert: () => ({ data: null, error: null }),
  }),
};