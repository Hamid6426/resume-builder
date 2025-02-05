import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="">
    <Navbar />
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col justify-center items-center p-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Resume Builder</h1>
        <p className="text-xl text-gray-600">Create and manage your resumes easily.</p>
      </main>
    </div>
    <Footer />
    </div>
  );
}
