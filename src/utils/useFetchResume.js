import { useState, useEffect } from "react";
import axiosInstance from "axios";

const useFetchResume = (id) => {
  const [resume, setResume] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axiosInstance.get(`/resumes/id/${id}`);
        if (response.status === 200) {
          setResume(response.data);
        } else {
          setError("Failed to fetch resume.");
        }
      } catch (error) {
        setError(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [id]);

  return { resume, error, loading };
};

export default useFetchResume;
