"use client";
import React, { useEffect, useState } from 'react';
import ChatCard from './ChatCard';
import Modal from './Modal';
import { getExams, getSubjects } from '@/utils/getExams';
import { IoBookSharp } from "react-icons/io5";
import { IoMdChatbubbles } from "react-icons/io";
import { ImPencil } from "react-icons/im";

const ChatCards = () => {
    const [isPrepareModalOpen, setIsPrepareModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [APIResponse, setAPIResponse] = useState([]);
    const [headerTitle, setHeaderTitle] = useState('');
    const [step, setStep] = useState(1);

    const handleCardClick = (title: string) => {
        if (title === 'PREPARE') {
            setIsPrepareModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsPrepareModalOpen(false);
        setStep(1);
    };

    useEffect(() => {
        setHeaderTitle('Choose Exam');
        const fetchInitialData = async () => {
            setLoading(true);
            const data = await getExams();
            setAPIResponse(data);

            setLoading(false);
        };

        if (step === 1) {
            fetchInitialData();
        }
    }, [step]);

    const handleNext = async () => {
        setLoading(true);
        setStep((prevStep) => prevStep + 1);

        if (step === 2) {
            setHeaderTitle('Choose Subject');
            console.log("Call API for step 2");
            // Call API for step 2
            const data= await getSubjects();
            setAPIResponse(data);
        } else if (step === 3) {
            console.log("Call API for step 3");
            // Call API for step 3
            const data= await getSubjects();
            setAPIResponse(data);
        }
        setLoading(false);
    };

    const handleBack = () => {
        setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : 1));
    };

    const cardsData = [
        {
            title: 'PREPARE',
            description: 'Get ready with all the resources and materials you need for success.',
            icon: <IoBookSharp className='text-primary-700 text-3xl mb-2' />,
            color: 'border-primary-700'
        },
        {
            title: 'STUDY',
            description: 'Focus on learning and understanding the concepts thoroughly.',
            icon: <ImPencil className='text-green-800 text-3xl mb-2' />,
            color: 'border-green-800'
        },
        {
            title: 'CHAT',
            description: 'Engage in discussions and share your knowledge with others.',
            icon: <IoMdChatbubbles className='text-yellow-500 text-3xl mb-2' />,
            color: 'border-yellow-500'
        }

    ];

    return (
        <div className="flex items-center justify-center min-h-screen px-5 md:px-20">
            <div className="relative w-full">
                <div className="mx-auto max-w-full flex flex-col gap-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cardsData.map((card, index) => (
                            <ChatCard
                                key={index}
                                title={card.title}
                                description={card.description}
                                onClick={() => handleCardClick(card.title)}
                                icon={card.icon}
                                color={card.color}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {isPrepareModalOpen && (
                <Modal
                    headerTitle="Prepare Modal"
                    onClose={closeModal}
                    data={APIResponse}
                    step={step}
                    loading={loading}
                    onNext={handleNext}
                    onBack={handleBack}
                />
            )}
        </div>
    );
};

export default ChatCards;
