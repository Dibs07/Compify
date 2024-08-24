"use client";
import React from 'react'

const ExamsList = ({ data }: { data: any }) => {
    return (
        <div className="p-4 md:p-5">
            <p className="text-gray-500 dark:text-gray-400 mb-4">Select your desired position:</p>
            <ul className="space-y-4 mb-4">
                {data.map((exam: any, index: number) => {
                    return (
                        <li key={index}>
                            <input type="radio" id="job-1" name="job" value="job-1" className="hidden peer" required />
                            <label htmlFor="job-1" className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                                <div className="block">
                                    <div className="w-full text-lg font-semibold">{exam}</div>
                                   
                                </div>
                                <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" /></svg>
                            </label>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ExamsList