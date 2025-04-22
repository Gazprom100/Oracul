'use client';

import React, { useEffect, useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/Card';
// Используем ленивую загрузку для тяжелых компонентов
const LineChart = lazy(() => import('@/components/LineChart'));
const DataTable = lazy(() => import('@/components/DataTable'));
import { getCoins, getDelPrice, getLiveData } from '@/lib/api';
import { Coin, DelPrice, LiveData } from '@/interfaces/api';
import Header from '@/components/Header';
import TokenInfo from '@/components/dashboard/TokenInfo';
import HolderAnalytics from '@/components/dashboard/HolderAnalytics';
import PriceChart from '@/components/dashboard/PriceChart';
import WalletAnalytics from '@/components/dashboard/WalletAnalytics';
import { useSettings } from '@/context/SettingsContext';

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
  const { settings } = useSettings();
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [delPrice, setDelPrice] = useState<DelPrice | null>(null);
  const [liveData, setLiveData] = useState<LiveData | null>(null);
  
  // Пример данных токена
  const [tokenData, setTokenData] = useState({
    symbol: 'LINK',
    name: 'Chainlink',
    price: 13.86589,
    change24h: 6.506,
    marketCap: 373000000,
    volume24h: 98000000,
    supply: 657000000,
  });

  // Пример данных держателей
  const [holderData, setHolderData] = useState({
    holders: {
      whales: { name: 'Киты', count: 319, value: 73, color: '#2a85ff' },
      investors: { name: 'Инвесторы', count: 133, value: 13, color: '#00c2ff' },
      retail: { name: 'Ритейл', count: 1, value: 14, color: '#a4c6ff' },
    },
    activeWhales: 27,
    totalWhales: 35,
    activeInvestors: 62,
    totalInvestors: 85,
    activeRetail: 81,
    totalRetail: 81,
  });

  // Пример данных графика
  const [chartData, setChartData] = useState<Array<{ date: string; price: number }>>([]);
  
  // Пример данных кошельков
  const [walletData, setWalletData] = useState({
    topWallets: [
      { address: '111b87f111b87f111b87f111b87f111b87f1111', roi: 283, pnl: 6136606 },
      { address: '8b947f8b947f8b947f8b947f8b947f8b947f8564', roi: 94, pnl: 4456587 },
      { address: 'c3b2fcc3b2fcc3b2fcc3b2fcc3b2fcc3b2fc56dd', roi: 137, pnl: 4100966 },
      { address: '000000a000000a000000a000000a000000a00000', roi: 65, pnl: 2500000 },
      { address: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb', roi: 42, pnl: 1800000 },
    ],
    mcap: 232700000,
    totalVolume: 199950000,
  });

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

  useEffect(() => {
    // Имитация загрузки данных
    setLoading(true);

    // Генерация данных для графика
    const generateChartData = () => {
      const data = [];
      const today = new Date();
      const basePrice = 13.5;
      
      for (let i = 30; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const formattedDate = date.toISOString().split('T')[0];
        
        // Добавляем случайную вариацию к цене
        const randomFactor = 0.9 + Math.random() * 0.2;
        const price = basePrice * randomFactor + (i / 10);
        
        data.push({
          date: formattedDate,
          price: parseFloat(price.toFixed(5)),
        });
      }
      return data;
    };

    setTimeout(() => {
      setChartData(generateChartData());
      setLoading(false);
    }, 1000);
  }, []);

  // Улучшенные данные для графика с более детальной информацией
  const chartDataForLineChart = [
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
    <main className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Информация о токене */}
          <div className="md:col-span-12">
            <TokenInfo 
              symbol={tokenData.symbol}
              name={tokenData.name}
              price={tokenData.price}
              change24h={tokenData.change24h}
              marketCap={tokenData.marketCap}
              volume24h={tokenData.volume24h}
              supply={tokenData.supply}
            />
          </div>
          
          {/* График цены */}
          <div className="md:col-span-8">
            <PriceChart 
              data={chartData}
              loading={loading}
              symbol={tokenData.symbol}
              openPrice={chartData[0]?.price}
              highPrice={Math.max(...chartData.map(d => d.price))}
              lowPrice={Math.min(...chartData.map(d => d.price))}
              closePrice={chartData[chartData.length - 1]?.price}
              change={tokenData.change24h}
            />
          </div>
          
          {/* Аналитика держателей */}
          <div className="md:col-span-4">
            <HolderAnalytics 
              holders={holderData.holders}
              activeWhales={holderData.activeWhales}
              totalWhales={holderData.totalWhales}
              activeInvestors={holderData.activeInvestors}
              totalInvestors={holderData.totalInvestors}
              activeRetail={holderData.activeRetail}
              totalRetail={holderData.totalRetail}
            />
          </div>
          
          {/* Аналитика кошельков */}
          <div className="md:col-span-12">
            <WalletAnalytics 
              topWallets={walletData.topWallets}
              loading={loading}
              mcap={walletData.mcap}
              totalVolume={walletData.totalVolume}
            />
          </div>
        </div>
      </div>
    </main>
  );
} 