import Sidebar from "@/components/Sidebar";
import WelcomeUser from "@/components/WelcomeUser";
import ResumesList from "@/components/ResumesList";
// import CreateResume from "@/components/CreateResume";

const Dashboard = () => {
  return (
    <main className="relative pl-16 min-h-screen min-w-full bg-white dark:bg-gray-900">
      <Sidebar />
      <div className="grid min-h-screen p-6 gap-6">
        <WelcomeUser />
        <ResumesList />
        {/* <CreateResume /> */}
      </div>
    </main>
  );
};

export default Dashboard;
