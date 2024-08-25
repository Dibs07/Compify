"use client";
import { useExamStore } from '@/lib/store/examMode';
import React, { useState, useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import { getAnswers } from '@/utils/getAnswers';
import { useAnswersStore } from '@/lib/store/answers';
import { useSubject } from '@/lib/store/subject';
import { useExam } from '@/lib/store/exam';
import { useChapter } from '@/lib/store/chapters';
import SubmitModal from '@/components/common/Exam/SubmitModal';
import { useRouter } from 'next/navigation';

const Exam = () => {
    const [examData, setExamData] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const minutesPerQuestion = useExamStore((state) => state.minutesPerQuestion);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(minutesPerQuestion * 60);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showSubmitModal, setShowSubmitModal] = useState(false); 

    const { answers, setAnswers, setSubmissionResponse } = useAnswersStore();
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedData = localStorage.getItem('questions');
            if (storedData) {
                setExamData(JSON.parse(storedData));
            }
        }
    }, []);

    useEffect(() => {
        if (examData?.length > 0) {
            setLoading(false);
        }
    }, [examData]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    handleNextQuestion();
                    return minutesPerQuestion * 60;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [currentQuestionIndex, currentChapterIndex, minutesPerQuestion]);

    const handleNextQuestion = () => {
        if (examData[currentChapterIndex] && examData[currentChapterIndex].questions) {
            const totalQuestions = examData[currentChapterIndex].questions.length;
            if (currentQuestionIndex < totalQuestions - 1) {
                setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
                setTimeLeft(minutesPerQuestion * 60);
            } else if (currentChapterIndex < examData.length - 1) {
                setCurrentChapterIndex((prevIndex) => prevIndex + 1);
                setTimeLeft(minutesPerQuestion * 60);
                setCurrentQuestionIndex(0);
            } else {
                setShowSubmitModal(true); // Show modal when the last question is finished
            }
        }
    };

    const handleOptionSelect = (option: any) => {
        setSelectedOption(option);

        if (currentChapter && currentQuestion) {
            const updatedAnswers = answers ? [...answers] : [];
            const existingAnswerIndex = updatedAnswers.findIndex(answer => answer.question === currentQuestion.question);

            if (existingAnswerIndex > -1) {
                updatedAnswers[existingAnswerIndex].userAnswer = option;
            } else {
                updatedAnswers.push({
                    question: currentQuestion.question,
                    options: currentQuestion.options,
                    answer: currentQuestion.answer,
                    userAnswer: option,
                });
            }

            setAnswers(updatedAnswers); 
        }
    };

    const subject = useSubject((state)=>state.subject);
    const exam:any = useExam((state)=>state.exam);
    const chapters:any = useChapter((state)=>state.chapter);

    const handleSubmit = async () => {
        localStorage.setItem('answers',JSON.stringify({subject,exam,chapters,answers}))
        setLoading(true);
        setLoading(false);
        setShowSubmitModal(false);
        router.push('/result');
    };

    const currentChapter = examData[currentChapterIndex];
    const currentQuestion = currentChapter ? currentChapter.questions[currentQuestionIndex] : null;
    const isLastQuestion = currentQuestion ? currentQuestionIndex === currentChapter.questions.length - 1 : false;

    return (
        <div className="flex flex-col h-screen p-4 bg-gray-100">
            {showSubmitModal && (
                <SubmitModal
                    isSubmitting={loading}
                    onClose={() => setShowSubmitModal(false)}
                    onSubmit={handleSubmit}
                    onCancel={() => setShowSubmitModal(false)}
                />
            )}
            <div className="flex justify-between items-center mb-4 bg-gray-200 p-4 rounded-lg shadow-md">
                <span className="text-lg font-semibold flex items-center">
                    Chapter: {currentChapter ? currentChapter.chapter : <BeatLoader color='black' size={20} />}
                </span>
                <span className="text-lg font-semibold">Timer: {timeLeft}s</span>
                <div className="flex space-x-2">
                    <button
                        onClick={() => window.location.href = '/'}
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                    >
                        Exit
                    </button>
                    <button
                        onClick={() => setShowSubmitModal(true)} // Show modal on submit button click
                        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
                    >
                        Submit
                    </button>
                </div>
            </div>
            <div className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
                    {currentQuestion ? (
                        <>
                            <h2 className="text-2xl font-bold mb-6">{currentQuestion.question}</h2>
                            <div className="flex flex-col mb-6">
                                {currentQuestion.options.map((option: any, index: any) => (
                                    <button
                                        key={index}
                                        onClick={() => handleOptionSelect(option)}
                                        className={`p-4 mb-3 border rounded-lg ${selectedOption === option ? 'bg-blue-500 text-white' : 'bg-gray-100'} hover:bg-blue-600 hover:text-white transition`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={isLastQuestion ? () => setShowSubmitModal(true) : handleNextQuestion} // Show modal on last question's finish click
                                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
                            >
                                {isLastQuestion ? 'Finish' : 'Next'}
                            </button>
                        </>
                    ) : (
                        <p className="text-center text-lg">Loading question...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Exam;
