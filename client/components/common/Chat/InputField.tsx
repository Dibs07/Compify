import React from 'react';
import { IoMdSend } from "react-icons/io";

const InputField: React.FC = () => {
  return (
    <div className="w-full max-w-lg relative">
      <input
        type="text"
        placeholder="Enter your text here..."
        className="w-full px-4 py-2 border-2 border-primary-700 rounded-lg focus:outline-none focus:ring-2 focus:border-3 focus:ring-primary-800 pr-10"
      />
      <IoMdSend className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary-700 text-2xl" />
    </div>
  );
};

export default InputField;
