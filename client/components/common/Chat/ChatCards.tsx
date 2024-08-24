"use client";
import React, { useEffect, useState } from 'react';
import ChatCard from './ChatCard';
import Modal from './Modal';
import { getExams } from '@/utils/getExams';

const ChatCards = () => {
    const [isPrepareModalOpen, setIsPrepareModalOpen] = useState(false);
    const [loading,setLoading] = useState(true);
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

    const handleNext = async() => {
        setLoading(true);
        setStep((prevStep) => prevStep + 1);

        if (step === 2) {
            setHeaderTitle('Choose Subject');
            console.log("Call API for step 2");
            // Call API for step 2
        } else if (step === 3) {
            console.log("Call API for step 3");
            // Call API for step 3
        }
        setLoading(false);
    };

    const handleBack = () => {
        setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : 1));
    };

    const cardsData = [
        {
            title: 'PREPARE',
            description: 'Get ready with all the resources and materials you need for success.'
        },
        {
            title: 'STUDY',
            description: 'Focus on learning and understanding the concepts thoroughly.'
        },
        {
            title: 'CHAT',
            description: 'Engage in discussions and share your knowledge with others.'
        }
    ];

    return (
        <div className="mx-auto min-h-screen max-w-full md:px-20">
            <div className="relative w-full">
                <div className="mx-auto max-w-full flex flex-col gap-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cardsData.map((card, index) => (
                            <ChatCard
                                key={index}
                                title={card.title}
                                description={card.description}
                                onClick={() => handleCardClick(card.title)}
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
