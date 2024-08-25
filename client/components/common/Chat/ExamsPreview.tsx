"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useChapter } from '@/lib/store/chapters';
import { useExamStore } from '@/lib/store/examMode';
import { useExam } from '@/lib/store/exam';
import { useSubject } from '@/lib/store/subject';
import toast, { Toaster } from "react-hot-toast";

const ExamsPreview = () => {
    const router = useRouter();
    const { chapter: selectedChapters }:any = useChapter((state) => ({
        chapter: state.chapter,
    }));
    const numberOfQuestions = useExamStore((state) => state.numberOfQuestions);
    const minutesPerQuestion = useExamStore((state) => state.minutesPerQuestion);
    const subjectForExam = useSubject((state)=>state.subject);
    const exam: any = useExam((state)=>state.exam);
    const chapters:any = useChapter((state)=>state.chapter);
    const totalDuration = numberOfQuestions * minutesPerQuestion * selectedChapters?.length;

    const examName = exam;
    const subject = subjectForExam; 

    const handleStartExam = () => {
        if(localStorage.getItem('acc_compify') && localStorage.getItem('verificationToken')){
            localStorage.setItem('assessment_data',JSON.stringify({
                exam,
                subject,
                chapters,
            }))
            router.push('/exam');
        }
        else{
            router.push('/');
            toast.error("User is not authenticated yet !")
        }
        
    };

    return (
        <div className="p-4 md:p-5">
            <Toaster position='bottom-right' />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{examName}</h2>
            <p className="text-lg text-gray-700 dark:text-gray-400 mb-4">Subject: {subject}</p>

            <div className="mb-4">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Selected Chapters:</p>
                {selectedChapters?.length ? (
                    <ul className="list-disc list-inside">
                        {selectedChapters.map((chapter:any, index:number) => (
                            <li key={index} className="text-gray-700 dark:text-gray-400">{chapter}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400">No chapters selected.</p>
                )}
            </div>

            <div className="mb-4">
                <p className="text-lg font-medium text-gray-900 dark:text-white">Total Duration: {totalDuration} minutes</p>
            </div>

            <button
                onClick={handleStartExam}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
            >
                Start Exam
            </button>
        </div>
    );
};

export default ExamsPreview;
