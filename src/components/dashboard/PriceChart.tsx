'use client';

import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { LineChartIcon, CandlestickChartIcon } from 'lucide-react';

interface ChartData {
  date: string;
  price: number;
  volume?: number;
}

interface PriceChartProps {
  data: ChartData[];
  loading?: boolean;
  symbol: string;
  timeframes?: string[];
  openPrice?: number;
  highPrice?: number;
  lowPrice?: number;
  closePrice?: number;
  change?: number;
}

const PriceChart: React.FC<PriceChartProps> = ({
  data,
  loading = false,
  symbol,
  timeframes = ['1Д', '1Н', '1М', '1Г', 'ВСЕ'],
  openPrice,
  highPrice,
  lowPrice,
  closePrice,
  change,
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1Д');
  const [showSocialMetrics, setShowSocialMetrics] = useState(false);

  // Форматирование чисел
  const formatNumber = (num: number, isCurrency = true): string => {
    if (Math.abs(num) >= 1000000) {
      return `${isCurrency ? '$' : ''}${(num / 1000000).toFixed(2)}M`;
    } else if (Math.abs(num) >= 1000) {
      return `${isCurrency ? '$' : ''}${(num / 1000).toFixed(2)}K`;
    } else {
      return `${isCurrency ? '$' : ''}${num.toFixed(2)}`;
    }
  };

  // Рассчитываем максимальное и минимальное значение для графика
  const maxPrice = Math.max(...data.map(d => d.price)) * 1.05;
  const minPrice = Math.min(...data.map(d => d.price)) * 0.95;

  return (
    <div className="card p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h2 className="text-lg font-bold">{symbol} График</h2>
          <div className="ml-4 flex space-x-1">
            <button
              className={`p-1.5 rounded ${selectedTimeframe === 'line' ? 'bg-primary-color text-white' : 'hover:bg-card-bg text-text-secondary'}`}
              onClick={() => setSelectedTimeframe('line')}
            >
              <LineChartIcon className="w-4 h-4" />
            </button>
            <button
              className={`p-1.5 rounded ${selectedTimeframe === 'candle' ? 'bg-primary-color text-white' : 'hover:bg-card-bg text-text-secondary'}`}
              onClick={() => setSelectedTimeframe('candle')}
            >
              <CandlestickChartIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex bg-card-bg rounded-lg overflow-hidden">
            {timeframes.map(tf => (
              <button
                key={tf}
                className={`px-3 py-1 text-xs font-medium ${
                  selectedTimeframe === tf
                    ? 'bg-primary-color text-white'
                    : 'text-text-secondary hover:bg-gray-700/50'
                }`}
                onClick={() => setSelectedTimeframe(tf)}
              >
                {tf}
              </button>
            ))}
          </div>
          <button className="p-1.5 rounded-full hover:bg-card-bg text-text-secondary">
            <InformationCircleIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Основная область графика */}
      <div className="chart-container bg-card-bg rounded-lg p-4 overflow-hidden">
        {loading ? (
          <div className="animate-pulse w-full h-64 bg-gray-700/50 rounded"></div>
        ) : (
          <>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2a85ff" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#2a85ff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="rgba(255, 255, 255, 0.1)"
                  />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 10 }}
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis
                    domain={[minPrice, maxPrice]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 10 }}
                    tickFormatter={(value) => `$${value.toFixed(2)}`}
                    width={60}
                  />
                  <Tooltip
                    formatter={(value: number) => [`$${value.toFixed(5)}`, 'Цена']}
                    labelFormatter={(label) => `Дата: ${label}`}
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.8)',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px',
                    }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#2a85ff"
                    fillOpacity={1}
                    fill="url(#colorPrice)"
                    strokeWidth={2}
                  />
                  {closePrice && (
                    <ReferenceLine
                      y={closePrice}
                      stroke="rgba(255, 255, 255, 0.5)"
                      strokeDasharray="3 3"
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Информация о цене */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
              <div>
                <p className="text-text-secondary">Открытие</p>
                <p className="font-bold">{openPrice ? formatNumber(openPrice) : 'N/A'}</p>
              </div>
              <div>
                <p className="text-text-secondary">Максимум</p>
                <p className="font-bold">{highPrice ? formatNumber(highPrice) : 'N/A'}</p>
              </div>
              <div>
                <p className="text-text-secondary">Минимум</p>
                <p className="font-bold">{lowPrice ? formatNumber(lowPrice) : 'N/A'}</p>
              </div>
              <div>
                <p className="text-text-secondary">Закрытие</p>
                <p className="font-bold">{closePrice ? formatNumber(closePrice) : 'N/A'}</p>
              </div>
              <div>
                <p className="text-text-secondary">Изменение</p>
                <p
                  className={`font-bold ${
                    change && change >= 0 ? 'text-success-color' : 'text-danger-color'
                  }`}
                >
                  {change ? `${change >= 0 ? '+' : ''}${change.toFixed(2)}%` : 'N/A'}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Переключатель для показа социальных метрик */}
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center">
          <span
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
              showSocialMetrics ? 'bg-primary-color' : 'bg-gray-700'
            }`}
            onClick={() => setShowSocialMetrics(!showSocialMetrics)}
          >
            <span
              className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                showSocialMetrics ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </span>
          <span className="ml-2 text-sm text-text-secondary">Социальные метрики</span>
        </div>
        
        <div className="text-sm text-text-secondary">
          Фаза рынка: <span className="text-success-color font-medium">Рост</span>
        </div>
      </div>
    </div>
  );
};

export default PriceChart; 