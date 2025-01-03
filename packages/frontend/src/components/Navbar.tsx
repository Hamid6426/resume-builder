import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const links = [
    { to: "/", label: "HOME" },
    { to: "/about", label: "ABOUT" },
    { to: "/contact", label: "CONTACT" },
    { to: "/blogs", label: "BLOGS" },
    { to: "/how-to-use", label: "HOW TO USE" },
  ];

  return (
    <>
    <div className="bg-purple-600 fixed top-0 left-0 w-full h-16 flex flex-row justify-between items-center drop-shadow-md z-10 px-6">
      <div className='flex items-center gap-x-4'>
        <img src="/logo.svg" height="100" alt="Company Logo" className="h-12" />
        <div className='text-2xl text-white font-black'>RESUME BUILDER</div>
      </div>
      <div className='flex gap-6 items-center'>
      <div className="gap-6 flex flex-row justify-end">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`hover:text-bold text-sm font-bold hover:text-black ${
              location.pathname === link.to ? "text-black" : "text-white"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <a href='/auth/signup' className='text-sm py-2 px-3 bg-transparent border-2 border-white text-white font-bold hover:text-black hover:bg-white'>Get Started</a>
    </div>
    </div>
    </>
  );
}