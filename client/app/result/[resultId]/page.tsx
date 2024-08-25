import React from 'react'

type Props = {
    data: any;
}

const Result = (data: Props) => {
    return (
        <div className="flex flex-col w-full justify-center items-center  bg-gradient-to-br from-blue-100 to-indigo-300 p-4">
            <h1 className='font-semibold text-xl mb-5'>Results on Recent Assessment</h1>
            {
                <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
                    {/* <div className='flex flex-row items-center justify-around'>
                        <div className="text-center mb-8">
                            <h1 className="text-5xl font-bold text-indigo-700">{data.grade}</h1>
                            <p className="text-lg text-gray-500 mt-2">Your Grade</p>
                        </div>
                        <div className="text-center mb-8">
                            <h2 className="text-4xl font-semibold text-green-600">{data.score.toFixed(2)}%</h2>
                            <p className="text-lg text-gray-500 mt-2">Your Score</p>
                        </div>
                    </div> */}

                    {/* <div className="text-center mb-12">
                        <p className="text-xl font-medium text-gray-700">{verdict}</p>
                    </div> */}
                    <div className="space-y-8">
                        {
                            data && data.content.map((response, index) => (
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
                    <button className='bottom-0 right-0 bg-black'>
                        Analyze
                    </button>
                </div>
            }
        </div>
    )
}

export default Result
