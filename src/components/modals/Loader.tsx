import React from "react";
import "../../styles/loader.css";

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
      <figure className="loader relative m-auto w-20 h-20">
        <div className="dot white top-0 bottom-0 left-0 right-0 bg-white"></div>
        <div className="dot bg-red-500"></div>
        <div className="dot bg-yellow-500"></div>
        <div className="dot bg-green-500"></div>
        <div className="dot bg-blue-500"></div>
      </figure>
    </div>
  );
};

export default Loader;
