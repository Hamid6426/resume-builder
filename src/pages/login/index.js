import { useState } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode"; // Correct import
import axiosInstance from "@/utils/axiosConfig";

export default function UserLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccess(false);

    try {
      const response = await axiosInstance.post("/users/auth/login", {
        email,
        password,
      });
      console.log("User logged in successfully:", response.data);

      setSuccess(true);
      setErrorMessage(null);

      // Store token
      const token = response.data.token;
      localStorage.setItem("token", token);

      // Decode username from token
      const decoded = jwtDecode(token);
      console.log("Decoded token data:", decoded);

      // Ensure token contains username field
      const username = decoded.username;
      if (!username) {
        throw new Error("Username not found in token");
      }

      // Redirect to dashboard
      router.push(`/${username}`);
    } catch (error) {
      console.error("Error logging in user:", error);
      setErrorMessage(
        "Failed to log in. Please check your credentials and try again."
      );
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
        User Login
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg"
      >
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-lg text-gray-700 dark:text-gray-300 mb-2"
          >
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
          <label
            htmlFor="password"
            className="block text-lg text-gray-700 dark:text-gray-300 mb-2"
          >
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
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}
        {success && (
          <div className="text-green-500 text-center mb-4">
            User logged in successfully!
          </div>
        )}
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-400 transition duration-200"
          disabled={isLoading} // disable while loading
        >
          {isLoading ? "Logging In..." : "Login"}
        </button>
      </form>
      <div className="mt-4 text-center">
        <p>
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
