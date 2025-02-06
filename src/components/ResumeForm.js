import { useState } from 'react';

const ResumeForm = ({ resume, onSubmit }) => {
  const [title, setTitle] = useState(resume?.title || '');
  const [description, setDescription] = useState(resume?.description || '');
  const [education, setEducation] = useState(resume?.education || []);
  const [experience, setExperience] = useState(resume?.experience || []);
  const [skills, setSkills] = useState(resume?.skills || []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resumeData = { title, description, education, experience, skills };
    await onSubmit(resumeData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-2 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-2 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>
      {/* Add similar inputs for education, experience, and skills */}
      <button type="submit" className="bg-gray-800 text-white p-2 rounded-md">Save Resume</button>
    </form>
  );
};

export default ResumeForm;
