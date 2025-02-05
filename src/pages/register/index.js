import { useState } from "react";
import axios from "@/ui/utils/axiosConfig";
import { useRouter } from "next/router";

const UserRegisterPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // for loading state
  const [errorMessage, setErrorMessage] = useState(''); // to show error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
  
    try {
      const userData = { username, email, password, firstName, lastName };
      const response = await axios.post('/users', userData);
  
      if (response.status === 201 || response.data.user) {
        router.push("/login"); 
      } else {
        setErrorMessage(response.data.message || "Registration failed.");
      }
    } catch (error) { 
      console.error("Signup error:", error);
      setErrorMessage(error.response?.data?.error || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="my-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
        User Sign Up
      </h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg">
        <div className="mb-6">
          <label htmlFor="username" className="block text-lg text-gray-700 dark:text-gray-300 mb-2">
            Username <span className="text-red-500">(required)</span>
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="firstName" className="block text-lg text-gray-700 dark:text-gray-300 mb-2">
            First Name <span className="text-red-500">(required)</span>
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="lastName" className="block text-lg text-gray-700 dark:text-gray-300 mb-2">
            Last Name <span className="text-red-500">(required)</span>
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-lg text-gray-700 dark:text-gray-300 mb-2">
            Email <span className="text-red-500">(required)</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-lg text-gray-700 dark:text-gray-300 mb-2">
            Password <span className="text-red-500">(required)</span>
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            required
          />
        </div>
        {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-400 transition duration-200"
          disabled={isLoading} // disable while loading
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      <div className="mt-4 text-center">
        <p>
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default UserRegisterPage;
