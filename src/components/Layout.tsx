"use client";
import Link from "next/link";
import { FaUser, FaClipboardList, FaHome } from "react-icons/fa";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-200 flex shadow-lg">
      <nav className="bg-gray-100 p-4 shadow-md w-20 fixed left-0 h-full overflow-y-auto mt-[80px] lg:mt-[165px] md:mt-[195px]">
        <ul>
          <Link href="/user/profile">
            <li
              className={`cursor-pointer p-4 rounded-br-lg shadow-lg flex items-center justify-center ${
                pathname === "/user/profile" ? "bg-rose-600" : ""
              }`}
            >
              <FaUser className="text-white-800" />
            </li>
          </Link>
          <Link href="/user/bookings">
            <li
              className={`cursor-pointer p-4 mt-6 rounded-br-lg shadow-lg flex items-center justify-center ${
                pathname === "/user/bookings" ? "bg-rose-600" : ""
              }`}
            >
              <FaClipboardList className="text-gray-800" />
            </li>
          </Link>
        </ul>
      </nav>
      <div className="flex-grow p-6 pb-20 ml-20 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
