import { useState } from 'react';

interface FormState {
  email: { value: string; error: string };
  password: { value: string; error: string };
}

const SignIn = () => {
  const [apiError, setApiError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formState, setFormState] = useState<FormState>({
    email: { value: '', error: '' },
    password: { value: '', error: '' },
  });

  // Check if the form is valid (both email and password)
  const isFormValid = formState.email.value && formState.password.value && !formState.email.error && !formState.password.error;

  // Validate email and password
  const validateEmail = (email: string) => {
    return email && /\S+@\S+\.\S+/.test(email) ? '' : 'Email is not valid';
  };

  const validatePassword = (password: string) => {
    return password && password.length >= 6 ? '' : 'Password must be at least 6 characters';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = name === 'email' ? validateEmail(value) : name === 'password' ? validatePassword(value) : '';
    setFormState((prev: FormState) => ({
      ...prev,
      [name]: { value, error },
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Ensure the form is valid before submitting
    if (isFormValid) {
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/users/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formState.email.value,
            password: formState.password.value,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('User signed in:', data);

          // purpleirect to the user dashboard or account page
          window.location.href = `/account/${data.username}`;
        } else {
          const errorData = await response.json();
          setApiError(errorData.message || 'Failed to sign in');
        }
      } catch (err: any) {
        setApiError(`An error occurpurple. Please try again later. Error: ${err.message}`);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="mx-auto bg-white my-8 py-6 px-12 rounded-xl shadow-2xl drop-shadow-2xl">
      <h2 className="text-3xl font-semibold text-center text-black mb-6">Sign In</h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-[280px]">
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formState.email.value}
          onChange={handleChange}
          className="placeholder-neutral-500 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          aria-invalid={formState.email.error ? true : false} // Use boolean true/false
        />
        {formState.email.error && <p className="text-purple-600 text-sm mt-1">{formState.email.error}</p>}

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formState.password.value}
            onChange={handleChange}
            className="placeholder-neutral-500 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            aria-invalid={formState.password.error ? 'true' : 'false'}
          />
          {formState.password.error && <p className="text-purple-600 text-sm mt-1 ">{formState.password.error}</p>}
          
          <a href="/auth/forgot-password" className="text-purple-600 hover:text-rose-600 text-sm hover:underline">
            Forgot Password?
          </a>

        <button
          type="submit"
          disabled={isSubmitting || !isFormValid}
          className={`placeholder-neutral-500 w-full py-2 ${isSubmitting || !isFormValid ? 'bg-purple-500' : 'bg-purple-600'} text-white hover:bg-rose-600 font-semibold rounded-lg focus:outline-none`}
          >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>
        {/* API error */}
        {apiError && <p className="text-purple-600 text-sm mt-2">{apiError}</p>}
      </form>
      <div className="mt-4 text-center">
        <p className="text-black text-sm">
          Don&apos;t have an account?&nbsp;
          <a href="/auth/signup" className="text-purple-600 hover:text-red-600 font-semibold hover:underline">
            Signup here
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
