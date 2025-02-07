import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import axiosInstance from "@/utils/axiosConfig";
import CreateResume from "./CreateResume";
import UpdateResume from "./UpdateResume";
import DeleteResume from "./DeleteResume"; // Import DeleteResume

const ResumesList = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedResume, setSelectedResume] = useState(null);

  useEffect(() => {
    fetchUserResumes();
  }, []);

  const fetchUserResumes = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found.");

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      const response = await axiosInstance.get(`/resumes/userId/${userId}`);
      setResumes(response.data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
      setError("Failed to load resumes.");
    } finally {
      setLoading(false);
    }
  };

  // Close update modal and refresh if needed
  const handleCloseUpdate = (shouldRefresh) => {
    setSelectedResume(null);
    if (shouldRefresh) {
      fetchUserResumes();
    }
  };

  // Refresh list after delete
  const handleDelete = () => {
    // fetchUserResumes();
    console.log("deleted")
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
              <li key={resume.id} className="mb-2 text-lg text-gray-700 dark:text-gray-300 flex justify-between items-center">
                <Link className="text-blue-500 hover:underline" href={`/resumes/${resume.id}`}>
                  {resume.title}
                </Link>
                <div className="flex gap-4">
                  {/* Edit Button */}
                  <button
                    className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => setSelectedResume(resume)}
                  >
                    Edit
                  </button>

                  {/* Delete Button */}
                  <DeleteResume id={resume.id} />
                  </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-900 dark:text-gray-100">No resumes found.</div>
        )}
      </section>

      <CreateResume disableButton={resumes.length >= 5} />

      {selectedResume && (
        <UpdateResume resume={selectedResume} onClose={handleCloseUpdate} />
      )}
    </div>
  );
};

export default ResumesList;
