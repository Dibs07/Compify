"use client"
import React from 'react';
// import './ChatCard.css';
import { Button } from '@/components/ui/button';

const ChatCard = ({ title, description, onClick, icon, color }: {
    title: string;
    description: string;
    onClick: any;
    icon: any;
    color: string;
}) => {
    return (
        <div
            className={`relative rounded-xl border-2 ${color} p-4 w-full h-48 max-w-xs mx-auto future-event-card cursor-pointer `}
            onClick={onClick}
        >
            <div className="flex flex-col items-center justify-center h-full">
                {icon}
                <div className={`inria-sans-bold text-lg font-bold`}>
                    {title}
                </div>
                <div className={`inria-sans-bold text-sm text-center mt-2`}>
                    {description}
                </div>
                {/* <Button className='mt-4'>
                    Start
                </Button> */}
            </div>
        </div>
    );
};

export default ChatCard;
