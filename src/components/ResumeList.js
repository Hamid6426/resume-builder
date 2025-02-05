import Link from 'next/link';

const ResumeList = ({ resumes }) => {
  return (
    <div>
      {resumes.map((resume) => (
        <div key={resume._id} className="border p-4 mb-4 rounded-md">
          <h3 className="text-xl font-bold">{resume.title}</h3>
          <p className="text-gray-600">{resume.description}</p>
          <Link href={`/resumes/${resume._id}`}>
            <a className="text-blue-500 hover:underline">View Resume</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ResumeList;
