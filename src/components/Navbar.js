import Link from "next/link";

const Navbar = () => {
  const NavItems = [
    {
      id: 1,
      label: "Home",
      href: "/",
      className: "text-white hover:text-gray-400",
    },
    {
      id: 2,
      label: "Get Started",
      href: "/register",
      className: "py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded",
    },
    {
      id: 3,
      label: "Login",
      href: "/login",
      className: "py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded",
    },
  ];

  return (
    <nav className="bg-gray-800 p-4 w-full flex justify-between items-center">
      <div className="text-white text-lg font-bold">LOGO</div>
      <ul className="flex justify-center items-center gap-x-6">
        {NavItems.map((item) => (
          <li key={item.id}>
            <Link href={item.href}>
              <span className={item.className}>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
