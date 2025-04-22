'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getCoinBySymbol } from '@/lib/api';
import { Coin } from '@/interfaces/api';
import Card from '@/components/Card';
import LineChart from '@/components/LineChart';

export default function CoinDetailPage() {
  const params = useParams();
  const symbol = params?.symbol as string || '';
  
  const [loading, setLoading] = useState(true);
  const [coin, setCoin] = useState<Coin | null>(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        setLoading(true);
        const response = await getCoinBySymbol(symbol);
        setCoin(response.result);
      } catch (error) {
        console.error('Error fetching coin details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (symbol) {
      fetchCoin();
    }
  }, [symbol]);

  // Mock data for chart
  const chartData = [
    { name: 'Jan', price: 4000, volume: 2400 },
    { name: 'Feb', price: 3000, volume: 1398 },
    { name: 'Mar', price: 5000, volume: 9800 },
    { name: 'Apr', price: 2780, volume: 3908 },
    { name: 'May', price: 1890, volume: 4800 },
    { name: 'Jun', price: 2390, volume: 3800 },
    { name: 'Jul', price: 3490, volume: 4300 },
  ];

  if (loading) {
    return (
      <div className="py-6">
        <div className="px-4 sm:px-6 md:px-8">
          <div className="animate-pulse h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
          <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (!coin) {
    return (
      <div className="py-6">
        <div className="px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Coin not found</h1>
          <p className="text-gray-600 dark:text-gray-400">
            The coin with symbol &quot;{symbol}&quot; was not found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="px-4 sm:px-6 md:px-8">
        <div className="flex items-center mb-6">
          {coin.icon && (
            <img src={coin.icon} alt={coin.name} className="w-8 h-8 mr-3" />
          )}
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {coin.name} ({coin.symbol})
          </h1>
        </div>
        
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card
            title="Price"
            value={`$${coin.price?.toFixed(2) || '0.00'}`}
            change={coin.change24h}
          />
          <Card
            title="Market Cap"
            value={`$${coin.marketCap?.toLocaleString() || '0'}`}
          />
          <Card
            title="24h Volume"
            value={`$${coin.volume24h?.toLocaleString() || '0'}`}
          />
          <Card
            title="Circulating Supply"
            value={coin.supply?.toLocaleString() || 'N/A'}
          />
        </div>
        
        <div className="mb-8">
          <LineChart
            data={chartData}
            dataKeys={[
              { key: 'price', color: '#0ea5e9', name: 'Price' },
            ]}
            title="Price History (Last 7 Days)"
          />
        </div>
        
        <div className="mb-8">
          <LineChart
            data={chartData}
            dataKeys={[
              { key: 'volume', color: '#8b5cf6', name: 'Volume' },
            ]}
            title="Volume History (Last 7 Days)"
          />
        </div>
        
        {coin.description && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">About {coin.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{coin.description}</p>
          </div>
        )}
      </div>
    </div>
  );
} 