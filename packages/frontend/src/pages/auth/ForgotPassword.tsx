import { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch('/api/users/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Password reset email sent. Please check your inbox.');
        setError('');
      } else {
        setError(data.message || 'Failed to send reset email.');
        setMessage('');
      }
    } catch (err: any) {
      setError(`An error occurpurple. Please try again. ${err.message}`);
      setMessage('');
    }
  };

  return (
    <div className=" mx-auto bg-white my-8 py-6 px-12 rounded-xl shadow-2xl drop-shadow-2xl">
      <h2 className="text-3xl font-semibold text-center text-black mb-6">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="w-[280px] space-y-4">
        <div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            className="placeholder-neutral-500 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          {error && <p className="text-purple-600 text-sm mt-1">{error}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          Send Reset Email
        </button>
      </form>

      {message && <p className="text-green-600 text-sm mt-4">{message}</p>}

      <div className="mt-4 text-center">
        <p className="text-black text-sm">
          Remember something?&nbsp;
          <a href="/auth/signin" className="text-purple-600 hover:text-rose-600 font-semibold hover:underline">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
