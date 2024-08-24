"use client";

import { useChapter } from '@/lib/store/chapters';
import React, { useState } from 'react';

const ChaptersList = ({ data }: { data: string[] }) => {
    const [selectedChapters, setSelectedChapters] = useState<string[]>([]);
    const setChapters: any = useChapter((state) => state.setChapter);

    const handleSelection = (chapter: string) => {
        setSelectedChapters((prevSelectedChapters) => {
            if (prevSelectedChapters.includes(chapter)) {
                // Remove the chapter if it's already selected
                const updatedChapters = prevSelectedChapters.filter((ch) => ch !== chapter);
                setChapters(updatedChapters);
                return updatedChapters;
            } else {
                // Add the chapter to the selection
                const updatedChapters = [...prevSelectedChapters, chapter];
                setChapters(updatedChapters);
                return updatedChapters;
            }
        });
    };

    return (
        <div className="p-4 md:p-5">
            <p className="text-gray-500 dark:text-gray-400 mb-4">Select your desired chapters:</p>
            <ul className="space-y-4 mb-4">
                {data.map((chapter: string, index: number) => (
                    <li key={index}>
                        <input
                            type="checkbox"
                            id={`chapter-${index}`}
                            name="chapter"
                            value={chapter}
                            className="hidden peer"
                            checked={selectedChapters.includes(chapter)}
                            onChange={() => handleSelection(chapter)}
                        />
                        <label
                            htmlFor={`chapter-${index}`}
                            className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
                        >
                            <div className="block">
                                <div className="w-full text-lg font-semibold">{chapter}</div>
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
                ))}
            </ul>
        </div>
    );
};

export default ChaptersList;
