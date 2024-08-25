"use client"
import ChatCards from '@/components/common/Chat/ChatCards';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "../globals.css";

const Chat = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("acc_compify");
    setToken(accessToken);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get('http://localhost:5000/api/v1/auth/get-profile', {
        withCredentials: true,
        headers: {
          'token': token
        }
      });
      console.log(res.data);
    }

    if (!token) return;
    fetchUser();
  }, [token]);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background Image */}
      <img
        src='wave-bg.avif'
        className='absolute inset-0 h-full w-full object-cover opacity-55'
        alt='Background'
      />

      {/* Chat Cards Positioned on Top */}
      <div className='absolute inset-0 flex items-center justify-center'>
        <ChatCards />
      </div>
    </div>
  );
}

export default Chat;
