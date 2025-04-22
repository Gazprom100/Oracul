'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Состояние для отслеживания, нужно ли использовать облегченный режим
  const [useLightMode, setUseLightMode] = useState(false);

  // Определяем, нужен ли облегченный режим на основе производительности устройства
  useEffect(() => {
    // Проверяем сохраненные настройки пользователя
    const savedPerformanceMode = localStorage.getItem('performanceMode');
    if (savedPerformanceMode) {
      setUseLightMode(savedPerformanceMode === 'light');
      return;
    }

    // Простой способ проверить производительность устройства
    const checkPerformance = () => {
      try {
        const startTime = performance.now();
        let sum = 0;
        for (let i = 0; i < 100000; i++) {
          sum += Math.sqrt(i);
        }
        const endTime = performance.now();
        // Если устройство выполняет тест дольше 50мс, включаем облегченный режим
        const isSlowDevice = (endTime - startTime) > 50;
        setUseLightMode(isSlowDevice);
        localStorage.setItem('performanceMode', isSlowDevice ? 'light' : 'full');
      } catch (e) {
        console.error('Performance check failed:', e);
      }
    };

    checkPerformance();
  }, []);

  return (
    <div className={`min-h-screen ${useLightMode 
      ? 'bg-slate-950' 
      : 'bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950'} relative overflow-hidden`}>
      {/* Декоративные элементы фона - упрощенные для облегченного режима */}
      {!useLightMode && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-blue-500 rounded-full filter blur-[150px] opacity-10"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-indigo-600 rounded-full filter blur-[150px] opacity-10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-purple-500 rounded-full filter blur-[150px] opacity-10"></div>
        </div>
      )}
      
      <Navbar lightMode={useLightMode} />
      <div className="flex pt-16">
        <Sidebar lightMode={useLightMode} />
        <motion.main 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: useLightMode ? 0.2 : 0.5 }}
          className="flex-1 p-6 md:ml-64"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
};

export default Layout; 