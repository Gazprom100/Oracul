'use client';

import React, { useEffect, useState } from 'react';
import Card from '@/components/Card';
import LineChart from '@/components/LineChart';
import { getNativeCoin } from '@/lib/api';
import { NativeCoin } from '@/interfaces/api';

export default function NativeCoinPage() {
  const [loading, setLoading] = useState(true);
  const [nativeCoin, setNativeCoin] = useState<NativeCoin | null>(null);

  useEffect(() => {
    const fetchNativeCoin = async () => {
      try {
        setLoading(true);
        const response = await getNativeCoin();
        setNativeCoin(response.result);
      } catch (error) {
        console.error('Error fetching native coin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNativeCoin();
  }, []);

  // Mock historical price data
  const priceHistoryData = [
    { date: '2023-01-01', price: 0.85 },
    { date: '2023-02-01', price: 0.92 },
    { date: '2023-03-01', price: 0.88 },
    { date: '2023-04-01', price: 0.95 },
    { date: '2023-05-01', price: 1.05 },
    { date: '2023-06-01', price: 0.98 },
    { date: '2023-07-01', price: 1.02 },
    { date: '2023-08-01', price: 1.08 },
    { date: '2023-09-01', price: 1.15 },
    { date: '2023-10-01', price: 1.22 },
    { date: '2023-11-01', price: 1.18 },
    { date: '2023-12-01', price: 1.25 },
  ].map(item => ({ name: item.date.split('-')[1], price: item.price }));

  // Mock supply data
  const supplyHistoryData = [
    { date: '2023-01-01', supply: 10000000 },
    { date: '2023-02-01', supply: 10050000 },
    { date: '2023-03-01', supply: 10100000 },
    { date: '2023-04-01', supply: 10150000 },
    { date: '2023-05-01', supply: 10200000 },
    { date: '2023-06-01', supply: 10250000 },
    { date: '2023-07-01', supply: 10300000 },
    { date: '2023-08-01', supply: 10350000 },
    { date: '2023-09-01', supply: 10400000 },
    { date: '2023-10-01', supply: 10450000 },
    { date: '2023-11-01', supply: 10500000 },
    { date: '2023-12-01', supply: 10550000 },
  ].map(item => ({ name: item.date.split('-')[1], supply: item.supply }));

  // Mock staking data
  const stakingHistoryData = [
    { date: '2023-01-01', staked: 5000000, apy: 12 },
    { date: '2023-02-01', staked: 5100000, apy: 11.8 },
    { date: '2023-03-01', staked: 5200000, apy: 11.5 },
    { date: '2023-04-01', staked: 5300000, apy: 11.2 },
    { date: '2023-05-01', staked: 5400000, apy: 11 },
    { date: '2023-06-01', staked: 5500000, apy: 10.8 },
    { date: '2023-07-01', staked: 5600000, apy: 10.5 },
    { date: '2023-08-01', staked: 5700000, apy: 10.2 },
    { date: '2023-09-01', staked: 5800000, apy: 10 },
    { date: '2023-10-01', staked: 5900000, apy: 9.8 },
    { date: '2023-11-01', staked: 6000000, apy: 9.5 },
    { date: '2023-12-01', staked: 6100000, apy: 9.2 },
  ].map(item => ({ name: item.date.split('-')[1], staked: item.staked, apy: item.apy }));

  return (
    <div className="py-6">
      <div className="px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          {nativeCoin ? `${nativeCoin.name} (${nativeCoin.symbol})` : 'Native Coin'}
        </h1>
        
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card
            title="Current Price"
            value={nativeCoin ? `$${nativeCoin.price.toFixed(2)}` : '$0.00'}
            loading={loading}
          />
          <Card
            title="Market Cap"
            value={nativeCoin ? `$${nativeCoin.marketCap.toLocaleString()}` : '$0'}
            loading={loading}
          />
          <Card
            title="Total Supply"
            value={nativeCoin ? nativeCoin.supply.toLocaleString() : '0'}
            loading={loading}
          />
          <Card
            title="Staking APY"
            value="9.2%"
            loading={loading}
          />
        </div>
        
        <div className="mb-8">
          <LineChart
            data={priceHistoryData}
            dataKeys={[{ key: 'price', color: '#0ea5e9', name: 'Price ($)' }]}
            title="Price History (Last 12 Months)"
            loading={loading}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <LineChart
            data={supplyHistoryData}
            dataKeys={[{ key: 'supply', color: '#10b981', name: 'Total Supply' }]}
            title="Supply History"
            loading={loading}
          />
          <LineChart
            data={stakingHistoryData}
            dataKeys={[{ key: 'staked', color: '#8b5cf6', name: 'Staked Amount' }]}
            title="Staking History"
            loading={loading}
          />
        </div>
        
        <div className="mb-8">
          <LineChart
            data={stakingHistoryData}
            dataKeys={[{ key: 'apy', color: '#f59e0b', name: 'APY (%)' }]}
            title="Staking APY History"
            loading={loading}
          />
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">About {nativeCoin?.name || 'Native Coin'}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {nativeCoin?.description || 'The native coin of the platform provides utility across the ecosystem, including transaction fees, staking rewards, governance participation, and more.'}
          </p>
        </div>
      </div>
    </div>
  );
} 