import React from 'react';
import ExamsList from './ExamsList';
import { ClimbingBoxLoader } from 'react-spinners';
import SubjectsList from './SubjectsList';
import ChaptersList from './ChaptersList';
import ExamMode from './ExamMode';
import ExamsPreview from './ExamsPreview';

interface ModalProps {
    headerTitle: string;
    onClose: () => void;
    step: number;
    onNext: () => void;
    onBack: () => void;
    loading: boolean;
    data: any;
    nextActive: boolean;
}

const Modal: React.FC<ModalProps> = ({ headerTitle, onClose, step, onNext, onBack, loading, data, nextActive }) => {
    const renderContent = () => {
        switch (step) {
            case 1:
                return <ExamsList data={data} />;
            case 2:
                return <SubjectsList data={data} />;
            case 3:
                return <ChaptersList data={data} />;
            case 4:
                return <ExamMode />;
            case 5:
                return <ExamsPreview />
            default:
                return <p>This is the default content.</p>;
        }
    };

    return (
        <div
            id="select-modal"
            tabIndex={-1}
            aria-hidden="true"
            className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
            <div className="relative p-4 w-full max-w-md">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {headerTitle}
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
                    <div className="p-4 md:p-5 max-h-[60vh] overflow-y-auto"> {/* Make this area scrollable */}
                        {loading ? 
                        <div className='flex flex-row items-center justify-center mx-auto w-full'>
                            <ClimbingBoxLoader loading={loading} size={10} color='black' />
                        </div>
                        : renderContent()}
                    </div>

                    {!loading && step==6 && <div className="flex justify-end p-4 md:p-5 border-t dark:border-gray-600">
                        {step > 1 && (
                            <button
                                type="button"
                                className="mr-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                                onClick={onBack}
                            >
                                Back
                            </button>
                        )}
                        <button
                            type="button"
                            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                            onClick={onNext}
                            disabled={!nextActive}
                        >
                            Next
                        </button>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default Modal;
