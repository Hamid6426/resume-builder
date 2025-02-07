import { useState } from "react";
import axiosInstance from "@/utils/axiosConfig";

const UpdateResume = ({ resume, onClose }) => {
  const [title, setTitle] = useState(resume.title);
  const [summary, setSummary] = useState(resume.summary);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdateResume = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const id = resume.id;
      const updatedResume = { id, title, summary };
      await axiosInstance.put(`/resumes/id/${id}`, updatedResume);
      
      onClose(true); // Pass `true` to indicate refresh is needed
    } catch (error) {
      console.error("Error updating resume:", error);
      setError("Failed to update resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-900 p-6 rounded-xl w-80 h-fit flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Update Resume</h2>
        
        <form onSubmit={handleUpdateResume} className="w-full">
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
            {loading ? "Updating..." : "Update Resume"}
          </button>
        </form>

        {/* Close Button */}
        <button
          onClick={() => onClose(false)} // Close without refreshing
          className="mt-4 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UpdateResume;
