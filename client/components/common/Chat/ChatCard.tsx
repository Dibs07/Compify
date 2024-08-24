"use client"
import React from 'react';
import './ChatCard.css';
import { Button } from '@/components/ui/button';

const ChatCard = ({ title, description }: {
    title: string;
    description: string;
}) => {
    return (
        <div
            className={`relative border border-black p-4 w-full h-48 max-w-xs mx-auto future-event-card`}
        >
            <div className="flex flex-col items-center justify-center h-full">
                <div className={`inria-sans-bold text-lg font-bold`}>
                    {title}
                </div>
                <div className={`inria-sans-bold text-sm text-center mt-2`}>
                    {description}
                </div>
                <Button className='mt-4'>
                    Start
                </Button>
            </div>
        </div>
    );
};

export default ChatCard;
