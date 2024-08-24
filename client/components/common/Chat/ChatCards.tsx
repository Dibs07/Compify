"use client"
import React, { useState } from 'react';
import ChatCard from './ChatCard';
import ChatModal from './ChatModal';

const ChatCards = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = (title:string) => {
        if (title === 'PREPARE') {
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
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

            {/* Render the ChatModal */}
            {isModalOpen && <ChatModal onClose={closeModal} />}
        </div>
    );
};

export default ChatCards;
