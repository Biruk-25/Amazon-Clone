
export const errorMessages = {
  signin: {
    'auth/user-not-found': 'No account found with this email. Try signing up.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/invalid-email': 'Please enter a valid email address.',
  },
  signup: {
    'auth/email-already-in-use': 'This email is already registered. Try signing in.',
    'auth/weak-password': 'Your password is too weak. Use at least 6 characters.',
    'auth/invalid-email': 'Please enter a valid email address.',
  },
};

export const getFallback = (mode) =>
  mode === 'signin'
    ? 'Failed to sign in. Please check your credentials.'
    : 'Failed to create account. Please try again.';
