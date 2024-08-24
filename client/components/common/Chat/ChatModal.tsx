"use client"
import React, { useState } from 'react';
import SubjectModal from './SubjectModal';

const ChatModal = ({ onClose }:{
    onClose:any;
}) => {
    const [isModalOpen,setIsModalOpen] = useState(false);
    const handleCardClick:any = () => {
        onClose();
            setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
  return (
    <div
      id="select-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Choose Exam
            </h3>
            <button
              onClick={onClose}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-4 md:p-5">
            <p className="text-gray-500 dark:text-gray-400 mb-4">Select your desired exam:</p>
            <ul className="space-y-4 mb-4">
                  <li>
                    <input
                      type="radio"
                      id="job-1"
                      name="job"
                      value="job-1"
                      className="hidden peer"
                      required
                    />
                    <label
                      htmlFor="job-1"
                      className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
                    >
                      <div className="block">
                        <div className="w-full text-lg font-semibold">JEE</div>
                      
                      </div>
                      <svg
                        className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="job-2"
                      name="job"
                      value="job-2"
                      className="hidden peer"
                    />
                    <label
                      htmlFor="job-2"
                      className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
                    >
                      <div className="block">
                        <div className="w-full text-lg font-semibold">UPSC</div>
                      </div>
                      <svg
                        className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="job-3"
                      name="job"
                      value="job-3"
                      className="hidden peer"
                    />
                    <label
                      htmlFor="job-3"
                      className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
                    >
                      <div className="block">
                        <div className="w-full text-lg font-semibold">WBJEE</div>
                        
                      </div>
                      <svg
                        className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </label>
                  </li>
                </ul>
            <button onClick={handleCardClick} className="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Next step
            </button>
            {isModalOpen && <SubjectModal onClose={closeModal} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
