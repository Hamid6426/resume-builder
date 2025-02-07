import { useState, useEffect } from "react";
import axiosInstance from "axios";
import { jwtDecode } from "jwt-decode";

const useFetchResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {



      try {
        const response = await axiosInstance.get(`/resumes/user_id/${user_id}`);
        if (response.status === 200) {
          setResumes(response.data);
        } else {
          setError("Failed to fetch resumes.");
        }
      } catch (error) {
        setError(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, [user_id]);

  return { resumes, error, loading };
};

export default useFetchResumes;
