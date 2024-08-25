import DashboardCard from '@/components/common/Dashboard/DashboardCard';
import React from 'react';

const Dashboard = () => {
  

  return (
    <div className="flex gap-3 items-center justify-center h-screen bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200">
      <DashboardCard />
      <DashboardCard />
    </div>
  );
}

export default Dashboard;
