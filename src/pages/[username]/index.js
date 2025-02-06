// pages/dashboard.js
import Sidebar from "@/components/Sidebar";
import WelcomeUser from "@/components/WelcomeUser";
import ResumesList from "@/components/ResumesList";

const Dashboard = () => {
  return (
    <main className="relative pl-16 min-h-screen min-w-full bg-white dark:bg-gray-900">
      <Sidebar />
      <div className="grid min-h-screen p-6 gap-6">
        <WelcomeUser />
        <ResumesList />
      </div>
    </main>
  );
};

export default Dashboard;
