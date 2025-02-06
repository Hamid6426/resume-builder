// components/ResumesList.js
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import axiosInstance from "@/utils/axiosConfig";

const ResumesList = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id; // Use `id` from the token
      } catch (error) {
        console.error("Error decoding token:", error);
        setError("Failed to decode token.");
      }
    } else {
      setError("No token found.");
    }
  }, []);

  const fetchUserResumes = async (id) => {
    try {
      const response = await axiosInstance.get(`/resumes/id/${id}`);
      setResumes(response.data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
      setError("Failed to load resumes.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-900 dark:text-gray-100">Loading resumes...</div>;
  }

  return (
    <div className="bg-gray-100 rounded-xl dark:bg-gray-800 p-6">
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Your Resumes</h2>
        {resumes.length > 0 ? (
          <ul>
            {resumes.map((resume) => (
              <li key={resume.id} className="mb-2 text-lg text-gray-700 dark:text-gray-300">
                <Link className="text-blue-500 hover:underline" href={`/resumes/${resume.id}`}>
                  {resume.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-900 dark:text-gray-100">No resumes found.</div>
        )}
      </section>
    </div>
  );
};

export default ResumesList;
