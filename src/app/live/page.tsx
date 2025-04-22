'use client';

import React, { useEffect, useState } from 'react';
import Card from '@/components/Card';
import LineChart from '@/components/LineChart';
import { getLiveData } from '@/lib/api';
import { LiveData } from '@/interfaces/api';

export default function LiveDataPage() {
  const [loading, setLoading] = useState(true);
  const [liveData, setLiveData] = useState<LiveData | null>(null);
  const [historicalData, setHistoricalData] = useState<any[]>([]);

  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        setLoading(true);
        const response = await getLiveData();
        setLiveData(response.result);
        
        // Generate mock historical data
        const mockHistorical = generateMockHistoricalData();
        setHistoricalData(mockHistorical);
      } catch (error) {
        console.error('Error fetching live data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveData();

    // Poll for live data every 60 seconds
    const interval = setInterval(fetchLiveData, 60000);
    return () => clearInterval(interval);
  }, []);

  // Generate mock historical data
  const generateMockHistoricalData = () => {
    const now = new Date();
    const data = [];
    
    for (let i = 24; i >= 0; i--) {
      const time = new Date(now);
      time.setHours(time.getHours() - i);
      
      data.push({
        name: `${time.getHours()}:00`,
        totalMarketCap: 200000000000 + Math.random() * 10000000000,
        total24hVolume: 10000000000 + Math.random() * 1000000000,
        totalCoins: 1000 + Math.floor(Math.random() * 10),
        activeCoins: 800 + Math.floor(Math.random() * 50),
      });
    }
    
    return data;
  };

  return (
    <div className="py-6">
      <div className="px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Live Market Data</h1>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Last Updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
        
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card
            title="Total Market Cap"
            value={liveData ? `$${liveData.totalMarketCap.toLocaleString()}` : '$0'}
            loading={loading}
          />
          <Card
            title="24h Volume"
            value={liveData ? `$${liveData.total24hVolume.toLocaleString()}` : '$0'}
            loading={loading}
          />
          <Card
            title="Total Coins"
            value={liveData ? liveData.totalCoins.toString() : '0'}
            loading={loading}
          />
          <Card
            title="Active Coins"
            value={liveData ? liveData.activeCoins.toString() : '0'}
            loading={loading}
          />
        </div>
        
        <div className="mb-8">
          <LineChart
            data={historicalData}
            dataKeys={[
              { key: 'totalMarketCap', color: '#0ea5e9', name: 'Total Market Cap ($)' },
            ]}
            title="Market Cap (Last 24 Hours)"
            loading={loading}
          />
        </div>
        
        <div className="mb-8">
          <LineChart
            data={historicalData}
            dataKeys={[
              { key: 'total24hVolume', color: '#8b5cf6', name: '24h Volume ($)' },
            ]}
            title="Trading Volume (Last 24 Hours)"
            loading={loading}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <LineChart
            data={historicalData}
            dataKeys={[
              { key: 'totalCoins', color: '#10b981', name: 'Total Coins' },
            ]}
            title="Total Coins (Last 24 Hours)"
            loading={loading}
          />
          <LineChart
            data={historicalData}
            dataKeys={[
              { key: 'activeCoins', color: '#f59e0b', name: 'Active Coins' },
            ]}
            title="Active Coins (Last 24 Hours)"
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
} 