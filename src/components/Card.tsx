'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  change?: number;
  loading?: boolean;
}

const Card: React.FC<CardProps> = ({ title, value, icon, change, loading = false }) => {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="backdrop-blur-md bg-slate-800/40 border border-slate-700/50 overflow-hidden rounded-xl shadow-lg"
    >
      <div className="p-5 relative overflow-hidden">
        {/* Декоративный элемент */}
        <div className="absolute -right-6 -top-6 w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 blur-xl"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-400 truncate">
              {title}
            </div>
            {icon && (
              <motion.div 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 bg-slate-700/50 rounded-lg p-2 text-blue-400"
              >
                {icon}
              </motion.div>
            )}
          </div>
          <div className="mt-3 text-3xl font-bold text-blue-400">
            {loading ? (
              <div className="animate-pulse h-8 w-32 bg-slate-700 rounded"></div>
            ) : (
              value
            )}
          </div>
        </div>
      </div>
      {change !== undefined && (
        <div className="px-5 py-3 border-t border-slate-700/50 relative overflow-hidden">
          <div className="relative z-10 flex items-center">
            <motion.div
              animate={{ 
                x: [0, 5, 0],
                transition: { repeat: change >= 0 ? 0 : 0, duration: 0.5 } 
              }}
              className={`flex items-center font-medium ${
                change >= 0
                  ? 'text-green-400'
                  : 'text-red-400'
              }`}
            >
              <span className="mr-1">{change >= 0 ? '↑' : '↓'}</span>
              <span>{Math.abs(change).toFixed(2)}%</span>
            </motion.div>
            <span className="ml-2 text-sm text-gray-500">from previous period</span>
          </div>
          
          {/* Индикатор прогресса */}
          {change !== undefined && (
            <div className="mt-2 w-full h-1 bg-slate-700/50 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min(Math.abs(change) * 5, 100)}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className={`h-full rounded-full ${change >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
              ></motion.div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default Card; 