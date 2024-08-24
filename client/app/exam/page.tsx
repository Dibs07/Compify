"use client"
import React, { useState, useEffect } from 'react';

const page = () => {
    const [examData, setExamData] = useState<any>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60); // Set initial time to 60 seconds
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        // Fetch data from localStorage only on the client
        if (typeof window !== 'undefined') {
            const storedData = localStorage.getItem('questions');
            if (storedData) {
                setExamData(JSON.parse(storedData));
            }
        }
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleNextQuestion(); 
                    return 60; 
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer); 
    }, [currentQuestionIndex]);

    const handleNextQuestion = () => {
        // Check if the current chapter and question indices are valid
        if (examData[currentChapterIndex] && examData[currentChapterIndex].questions) {
            const totalQuestions = examData[currentChapterIndex].questions.length;
            if (currentQuestionIndex < totalQuestions - 1) {
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
                setTimeLeft(60); // Reset timer for the next question
            } else {
                // Handle finish or end of exam
                console.log("Exam finished");
            }
        }
    };

    const handleOptionSelect = (option:any) => {
        setSelectedOption(option);
    };

    // Check if the current chapter and question are valid
    const currentChapter = examData[currentChapterIndex];
    const currentQuestion = currentChapter ? currentChapter.questions[currentQuestionIndex] : null;
    const isLastQuestion = currentQuestion ? currentQuestionIndex === currentChapter.questions.length - 1 : false;

    return (
        <div className="flex flex-col h-screen p-4 bg-gray-100">
            <div className="flex justify-between items-center mb-4 bg-gray-200 p-2 rounded-md shadow-sm">
                <span className="text-lg font-semibold">
                    Chapter: {currentChapter ? currentChapter.chapter : 'Loading...'}
                </span>
                <span className="text-lg font-semibold">Timer: {timeLeft}s</span>
                <button 
                    onClick={() => window.location.href = '/'} 
                    className="ml-4 bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition"
                >
                    Exit
                </button>
            </div>
            <div className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
                    {currentQuestion ? (
                        <>
                            <h2 className="text-2xl font-bold mb-6">{currentQuestion.question}</h2>
                            <div className="flex flex-col mb-6">
                                {currentQuestion.options.map((option:any, index:any) => (
                                    <button
                                        key={index}
                                        onClick={() => handleOptionSelect(option)}
                                        className={`p-3 mb-3 border rounded-lg ${selectedOption === option ? 'bg-blue-500 text-white' : 'bg-gray-100'} hover:bg-blue-600 hover:text-white transition`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={handleNextQuestion}
                                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
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

export default page;
