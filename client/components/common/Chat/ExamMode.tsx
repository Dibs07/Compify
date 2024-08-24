import React, { useState } from 'react';
import { useChapter } from '@/lib/store/chapters';
import { useExamStore } from '@/lib/store/examMode';

const ExamMode = () => {
    const [numQuestions, setNumQuestions] = useState<number>(1);
    const [minutesPerQuestion, setMinutesPerQuestion] = useState<number>(1);
    const [pyq, setPyqState] = useState<boolean>(false);
    const [medium, setMediumState] = useState<"easy" | "medium" | "hard">("easy");

    const { chapter: selectedChapters } = useChapter((state) => ({
        chapter: state.chapter
    }));

    const setPyq = useExamStore((state) => state.setPyq);
    const setMedium = useExamStore((state) => state.setMedium);
    const setNumberOfQuestions = useExamStore((state) => state.setNumberOfQuestions);
    const setMinutesTimePerQuestion = useExamStore((state) => state.setMinutesPerQuestion);

    const handleNumQuestionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setNumQuestions(value);
        setNumberOfQuestions(value);
    };

    const handleMinutesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = Number(e.target.value);
        setMinutesPerQuestion(value);
        setMinutesTimePerQuestion(value);
    };

    const handlePyqChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setPyqState(checked);
        setPyq(checked);
    };

    const handleMediumChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as "easy" | "medium" | "hard";
        setMediumState(value);
        setMedium(value);
    };

    return (
        <div className="p-4 md:p-5">
            <p className="text-gray-500 dark:text-gray-400 mb-4">Exam Mode Settings:</p>
            
            <div className="mb-4">
                <label htmlFor="numQuestions" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Number of Questions
                </label>
                <input
                    type="number"
                    id="numQuestions"
                    value={numQuestions}
                    onChange={handleNumQuestionsChange}
                    min={1}
                    className="block w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="minutesPerQuestion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Minutes per Question
                </label>
                <select
                    id="minutesPerQuestion"
                    value={minutesPerQuestion}
                    onChange={handleMinutesChange}
                    className="block w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                    {[...Array(11)].map((_, i) => (
                        <option key={i} value={i + 1}>{i + 1} minute(s)</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="pyq" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Previous Year Questions (PYQ)
                </label>
                <input
                    type="checkbox"
                    id="pyq"
                    checked={pyq}
                    onChange={handlePyqChange}
                    className="h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="medium" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Medium
                </label>
                <select
                    id="medium"
                    value={medium}
                    onChange={handleMediumChange}
                    className="block w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>

            <div className="mb-4">
                <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Selected Chapters:</p>
                {selectedChapters?.length ? (
                    <ul className="space-y-2">
                        {selectedChapters.map((chapter, index) => (
                            <li key={index} className="text-gray-700 dark:text-white">
                                {chapter}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400">No chapters selected.</p>
                )}
            </div>
        </div>
    );
};

export default ExamMode;
