'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

interface SidebarProps {
  lightMode?: boolean;
}

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  { 
    name: 'Coins', 
    href: '/coins',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  { 
    name: 'DEL Price', 
    href: '/delprice',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  { 
    name: 'Live Data', 
    href: '/live',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  { 
    name: 'Native Coin', 
    href: '/native',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  },
  { 
    name: 'Ratings', 
    href: '/ratings',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    )
  },
];

// Анимация для элементов меню
const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3
    }
  })
};

const Sidebar: React.FC<SidebarProps> = ({ lightMode = false }) => {
  const pathname = usePathname();
  
  // Уменьшаем длительность анимации для режима облегченной производительности
  const animationDuration = lightMode ? 0.2 : 0.5;
  const staggerDelay = lightMode ? 0.05 : 0.1;
  
  // Обновляем вариант анимации с учетом режима производительности
  const optimizedItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * staggerDelay,
        duration: lightMode ? 0.2 : 0.3
      }
    })
  };

  return (
    <div className="fixed top-16 left-0 h-full w-64 hidden md:block overflow-y-auto z-40">
      <div className={`h-full ${lightMode ? 'bg-slate-900/90' : 'backdrop-blur-md bg-slate-900/60'} border-r border-slate-700`}>
        <div className="px-4 py-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: animationDuration }}
            className="mb-6 px-3"
          >
            <h2 className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Navigation</h2>
          </motion.div>
          <nav className="space-y-1 px-2">
            {navigation.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={item.name}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={optimizedItemVariants}
                >
                  <Link
                    href={item.href}
                    className={`${
                      isActive
                        ? 'bg-blue-900/30 text-blue-300 border-l-4 border-blue-500 pl-2'
                        : 'text-gray-300 hover:bg-slate-800/50 hover:text-white border-l-4 border-transparent pl-3'
                    } group flex items-center py-3 text-sm font-medium rounded-md transition-all duration-200 ease-in-out`}
                  >
                    <span className={`mr-3 ${isActive ? 'text-blue-300' : 'text-gray-400 group-hover:text-gray-300'}`}>
                      {item.icon}
                    </span>
                    {item.name}
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </div>
        
        {/* Дополнительная информация внизу боковой панели */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="bg-slate-800/50 rounded-lg p-3 text-xs text-gray-400">
            <div className="font-medium text-gray-300 mb-1">Crypto Market Status</div>
            <div className="flex justify-between">
              <span>BTC: </span>
              <span className="text-green-400">+1.2%</span>
            </div>
            <div className="flex justify-between">
              <span>ETH: </span>
              <span className="text-red-400">-0.5%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 