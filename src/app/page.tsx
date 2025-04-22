'use client';

import React, { useEffect, useState } from 'react';
import Card from '@/components/Card';
import LineChart from '@/components/LineChart';
import DataTable from '@/components/DataTable';
import { getCoins, getDelPrice, getLiveData } from '@/lib/api';
import { Coin, DelPrice, LiveData } from '@/interfaces/api';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [delPrice, setDelPrice] = useState<DelPrice | null>(null);
  const [liveData, setLiveData] = useState<LiveData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [coinsResponse, delPriceResponse, liveDataResponse] = await Promise.all([
          getCoins(10, 0),
          getDelPrice(),
          getLiveData(),
        ]);

        setCoins(coinsResponse.result);
        setDelPrice(delPriceResponse.result);
        setLiveData(liveDataResponse.result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Mock data for chart
  const chartData = [
    { name: 'Jan', price: 4000 },
    { name: 'Feb', price: 3000 },
    { name: 'Mar', price: 5000 },
    { name: 'Apr', price: 2780 },
    { name: 'May', price: 1890 },
    { name: 'Jun', price: 2390 },
    { name: 'Jul', price: 3490 },
  ];

  const tableColumns = [
    { key: 'symbol', header: 'Symbol' },
    { key: 'name', header: 'Name' },
    { 
      key: 'price', 
      header: 'Price',
      render: (value: number) => `$${value ? value.toFixed(2) : '0.00'}`
    },
    { 
      key: 'change24h', 
      header: '24h Change',
      render: (value: number) => (
        <span className={value >= 0 ? 'text-green-600' : 'text-red-600'}>
          {value ? `${value >= 0 ? '+' : ''}${value.toFixed(2)}%` : '0.00%'}
        </span>
      )
    },
    { 
      key: 'marketCap', 
      header: 'Market Cap',
      render: (value: number) => `$${value ? value.toLocaleString() : '0'}`
    },
  ];

  return (
    <div className="py-6">
      <div className="px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
        
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Card
            title="Total Market Cap"
            value={liveData ? `$${liveData.totalMarketCap.toLocaleString()}` : '0'}
            loading={loading}
          />
          <Card
            title="24h Volume"
            value={liveData ? `$${liveData.total24hVolume.toLocaleString()}` : '0'}
            loading={loading}
          />
          <Card
            title="Total Coins"
            value={liveData ? liveData.totalCoins.toString() : '0'}
            loading={loading}
          />
          <Card
            title="DEL Price"
            value={delPrice ? `$${delPrice.price.toFixed(4)}` : '0'}
            change={delPrice?.change24h}
            loading={loading}
          />
        </div>

        <div className="mt-8">
          <LineChart
            data={chartData}
            dataKeys={[
              { key: 'price', color: '#0ea5e9', name: 'Price' },
            ]}
            title="Price History (Last 7 Days)"
            loading={loading}
          />
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Top Coins</h2>
          <DataTable
            data={coins}
            columns={tableColumns}
            loading={loading}
            keyField="symbol"
            linkPath="/coins"
          />
        </div>
      </div>
    </div>
  );
} 