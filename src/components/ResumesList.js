import useFetchResumes from "@/utils/useFetchResumes";

const ResumesList = () => {
  const { resumes, error, loading } = useFetchResumes();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red">Error: {error}</div>;
  }

  if (resumes.length === 0) {
    return <div>No resumes found.</div>;
  }
  
  return (
    <div>
      <h1>Resumes</h1>
      <ul>
        {resumes.map((resume) => (
          <li key={resume.resume_id}>
            <h2>{resume.title}</h2>
            <p>{resume.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResumesList;
