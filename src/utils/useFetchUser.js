import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosConfig";

const useFetchUser = (username) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/users/username/${username}`);
        setUser(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || "An error occurred while fetching user data.");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUser();
    }
  }, [username]);

  return { user, loading, error };
};

export default useFetchUser;
