import React, { useState } from 'react';
import { BeatLoader } from 'react-spinners';

interface SubmitModalProps {
    onClose: () => void;
    onSubmit: () => void;
    onCancel: () => void;
    isSubmitting: boolean;
}

const SubmitModal: React.FC<SubmitModalProps> = ({ onClose, onSubmit, onCancel, isSubmitting }) => {
    return (
        <div
            id="select-modal"
            tabIndex={-1}
            aria-hidden="true"
            className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 max-h-[80vh]">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Submit Confirmation
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={onClose}
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
                    <div className="p-4 md:p-5 overflow-y-auto">
                        <p className="text-gray-800 dark:text-white text-center">
                            Are you sure you want to submit this assessment? <br />
                            This action is unchangeable.
                        </p>
                    </div>
                    <div className="flex justify-end p-4 md:p-5 border-t dark:border-gray-600">
                        <button
                            type="button"
                            className="mr-2 text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                            onClick={onSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <BeatLoader size={10} color="white" /> : 'Submit'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmitModal;
