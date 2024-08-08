"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { FaHome, FaSearch, FaUser } from "react-icons/fa";
import { useGlobalModal } from "../../contexts/GlobalModalContext";
import SearchModal from "../modals/SearchModal";
import { MdSpaceDashboard } from "react-icons/md";
import { useState } from "react";
import { fetchHostProperties } from "@/api/index";
import Loader from "../modals/Loader";

const MobileMenu = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { openLoginModal } = useGlobalModal();
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const closeSearchModal = () => {
    setSearchModalOpen(false);
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      router.push("/user/profile");
    } else {
      openLoginModal();
    }
  };

  const handleHomeClick = () => {
    router.push("/");
  };

  const handleSearchClick = () => {
    setSearchModalOpen(true);
  };

  const handleDashboardClick = async () => {
    if (!isAuthenticated) {
      openLoginModal();
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

  return (
    <div className="fixed bottom-0 z-10 w-full md:hidden bg-white text-gray-700 font-semibold shadow-md">
      {isLoading && <Loader />}
      <ul className="flex justify-around py-4">
        <li className="flex flex-col items-center" onClick={handleHomeClick}>
          <FaHome size={24} />
          <span className="text-xs">Home</span>
        </li>
        <li className="flex flex-col items-center" onClick={handleSearchClick}>
          <FaSearch size={24} />
          <span className="text-xs">Search</span>
        </li>
        {isAuthenticated && (
          <li
            className="flex flex-col items-center"
            onClick={handleDashboardClick}
          >
            <MdSpaceDashboard size={24} />
            <span className="text-xs">Host</span>
          </li>
        )}
        <li className="flex flex-col items-center" onClick={handleProfileClick}>
          <FaUser size={24} />
          <span className="text-xs">Profile</span>
        </li>
      </ul>
      <SearchModal isOpen={isSearchModalOpen} onClose={closeSearchModal} />
    </div>
  );
};

export default MobileMenu;
