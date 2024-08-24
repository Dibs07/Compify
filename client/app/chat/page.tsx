"use client"
import ChatCard from '@/components/common/Chat/ChatCard'
import ChatCards from '@/components/common/Chat/ChatCards'
import axios from 'axios'
import React, { useEffect } from 'react'

const Chat = () => {

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("acc_compify");
      const res = await axios.get('http://localhost:5000/api/v1/auth/get-profile', {
        withCredentials: true,
        headers: {
          'token': token
        }
      });
      console.log(res.data);
    }

    fetchUser();
  }, [])

  return (
    <>
      <div className='fixed inset-x-0 flex items-center justify-center'>
        <ChatCards />
      </div>
    </>
  )
}

export default Chat