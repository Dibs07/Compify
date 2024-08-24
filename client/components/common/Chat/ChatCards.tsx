"use client"
import React, { useState } from 'react';
import ChatCard from './ChatCard';
import ChatModal from './ChatModal';
import { IoBookSharp } from "react-icons/io5";
import { IoMdChatbubbles } from "react-icons/io";
import { ImPencil } from "react-icons/im";

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
            description: 'Get ready with all the resources and materials you need for success.' ,
            icon: <IoBookSharp className='text-primary-700 text-3xl mb-2'/>,
            color: 'border-primary-700'
        },
        { 
            title: 'STUDY', 
            description: 'Focus on learning and understanding the concepts thoroughly.',
            icon: <ImPencil className='text-green-800 text-3xl mb-2'/>,
            color: 'border-green-800'
        },
        { 
            title: 'CHAT', 
            description: 'Engage in discussions and share your knowledge with others.',
            icon: <IoMdChatbubbles className='text-yellow-500 text-3xl mb-2'/>,
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

            {isModalOpen && <ChatModal onClose={closeModal} />}
        </div>
    );
};

export default ChatCards;
