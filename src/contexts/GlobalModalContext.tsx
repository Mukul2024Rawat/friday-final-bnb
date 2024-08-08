"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegistrationModal";

interface GlobalModalContextProps {
  isLoginModalOpen: boolean;
  isRegisterModalOpen: boolean;
  openLoginModal: () => void;
  openRegisterModal: () => void;
  closeModals: () => void;
}

const GlobalModalContext = createContext<GlobalModalContextProps | undefined>(undefined);

export const GlobalModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  const openLoginModal = () => {
    setLoginModalOpen(true);
    setRegisterModalOpen(false);
  };

  const openRegisterModal = () => {
    setRegisterModalOpen(true);
    setLoginModalOpen(false);
  };

  const closeModals = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(false);
  };

  return (
    <GlobalModalContext.Provider value={{ isLoginModalOpen, isRegisterModalOpen, openLoginModal, openRegisterModal, closeModals }}>
      {children}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeModals} onSwitchToRegister={openRegisterModal} />
      {isRegisterModalOpen && <RegisterModal isOpen={isRegisterModalOpen} onClose={closeModals} onSwitchToLogin={openLoginModal} />}
    </GlobalModalContext.Provider>
  );
};

export const useGlobalModal = () => {
  const context = useContext(GlobalModalContext);
  if (context === undefined) {
    throw new Error("useGlobalModal must be used within a GlobalModalProvider");
  }
  return context;
};
