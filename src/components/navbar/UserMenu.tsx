"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoGlobeOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import MenuItem from "./MenuItem";
import Avatar from "../Avatar";
import { useAuth } from "../../contexts/AuthContext";
import { UserMenuProps } from "@/types/userAuthentication";
import { fetchHostProperties } from "@/api";
import Loader from "../modals/Loader";

const UserMenu: React.FC<UserMenuProps> = ({
  isAuthenticated,
  onLogin,
  onSignup,
  onRent,
}) => {
  const router = useRouter();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleClick = async () => {
    onRent();
    if (!isAuthenticated) {
      onLogin();
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetchHostProperties();
      setIsLoading(false);

      if (response.status === 200 && response.data.length > 0) {
        router.push("/host-dashboard");
      } else {
        router.push("/list-your-property");
      }
    } catch (error) {
      console.error("Error fetching property data:", error);
      setIsLoading(false);
      router.push("/list-your-property");
    }
  };

  const closeMenu = (event?: MouseEvent) => {
    if (
      event &&
      menuRef.current &&
      !menuRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    } else if (!event) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", closeMenu);
    } else {
      document.removeEventListener("mousedown", closeMenu);
    }

    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className="relative">
      {isLoading && <Loader />}
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={handleClick}
          className={`${
            isAuthenticated ? "block" : "invisible"
          } text-white text-sm font-semibold py-3 px-4 rounded-full hover:bg-gray-800 lg:flex transition cursor-pointer items-center gap-4`}
        >
          <p>Switch to Host</p>
          <IoGlobeOutline />
        </div>

        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 hover:bg-gray-800 md:px-2 border-[1px] text-white border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src="/profile.jpg" />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[150px] bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {isAuthenticated ? (
              <>
                <MenuItem
                  label="My Profile"
                  onClick={() => {
                    closeMenu();
                    router.push("/user/profile");
                  }}
                />
                <MenuItem
                  label="My reservations"
                  onClick={() => {
                    closeMenu();
                    router.push("/user/bookings");
                  }}
                />
                <hr />
                <MenuItem
                  label="Logout"
                  onClick={() => {
                    closeMenu();
                    logout();
                  }}
                />
              </>
            ) : (
              <>
                <MenuItem
                  label="Login"
                  onClick={() => {
                    closeMenu();
                    onLogin();
                  }}
                />
                <MenuItem
                  label="Sign up"
                  onClick={() => {
                    closeMenu();
                    onSignup();
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
