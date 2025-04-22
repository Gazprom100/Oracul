'use client';

import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

interface GaugeChartProps {
  title: string;
  value: number;
  subtitle?: string;
  minValue?: number;
  maxValue?: number;
  colorMap?: { threshold: number; color: string }[];
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  tooltipText?: string;
}

const GaugeChart: React.FC<GaugeChartProps> = ({
  title,
  value,
  subtitle,
  minValue = 0,
  maxValue = 100,
  colorMap = [
    { threshold: 0, color: '#ef4444' },   // red-500
    { threshold: 30, color: '#f97316' },  // orange-500
    { threshold: 50, color: '#eab308' },  // yellow-500
    { threshold: 70, color: '#84cc16' },  // lime-500
    { threshold: 90, color: '#22c55e' },  // green-500
  ],
  size = 'md',
  loading = false,
  tooltipText,
}) => {
  // Определяем цвет на основе значения и карты цветов
  const getColor = () => {
    const applicableColors = colorMap.filter(item => value >= item.threshold);
    return applicableColors.length > 0 
      ? applicableColors[applicableColors.length - 1].color 
      : colorMap[0].color;
  };

  // Вычисляем угол поворота для стрелки индикатора
  const getRotation = () => {
    // 240 градусов - это полный диапазон шкалы (от -120 до 120)
    const range = maxValue - minValue;
    const valuePercentage = (value - minValue) / range;
    const degrees = -120 + (valuePercentage * 240);
    return `rotate(${degrees}deg)`;
  };

  // Размеры компонента в зависимости от выбранного размера
  const getSizes = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'w-32 h-32',
          chart: 'w-28 h-28',
          value: 'text-xl',
          title: 'text-xs',
          subtitle: 'text-[10px]',
        };
      case 'lg':
        return {
          container: 'w-52 h-52',
          chart: 'w-44 h-44',
          value: 'text-3xl',
          title: 'text-base',
          subtitle: 'text-xs',
        };
      default: // md
        return {
          container: 'w-40 h-40',
          chart: 'w-36 h-36',
          value: 'text-2xl',
          title: 'text-sm',
          subtitle: 'text-xs',
        };
    }
  };

  const sizes = getSizes();
  const color = getColor();

  if (loading) {
    return (
      <div className={`${sizes.container} flex flex-col items-center justify-center animate-pulse`}>
        <div className={`${sizes.chart} rounded-full bg-gray-700/20`}></div>
        <div className="h-4 bg-gray-700/30 rounded w-16 mt-2"></div>
      </div>
    );
  }

  return (
    <div className={`${sizes.container} flex flex-col items-center justify-center`}>
      <div className={`${sizes.chart} relative`}>
        {/* Шкала (полукруг) */}
        <div className="absolute inset-0 rounded-full bg-gray-800/20"></div>
        
        {/* Центральный блок с цифрой */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`${sizes.value} font-semibold`} style={{ color }}>
            {value}%
          </div>
          <div className={`${sizes.subtitle} text-text-secondary`}>
            {subtitle}
          </div>
        </div>
        
        {/* Стрелка индикатора */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ transform: getRotation() }}
        >
          <div 
            className="absolute top-1/2 left-1/2 w-1 h-[calc(50%-8px)] -ml-0.5 origin-bottom"
            style={{ backgroundColor: color }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 rounded-full"
            style={{ backgroundColor: color }}
          ></div>
        </div>
      </div>
      
      <h3 className={`${sizes.title} font-medium mt-2 text-center`}>{title}</h3>
    </div>
  );
};

export default GaugeChart; 