// validators.js
export const validation = (formState: { 
  name: string; 
  username: string; 
  email: string; 
  password: string; 
}) => {
  let valid = true;
  const newFormState = {
    name: { value: formState.name, error: validateName(formState.name) },
    username: { value: formState.username, error: validateUsername(formState.username) },
    email: { value: formState.email, error: validateEmail(formState.email) },
    password: { value: formState.password, error: validatePassword(formState.password) },
  };

  // Check overall validity
  valid = !Object.values(newFormState).some(field => field.error);

  return { valid, newFormState };
};

// Validation functions
const validateName = (name: string) => name ? '' : 'Name is required';
const validateUsername = (username: string) => username ? '' : 'Username is required';
const validateEmail = (email: string) => email && /\S+@\S+\.\S+/.test(email) ? '' : 'Email is not valid';
const validatePassword = (password: string) => password && password.length >= 6 ? '' : 'Password must be at least 6 characters';