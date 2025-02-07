// pages/dashboard.js
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import WelcomeUser from "@/components/WelcomeUser";
// import ResumesList from "@/components/ResumesList";
import useFetchResume from "@/utils/useFetchResume";
import useFetchResumes from "@/utils/useFetchResumes";

const Dashboard = () => {

  return (
    <main className="relative pl-16 min-h-screen min-w-full bg-white dark:bg-gray-900">
      <Sidebar />
      <div className="grid min-h-screen p-6 gap-6">
        <WelcomeUser />
        <h1>Resumes</h1>
        <ResumeList resumes={resumes} onSelectResume={setSelectedResumeId} />
        {resume && (
          <div>
            <h2>Resume Details</h2>
            <p>Name: {resume.title}</p>
            <p>Description: {resume.summary }</p>
          </div>
        )}
        </div>
    </main>
  );
};

export default Dashboard;
