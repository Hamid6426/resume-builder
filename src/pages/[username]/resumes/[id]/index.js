import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosConfig";
import Sidebar from "@/components/Sidebar";

const ResumeDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      fetchResume();
    }
  }, [id]);

  const fetchResume = async () => {
    try {
      const response = await axiosInstance.get(`/resumes/id/${id}`);
      setResume(response.data);
    } catch (error) {
      console.error("Error fetching resume:", error);
      setError("Failed to load resume.");
    }
  };

  return (
    <main className="relative pl-16 min-h-screen min-w-full bg-white dark:bg-gray-900">
      <Sidebar />

      <div className="grid min-h-screen p-6 gap-6">
        <div className="bg-gray-100 rounded-xl dark:bg-gray-800 p-6">
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          <section>
            {resume ? (
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">{resume.title}</h1>
                <p className="text-lg text-gray-700 dark:text-gray-300">{resume.summary}</p>
                {/* You can add more resume details here */}
              </div>
            ) : (
              <div className="text-center text-gray-900 dark:text-gray-100">
                <p>Loading resume...</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default ResumeDetail;
