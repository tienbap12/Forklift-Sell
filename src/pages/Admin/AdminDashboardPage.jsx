// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import Background from '../../assets/xe-nang-3-chieu-12.jpg';
const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Cập nhật thời gian mỗi giây
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="relative h-screen w-full bg-cover bg-center "
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-white drop-shadow-lg">
          {currentTime.toLocaleTimeString()}
        </h1>
        <h2 className="text-3xl font-medium text-white mt-4 drop-shadow-lg">
          {currentTime.toLocaleDateString()}
        </h2>
      </div>
    </div>
  );
};

export default Dashboard;
