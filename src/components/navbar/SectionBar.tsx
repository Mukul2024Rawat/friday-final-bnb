import React from 'react';

const SectionBar: React.FC = () => {
  return (
    <nav className="bg-black py-2 ml-[140px]">
      <ul className="flex justify-center list-none m-0 p-0 cursor-pointer">
        <li className="mx-4 text-white font-sans text-base group">
          Places to stay
          <div className="bg-white h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
        </li>
        <li className="mx-4 text-white font-sans text-base group">
          Experiences
          <div className="bg-white h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
        </li>
        <li className="mx-4 text-white font-sans text-base group">
          Online Experiences
          <div className="bg-white h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
        </li>
      </ul>
    </nav>
  );
};

export default SectionBar;
