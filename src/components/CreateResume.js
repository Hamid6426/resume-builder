import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "@/utils/axiosConfig";

const CreateResume = ({ disableButton }) => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateResume = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found.");
      setLoading(false);
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId; // Use userId from the token

      const resume = { userId, title, summary };
      const response = await axiosInstance.post(`/resumes/userId/${userId}`, resume);
    } catch (error) {
      console.error("Error creating resume:", error);
      setError("Failed to create resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center p-6">
      <button
        onClick={() => setIsModalOpen(true)}
        disabled={disableButton}
        className={`py-2 px-4 ${disableButton ? "bg-gray-500" : "bg-blue-500"} text-white rounded hover:${disableButton ? "bg-gray-500" : "bg-blue-600"}`}
      >
        Create New
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-80 h-fit flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Create New Resume
            </h2>
            <form onSubmit={handleCreateResume} className="w-full">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mb-4 p-2 rounded"
              />
              <textarea
                placeholder="Summary"
                value={summary}
                rows={5}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full mb-4 p-2 rounded"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {loading ? "Creating..." : "Create New Resume"}
              </button>
            </form>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateResume;
