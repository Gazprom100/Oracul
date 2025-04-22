'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

interface HolderCategory {
  name: string;
  count: number;
  value: number;
  color: string;
}

interface HolderAnalyticsProps {
  holders: {
    whales: HolderCategory;
    investors: HolderCategory;
    retail: HolderCategory;
  };
  activeWhales: number;
  totalWhales: number;
  activeInvestors: number;
  totalInvestors: number;
  activeRetail: number;
  totalRetail: number;
}

const HolderAnalytics: React.FC<HolderAnalyticsProps> = ({
  holders,
  activeWhales,
  totalWhales,
  activeInvestors,
  totalInvestors,
  activeRetail,
  totalRetail,
}) => {
  const holderData = Object.values(holders);
  
  // Функция для расчета процента активности
  const calculateActivityPercentage = (active: number, total: number): number => {
    return Math.round((active / total) * 100);
  };

  // Данные для круговой диаграммы распределения
  const distributionData = [
    { name: 'Киты', value: holders.whales.value, color: '#2a85ff' },
    { name: 'Инвесторы', value: holders.investors.value, color: '#00c2ff' },
    { name: 'Ритейл', value: holders.retail.value, color: '#a4c6ff' },
  ];

  // Компонент для отображения статистики активности
  const ActivityMeter = ({ 
    active, 
    total, 
    title, 
    color 
  }: { 
    active: number; 
    total: number; 
    title: string; 
    color: string 
  }) => {
    const percentage = calculateActivityPercentage(active, total);
    
    return (
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 relative mb-2">
          <div className="w-full h-full rounded-full bg-gray-700/50"></div>
          <div 
            className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-transparent"
            style={{ 
              background: `conic-gradient(${color} ${percentage}%, transparent ${percentage}%)`,
              clipPath: 'circle(50% at 50% 50%)'
            }}
          ></div>
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <span className="text-lg font-bold">{percentage}%</span>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm text-text-secondary">{title}</p>
          <div className="text-sm">
            <span className="font-bold">{active}</span>
            <span className="text-text-secondary">/{total}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="card p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Поведение держателей</h2>
        <button className="p-1.5 rounded-full hover:bg-card-bg text-text-secondary">
          <InformationCircleIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Круговая диаграмма держателей */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-full h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, 'Доля']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.8)', 
                    border: 'none', 
                    borderRadius: '8px',
                    padding: '8px' 
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-2">
            {distributionData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                <div className="text-sm">
                  <span className="text-text-secondary">{item.name}</span>
                  <span className="ml-1 font-bold">{item.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Активность держателей */}
        <div className="flex flex-col justify-center">
          <h3 className="text-md font-medium mb-4 text-center">Активность за 1 день</h3>
          <div className="flex justify-between items-center">
            <ActivityMeter 
              active={activeWhales} 
              total={totalWhales} 
              title="Киты" 
              color="#2a85ff"
            />
            <ActivityMeter 
              active={activeInvestors} 
              total={totalInvestors} 
              title="Инвесторы" 
              color="#00c2ff"
            />
            <ActivityMeter 
              active={activeRetail} 
              total={totalRetail} 
              title="Ритейл" 
              color="#a4c6ff"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolderAnalytics; 