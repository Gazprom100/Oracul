'use client';

import React, { useEffect, useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/Card';
// Используем ленивую загрузку для тяжелых компонентов
const LineChart = lazy(() => import('@/components/LineChart'));
const DataTable = lazy(() => import('@/components/DataTable'));
import { getCoins, getDelPrice, getLiveData } from '@/lib/api';
import { Coin, DelPrice, LiveData } from '@/interfaces/api';

// Иконки для карточек
const Icons = {
  MarketCap: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Volume: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Coins: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  Price: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
};

// Анимации для элементов
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05, // Уменьшаем задержку для более быстрой анимации
      duration: 0.3,
      ease: "easeOut"
    }
  })
};

// Компонент-скелетон для загрузки
const LoadingSkeleton = () => (
  <div className="animate-pulse bg-slate-800/40 rounded-xl h-64 w-full"></div>
);

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [delPrice, setDelPrice] = useState<DelPrice | null>(null);
  const [liveData, setLiveData] = useState<LiveData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Проверяем кэш
        const cachedData = sessionStorage.getItem('dashboardData');
        const cacheTime = sessionStorage.getItem('dashboardCacheTime');
        
        // Используем кэш, если данные были получены менее 5 минут назад
        if (cachedData && cacheTime && (Date.now() - parseInt(cacheTime)) < 5 * 60 * 1000) {
          const data = JSON.parse(cachedData);
          setCoins(data.coins);
          setDelPrice(data.delPrice);
          setLiveData(data.liveData);
          setLoading(false);
          return;
        }
        
        // Иначе загружаем данные и обновляем кэш
        const [coinsResponse, delPriceResponse, liveDataResponse] = await Promise.all([
          getCoins(10, 0),
          getDelPrice(),
          getLiveData(),
        ]);

        const data = {
          coins: coinsResponse.result,
          delPrice: delPriceResponse.result,
          liveData: liveDataResponse.result
        };
        
        setCoins(data.coins);
        setDelPrice(data.delPrice);
        setLiveData(data.liveData);
        
        // Кэшируем данные
        sessionStorage.setItem('dashboardData', JSON.stringify(data));
        sessionStorage.setItem('dashboardCacheTime', Date.now().toString());
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Улучшенные данные для графика с более детальной информацией
  const chartData = [
    { name: 'Jan', price: 4000, volume: 2400 },
    { name: 'Feb', price: 3000, volume: 1398 },
    { name: 'Mar', price: 5000, volume: 9800 },
    { name: 'Apr', price: 2780, volume: 3908 },
    { name: 'May', price: 1890, volume: 4800 },
    { name: 'Jun', price: 2390, volume: 3800 },
    { name: 'Jul', price: 3490, volume: 4300 },
  ];

  const tableColumns = [
    { 
      key: 'symbol', 
      header: 'Symbol',
      render: (value: string) => (
        <div className="flex items-center">
          <div className="w-8 h-8 mr-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
            {value.substring(0, 2)}
          </div>
          <span className="font-medium">{value}</span>
        </div>
      )
    },
    { key: 'name', header: 'Name' },
    { 
      key: 'price', 
      header: 'Price',
      render: (value: number) => (
        <span className="font-mono">
          ${value ? value.toFixed(2) : '0.00'}
        </span>
      )
    },
    { 
      key: 'change24h', 
      header: '24h Change',
      render: (value: number) => (
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full mr-2 ${value >= 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className={value >= 0 ? 'text-green-400' : 'text-red-400'}>
            {value ? `${value >= 0 ? '+' : ''}${value.toFixed(2)}%` : '0.00%'}
          </span>
        </div>
      )
    },
    { 
      key: 'marketCap', 
      header: 'Market Cap',
      render: (value: number) => `$${value ? (value / 1000000).toFixed(2) + 'M' : '0'}`
    },
  ];

  return (
    <div className="py-6">
      <div className="px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }} // Ускоряем анимацию
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-blue-400">
            Dashboard
          </h1>
          <p className="text-gray-400 mt-2">Real-time overview of cryptocurrency market</p>
        </motion.div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <motion.div custom={0} variants={fadeInUp} initial="hidden" animate="visible">
            <Card
              title="Total Market Cap"
              value={liveData ? `$${(liveData.totalMarketCap / 1000000000).toFixed(2)}B` : '$0'}
              icon={<Icons.MarketCap />}
              loading={loading}
            />
          </motion.div>

          <motion.div custom={1} variants={fadeInUp} initial="hidden" animate="visible">
            <Card
              title="24h Volume"
              value={liveData ? `$${(liveData.total24hVolume / 1000000000).toFixed(2)}B` : '$0'}
              icon={<Icons.Volume />}
              loading={loading}
            />
          </motion.div>

          <motion.div custom={2} variants={fadeInUp} initial="hidden" animate="visible">
            <Card
              title="Total Coins"
              value={liveData ? liveData.totalCoins.toString() : '0'}
              icon={<Icons.Coins />}
              loading={loading}
            />
          </motion.div>

          <motion.div custom={3} variants={fadeInUp} initial="hidden" animate="visible">
            <Card
              title="DEL Price"
              value={delPrice ? `$${delPrice.price.toFixed(4)}` : '$0'}
              change={delPrice?.change24h}
              icon={<Icons.Price />}
              loading={loading}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }} // Ускоряем анимацию
          className="mb-8"
        >
          <Suspense fallback={<LoadingSkeleton />}>
            <LineChart
              data={chartData}
              dataKeys={[
                { key: 'price', color: '#3b82f6', name: 'Price' },
                { key: 'volume', color: '#8b5cf6', name: 'Volume' },
              ]}
              title="Price & Volume History (Last 7 Days)"
              loading={loading}
            />
          </Suspense>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }} // Ускоряем анимацию
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-blue-400">
              Top Coins
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              onClick={() => window.location.href = '/coins'}
            >
              View All
            </motion.button>
          </div>
          
          <Suspense fallback={<LoadingSkeleton />}>
            <DataTable
              data={coins}
              columns={tableColumns}
              loading={loading}
              keyField="symbol"
              linkPath="/coins"
            />
          </Suspense>
        </motion.div>
      </div>
    </div>
  );
} 