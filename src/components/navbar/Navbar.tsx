"use client";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import SectionBar from "./SectionBar";
import UserMenu from "./UserMenu";
import { useAuth } from "../../contexts/AuthContext";
import { useGlobalModal } from "../../contexts/GlobalModalContext";

const NavBar = () => {
  const { isAuthenticated } = useAuth();
  const { openLoginModal, openRegisterModal } = useGlobalModal();

  const handleRent = () => {
    // Rent logic here
  };

  return (
    <div className="fixed w-full bg-black z-10 shadow-sm flex flex-col">
      <div className="py-4 hidden md:block">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <SectionBar />
            <UserMenu
              isAuthenticated={isAuthenticated}
              onLogin={openLoginModal}
              onSignup={openRegisterModal}
              onRent={handleRent}
            />
          </div>
        </Container>
      </div>
      <div className="searchModel flex justify-center py-1">
        <Search />
      </div>
    </div>
  );
};

export default NavBar;
