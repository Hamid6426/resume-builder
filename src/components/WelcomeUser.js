// components/UserDetails.js
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const WelcomeUser = () => {
  const [username, setUsername] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.username);
      } catch (error) {
        console.error("Error decoding token:", error);
        setError("Failed to decode token.");
      }
    } else {
      setError("No token found.");
    }
  }, []);

  return (
    <div className="bg-gray-100 rounded-xl dark:bg-gray-800 p-6">
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {username ? (
        <section>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Welcome, {username}!</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">Here's an overview of your recent activities.</p>
        </section>
      ) : (
        <div className="text-center text-gray-900 dark:text-gray-100">Loading user data...</div>
      )}
    </div>
  );
};

export default WelcomeUser;
