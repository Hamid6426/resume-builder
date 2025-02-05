import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from '@/ui/utils/axiosConfig';

const Dashboard = () => {
  const router = useRouter();
  const { username } = router.query;
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (username) {
      fetchUserData();
    }
  }, [username]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`/users/username/${username}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to load user data.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto p-8">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          {user ? (
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                Welcome, {user.firstName}!
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                We're glad to see you here, {user.firstName}. Here are your recent activities and updates.
              </p>
              {/* Add any additional sections or components for dashboard content */}
              <div className="mt-6">
                {/* Example content section */}
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Your Activities</h2>
                <ul className="text-lg text-gray-700 dark:text-gray-300">
                  <li className="mb-2">- Activity 1</li>
                  <li className="mb-2">- Activity 2</li>
                  <li className="mb-2">- Activity 3</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-900 dark:text-gray-100">
              <svg className="animate-spin h-5 w-5 text-gray-900 dark:text-gray-100 mx-auto my-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0c-5.523 0-10 4.477-10 10h2zm2 5.291A7.963 7.963 0 014 12H2c0 4.418 3.582 8 8 8v-2c-2.21 0-4.21-.896-5.709-2.709z"></path>
              </svg>
              <p>Loading...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
