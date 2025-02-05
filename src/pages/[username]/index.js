import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosConfig";
import Sidebar from "@/components/Sidebar";

const Dashboard = () => {
  const router = useRouter();
  const { username } = router.query;
  const [user, setUser] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Router query:", router.query); // Debug log
    if (username) {
      fetchUserData();
      fetchUserResumes();
    }
  }, [username]);

  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get(`/users/username/${username}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to load user data.");
    }
  };

  const fetchUserResumes = async () => {
    try {
      const response = await axiosInstance.get(`/users/username/${username}/resumes`);
      setResumes(response.data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
      setError("Failed to load resumes.");
    }
  };

  return (
    <main className="relative pl-16 min-h-screen min-w-full bg-white dark:bg-gray-900">
      <Sidebar />

      {/* Dashboard */}
      <div className="grid min-h-screen p-6 gap-6">
        {/* Section 1 */}
        <div className="bg-gray-100 rounded-xl dark:bg-gray-800 p-6">
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          <section>
            {user ? (
              <>
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Welcome, {user.name}!
                </h1>
                <hr className="my-4" />
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  Here's an overview of your recent activities.
                </p>
              </>
            ) : (
              <div className="text-center text-gray-900 dark:text-gray-100">
                <p>Loading user data...</p>
              </div>
            )}
          </section>
        </div>

        {/* Section 2 */}
        <div className="bg-gray-100 rounded-xl dark:bg-gray-800 p-6">
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          <section>
            {resumes.length > 0 ? (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Your Resumes</h2>
                <ul>
                  {resumes.map((resume) => (
                    <li key={resume.id} className="mb-2 text-lg text-gray-700 dark:text-gray-300">
                      {resume.title}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-center text-gray-900 dark:text-gray-100">
                <p>Loading resumes...</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
