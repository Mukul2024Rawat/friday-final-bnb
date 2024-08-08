import React from "react";

const NotAvailable: React.FC = () => {
  return (
    <div className="border-[1.5px] bg-white rounded-lg p-6 sticky top-[185px] flex flex-col ">
      <p className="font-bold text-xl mb-4 text-center">Property not available</p>
      <button className="bg-gray-400 text-white py-2 px-4 rounded-lg font-semibold cursor-not-allowed" disabled>
      Reserve
      </button>
    </div>
  );
};

export default NotAvailable;