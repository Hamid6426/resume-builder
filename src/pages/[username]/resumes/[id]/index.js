// pages/[userName]/dashboard/resumes/[resumeID].js
import { useRouter } from 'next/router';

const Resume = ({ resume }) => {
  const router = useRouter();
  const { userName, resumeID } = router.query;

  return (
    <div>
      <h1>User: {userName}</h1>
      <h2>Resume ID: {resumeID}</h2>
      {/* Display the resume content here */}
      <p>Title: {resume.title}</p>
      <p>Created At: {resume.createdAt}</p>
      <p>Updated At: {resume.updatedAt}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  // Fetch resume data based on params.userName and params.resumeID
  const { userName, resumeID } = params;
  // Replace this with your actual data fetching logic
  const resume = {
    title: 'Sample Resume Title',
    createdAt: '2025-02-01T12:00:00Z',
    updatedAt: '2025-02-01T12:00:00Z',
  };

  return {
    props: {
      resume,
    },
  };
}

export default Resume;
