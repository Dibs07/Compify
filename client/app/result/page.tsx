"use client";
import { getAnswers } from '@/utils/getAnswers';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';

const Page = () => {
  const [answersData, setAnswersData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [verdict, setVerdict] = useState<string>('');
  const [responses, setResponses] = useState<any[]>([]);
  const [score, setScore] = useState<number>(0);
  const [grade, setGrade] = useState<string>('');
  const router = useRouter();
  useEffect(() => {
    const calculateGrade = (score: number) => {
      if (score >= 90) return 'AA';
      if (score >= 80) return 'A+';
      if (score >= 70) return 'A';
      if (score >= 60) return 'B+';
      if (score >= 50) return 'B';
      return 'C';
    };

    const getData = async () => {
      if (typeof localStorage !== 'undefined') {
        const data = localStorage.getItem('answers');
        if (data) {
          setLoading(true);
          const parsedData = JSON.parse(data);
          setAnswersData(parsedData);

          const result = await getAnswers(parsedData.subject, parsedData.exam, parsedData.answers, parsedData.chapters);

          if (result.responses) {
            setResponses(result.responses);
            setVerdict(result.verdict);

            const totalQuestions = result.responses.length;
            const correctAnswers = result.responses.filter((item: any) => item.answer === item.userAnswer).length;
            const calculatedScore = (correctAnswers / totalQuestions) * 100;
            setScore(calculatedScore);
            setGrade(calculateGrade(calculatedScore));
          }

          setLoading(false);
        }
      }
    };

    getData();
  }, []);

  return (
    <div className="flex flex-col w-full justify-center items-center  bg-gradient-to-br from-blue-100 to-indigo-300 p-4">
      <h1 className='font-semibold text-xl mb-5'>Results on Recent Assessment</h1>
      {
        loading
          ? <div className='flex mt-[20vh] flex-col w-full justify-center mx-auto'>
            <BeatLoader size={20} color='black' />
          </div>
          : <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
            <div className='flex flex-row items-center justify-around'>
              <div className="text-center mb-8">
                <h1 className="text-5xl font-bold text-indigo-700">{grade}</h1>
                <p className="text-lg text-gray-500 mt-2">Your Grade</p>
              </div>
              <div className="text-center mb-8">
                <h2 className="text-4xl font-semibold text-green-600">{score.toFixed(2)}%</h2>
                <p className="text-lg text-gray-500 mt-2">Your Score</p>
              </div>
            </div>

            <div className="text-center mb-12">
              <p className="text-xl font-medium text-gray-700">{verdict}</p>
            </div>
            <div className='w-full mx-auto flex flex-col justify-center items-center '>
            <button className='bg-blue-500 text-white px-5 py-2 font-semibold text-xl' onClick={()=>{
              router.push('/chatbot')
            }}>Analyze Now</button>
            </div>
            
            <div className="space-y-8">
              {
                responses.map((response, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">{`Q${index + 1}: ${response.question}`}</h3>
                    <ul className="space-y-2">
                      {
                        response.options.map((option: string, optionIndex: number) => {
                          const isUserAnswer = response.userAnswer === option;
                          const isCorrectAnswer = response.answer === option;
                          const listItemClass = isCorrectAnswer
                            ? 'bg-green-100 text-green-800 border-green-300'
                            : isUserAnswer
                              ? 'bg-red-100 text-red-800 border-red-300'
                              : 'bg-white text-gray-800 border-gray-300';

                          return (
                            <li
                              key={optionIndex}
                              className={`border-l-4 p-2 rounded-md ${listItemClass}`}
                            >
                              {(isUserAnswer || isCorrectAnswer) && (
                                <span className="mr-2 font-bold">
                                  {isCorrectAnswer ? '✔️' : '❌'}
                                </span>
                              )}
                              {option}
                            </li>
                          );
                        })
                      }
                    </ul>
                    <p className="mt-4 italic text-gray-600">{response.explanation}</p>
                  </div>
                ))
              }
            </div>
         
          </div>
      }
    </div>
  );
};

export default Page;
