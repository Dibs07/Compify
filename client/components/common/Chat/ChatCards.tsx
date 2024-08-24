"use client";
import React, { useEffect, useState } from 'react';
import ChatCard from './ChatCard';
import Modal from './Modal';
import { getExams } from '@/utils/getExams';
import { getSubjects } from '@/utils/getSubjects';
import { getChapters } from '@/utils/getChapters';
import { useExam } from '@/lib/store/exam';
import { useSubject } from '@/lib/store/subject';
import { useChapter } from '@/lib/store/chapters';
import { getQuestions } from '@/utils/getQuestions';
import { useExamStore } from '@/lib/store/examMode';

const ChatCards = () => {
    const [isPrepareModalOpen, setIsPrepareModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [APIResponse, setAPIResponse] = useState([]);
    const [headerTitle, setHeaderTitle] = useState('');
    const [nextActive, setNextActive] = useState(false);
    const [step, setStep] = useState(1);
    const exam: any = useExam((state) => state.exam);
    const subject:any = useSubject((state)=>state.subject);
    const chapter:any = useChapter((state)=>state.chapter);
    const pyq:any = useExamStore((state)=>state.pyq);
    const medium:any = useExamStore((state)=>state.medium);
    const numberOfQuestions:any = useExamStore((state)=>state.numberOfQuestions);
    const minutesPerQuestion:any = useExamStore((state)=>state.minutesPerQuestion);

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

    useEffect(()=>{
        console.log(step)
    },[step])

    useEffect(() => {
        if (exam) {
            setNextActive(true);
        } else {
            setNextActive(false);
        }
    }, [exam]);

    useEffect(() => {
        if (subject) {
            setNextActive(true);
        } else {
            setNextActive(false);
        }
    }, [subject]);

    useEffect(() => {
        if (chapter) {
            setNextActive(true);
        } else {
            setNextActive(false);
        }
    }, [chapter]);

    const handleNext = async () => {
        if (step === 1) {
            setStep((prevStep) => prevStep + 1);
            setLoading(true);
            setHeaderTitle('Choose Subject');
            const data = await getSubjects(exam);
            setAPIResponse(data);
            setLoading(false);
        } else if (step === 2) {
            setStep((prevStep) => prevStep + 1);
            setLoading(true);
            setHeaderTitle('Choose Chapters');
            const data = await getChapters(subject, exam);
            setAPIResponse(data);
            setLoading(false);
        } else if (step === 3) {
            setStep((prevStep) => prevStep + 1);
            setHeaderTitle('Choose Exam Format');
        } else if (step === 4) {
            setStep((prevStep) => prevStep + 1);
            setHeaderTitle('Exam Details Preview');
            setLoading(true);
    
            // Log the parameters being passed to getQuestions for debugging
            console.log({
                exam,
                subject,
                chapter,
                medium,
                numberOfQuestions,
                pyq,
            });
    
            const data = await getQuestions(exam, subject, chapter, medium, numberOfQuestions, pyq);
            if (typeof localStorage !== 'undefined') {
                try {
                    console.log(data)
                    const questionsJSON = JSON.stringify(data);
                    console.log('Storing questions:', questionsJSON); // Log what's being stored
                    localStorage.setItem('questions', questionsJSON);
                } catch (error) {
                    console.error('Error storing questions in localStorage:', error);
                }
            }
            console.log('Questions fetched:', data); // Verify that data is fetched correctly
            setLoading(false);
        }
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
                    headerTitle={headerTitle}
                    onClose={closeModal}
                    data={APIResponse}
                    step={step}
                    loading={loading}
                    onNext={handleNext}
                    onBack={handleBack}
                    nextActive={nextActive}
                />
            )}
        </div>
    );
};

export default ChatCards;
