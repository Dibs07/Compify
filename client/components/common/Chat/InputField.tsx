import React from 'react';
import { IoSearchCircleSharp } from "react-icons/io5";

const InputField: React.FC = () => {
  return (
    <div className="w-full max-w-lg relative">
      <input
        type="text"
        placeholder="Enter your text here..."
        className="w-full px-4 py-2 border-2 border-[#FF6701] rounded-lg focus:outline-none focus:ring-2 focus:border-3 focus:ring-[#FF6701] pr-10"
      />
      <IoSearchCircleSharp className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#FF6701] text-2xl" />
    </div>
  );
};

export default InputField;
