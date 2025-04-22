'use client';

import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart
} from 'recharts';
import { motion } from 'framer-motion';

interface DataPoint {
  name: string;
  [key: string]: any;
}

interface LineChartProps {
  data: DataPoint[];
  dataKeys: {
    key: string;
    color: string;
    name: string;
  }[];
  title?: string;
  loading?: boolean;
  height?: number;
  areaChart?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  dataKeys,
  title,
  loading = false,
  height = 300,
  areaChart = true,
}) => {
  if (loading) {
    return (
      <div className="backdrop-blur-md bg-slate-800/40 border border-slate-700/50 rounded-xl shadow-lg p-6">
        {title && <h3 className="text-lg font-bold text-gray-300 mb-4">{title}</h3>}
        <div className="animate-pulse flex flex-col space-y-3">
          <div className="h-4 bg-slate-700 rounded w-3/4"></div>
          <div className="h-64 bg-slate-700 rounded"></div>
          <div className="h-4 bg-slate-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="backdrop-blur-md bg-slate-800/40 border border-slate-700/50 rounded-xl shadow-lg p-6 relative overflow-hidden"
    >
      {/* Декоративные элементы фона */}
      <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-blue-500/10 blur-xl"></div>
      <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-purple-500/10 blur-xl"></div>
      
      <div className="relative z-10">
        {title && (
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-blue-400">
              {title}
            </h3>
            <div className="text-xs text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        )}
        
        <ResponsiveContainer width="100%" height={height}>
          {areaChart ? (
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                {dataKeys.map((dataKey) => (
                  <linearGradient key={`gradient-${dataKey.key}`} id={`color-${dataKey.key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={dataKey.color} stopOpacity={0.5} />
                    <stop offset="95%" stopColor={dataKey.color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#94a3b8' }} 
                axisLine={{ stroke: '#334155' }}
                tickLine={{ stroke: '#334155' }}
              />
              <YAxis 
                tick={{ fill: '#94a3b8' }} 
                axisLine={{ stroke: '#334155' }}
                tickLine={{ stroke: '#334155' }}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: 'none',
                  borderRadius: '0.5rem',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
                  color: '#f1f5f9',
                }}
                labelStyle={{ color: '#f1f5f9', fontWeight: 'bold', marginBottom: '0.5rem' }}
                itemStyle={{ color: '#f1f5f9' }}
                formatter={(value: number) => [value.toLocaleString(), '']}
              />
              <Legend 
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                formatter={(value) => <span className="text-gray-300">{value}</span>}
              />
              {dataKeys.map((dataKey) => (
                <Area
                  key={dataKey.key}
                  type="monotone"
                  dataKey={dataKey.key}
                  name={dataKey.name}
                  stroke={dataKey.color}
                  fillOpacity={1}
                  fill={`url(#color-${dataKey.key})`}
                  strokeWidth={2}
                  activeDot={{ r: 6, strokeWidth: 0, fill: dataKey.color }}
                />
              ))}
            </AreaChart>
          ) : (
            <RechartsLineChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#94a3b8' }} 
                axisLine={{ stroke: '#334155' }}
                tickLine={{ stroke: '#334155' }}
              />
              <YAxis 
                tick={{ fill: '#94a3b8' }} 
                axisLine={{ stroke: '#334155' }}
                tickLine={{ stroke: '#334155' }}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: 'none',
                  borderRadius: '0.5rem',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
                  color: '#f1f5f9',
                }}
                labelStyle={{ color: '#f1f5f9', fontWeight: 'bold', marginBottom: '0.5rem' }}
                itemStyle={{ color: '#f1f5f9' }}
                formatter={(value: number) => [value.toLocaleString(), '']}
              />
              <Legend 
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                formatter={(value) => <span className="text-gray-300">{value}</span>}
              />
              {dataKeys.map((dataKey) => (
                <Line
                  key={dataKey.key}
                  type="monotone"
                  dataKey={dataKey.key}
                  name={dataKey.name}
                  stroke={dataKey.color}
                  activeDot={{ r: 8, strokeWidth: 0, fill: dataKey.color }}
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 0, fill: dataKey.color, fillOpacity: 0.8 }}
                />
              ))}
            </RechartsLineChart>
          )}
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default LineChart; 