import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosConfig"; // Adjust the import path as needed
import { jwtDecode } from "jwt-decode"; // Make sure you have this library installed

const useFetchResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        if (!token) {
          throw new Error("No token found.");
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user_id; // Get user_id from the decoded token

        const response = await axiosInstance.get(`/resumes/userId/${userId}`);
        if (response.status === 200) {
          setResumes(response.data);
        } else {
          setError("Failed to fetch resumes.");
        }
      } catch (error) {
        setError(`${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  return { resumes, error, loading };
};

export default useFetchResumes;
