"use client"
import ChatCard from '@/components/common/Chat/ChatCard'
import ChatCards from '@/components/common/Chat/ChatCards'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Chat = () => {

  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const accessToken = localStorage.getItem("acc_compify");
    setToken(accessToken);
  }, [])

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
  }, [token])

  return (
    <>
      <div className='fixed inset-x-0 flex items-center justify-center'>
        <ChatCards />
      </div>
    </>
  )
}

export default Chat