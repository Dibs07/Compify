"use client"
import DashboardCard from '@/components/common/Dashboard/DashboardCard';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getResults = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/prep/get-prep-history", {
          headers: {
            "token": localStorage.getItem("acc_compify")
          }
        });
        setData(response.data.history);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };
  
    getResults();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200 min-h-screen">
      {data && data.map((value) => (
        <DashboardCard 
          data={value} 
        />
      ))}
    </div>
  );
}

export default Dashboard;
