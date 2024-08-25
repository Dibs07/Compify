"use client";
import { useState, useEffect, useRef } from 'react';
import Message from './Message';
import { getResponseFromBot } from '@/utils/getResponseFromBot';

export const ChatBotUI = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [input, setInput] = useState('');
  const chatContainerRef = useRef<HTMLDivElement | null>(null);  // Create a ref for the chat container
  const data = typeof localStorage !== 'undefined' && localStorage.getItem('answers');
  useEffect(()=>{
    const getFirstMessage = async () => {
      try {
        if(data){
          const botResponse = await getResponseFromBot( "Wish me as a teacher to ask if I have any doubt, make it a bit short and crisp !");
          setMessages((prevMessages) => [...prevMessages, { text: botResponse, isUser: false }]);
        }
      } catch (error) {
        console.error("Error fetching response from bot:", error);
        setMessages((prevMessages) => [...prevMessages, { text: "Error getting response from bot", isUser: false }]);
      }
    };
    getFirstMessage();
  },[])
  const sendMessage = async () => {
    if (!input.trim()) return;
    
    setMessages((prevMessages) => [...prevMessages, { text: input, isUser: true }]);
    const userInput = input;
    setInput('');

    try {
      const botResponse = await getResponseFromBot(userInput);
      setMessages((prevMessages) => [...prevMessages, { text: botResponse, isUser: false }]);
    } catch (error) {
      console.error("Error fetching response from bot:", error);
      setMessages((prevMessages) => [...prevMessages, { text: "Error getting response from bot", isUser: false }]);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);  

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto">
      
      <div className="flex-grow p-4 overflow-y-auto mb-20" ref={chatContainerRef}>
        {messages.map((msg, index) => (
          <Message key={index} message={msg.text} isUser={msg.isUser} />
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 border-t rounded-t-xl border-gray-300 bg-white max-w-md mx-auto">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default ChatBotUI;
