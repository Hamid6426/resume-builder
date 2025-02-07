import { useState } from "react";
import axiosInstance from "@/utils/axiosConfig";

const DeleteResume = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDeleteResume = async () => {
    if (!confirm("Are you sure you want to delete this resume?")) return;
    setLoading(true);
    setError(""); // Clear previous errors
    
    try {
      const response = await axiosInstance.delete(`/resumes/id/${id}`);
      if (response.status === 200) {
        alert("Resume deleted successfully!");
      } else {
        alert("Failed to delete resume.");
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <button
        className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={handleDeleteResume}
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete"}
      </button>
      {error && <p className="text-red-500 mt-1">{error}</p>}
    </>
  );  
};

export default DeleteResume;
