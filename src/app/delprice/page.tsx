'use client';

import React, { useEffect, useState } from 'react';
import Card from '@/components/Card';
import LineChart from '@/components/LineChart';
import { getDelPrice } from '@/lib/api';
import { DelPrice } from '@/interfaces/api';

export default function DelPricePage() {
  const [loading, setLoading] = useState(true);
  const [delPrice, setDelPrice] = useState<DelPrice | null>(null);

  useEffect(() => {
    const fetchDelPrice = async () => {
      try {
        setLoading(true);
        const response = await getDelPrice();
        setDelPrice(response.result);
      } catch (error) {
        console.error('Error fetching DEL price:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDelPrice();
  }, []);

  // Mock price history data
  const priceHistoryData = [
    { date: '2023-01-01', price: 0.0345 },
    { date: '2023-02-01', price: 0.0412 },
    { date: '2023-03-01', price: 0.0386 },
    { date: '2023-04-01', price: 0.0465 },
    { date: '2023-05-01', price: 0.0528 },
    { date: '2023-06-01', price: 0.0489 },
    { date: '2023-07-01', price: 0.0501 },
    { date: '2023-08-01', price: 0.0532 },
    { date: '2023-09-01', price: 0.0578 },
    { date: '2023-10-01', price: 0.0612 },
    { date: '2023-11-01', price: 0.0658 },
    { date: '2023-12-01', price: 0.0687 },
  ].map(item => ({ name: item.date.split('-')[1], price: item.price }));

  // Mock market cap history data
  const marketCapHistoryData = [
    { date: '2023-01-01', marketCap: 12500000 },
    { date: '2023-02-01', marketCap: 14800000 },
    { date: '2023-03-01', marketCap: 13900000 },
    { date: '2023-04-01', marketCap: 16700000 },
    { date: '2023-05-01', marketCap: 19000000 },
    { date: '2023-06-01', marketCap: 17600000 },
    { date: '2023-07-01', marketCap: 18000000 },
    { date: '2023-08-01', marketCap: 19100000 },
    { date: '2023-09-01', marketCap: 20800000 },
    { date: '2023-10-01', marketCap: 22000000 },
    { date: '2023-11-01', marketCap: 23600000 },
    { date: '2023-12-01', marketCap: 24700000 },
  ].map(item => ({ name: item.date.split('-')[1], marketCap: item.marketCap }));

  // Mock volume history data
  const volumeHistoryData = [
    { date: '2023-01-01', volume: 580000 },
    { date: '2023-02-01', volume: 640000 },
    { date: '2023-03-01', volume: 520000 },
    { date: '2023-04-01', volume: 710000 },
    { date: '2023-05-01', volume: 830000 },
    { date: '2023-06-01', volume: 760000 },
    { date: '2023-07-01', volume: 790000 },
    { date: '2023-08-01', volume: 850000 },
    { date: '2023-09-01', volume: 920000 },
    { date: '2023-10-01', volume: 980000 },
    { date: '2023-11-01', volume: 1050000 },
    { date: '2023-12-01', volume: 1120000 },
  ].map(item => ({ name: item.date.split('-')[1], volume: item.volume }));

  return (
    <div className="py-6">
      <div className="px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">DEL Price</h1>
        
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card
            title="Current Price"
            value={delPrice ? `$${delPrice.price.toFixed(4)}` : '$0.0000'}
            change={delPrice?.change24h}
            loading={loading}
          />
          <Card
            title="Market Cap"
            value={delPrice ? `$${delPrice.marketCap.toLocaleString()}` : '$0'}
            loading={loading}
          />
          <Card
            title="24h Volume"
            value={delPrice ? `$${delPrice.volume24h.toLocaleString()}` : '$0'}
            loading={loading}
          />
        </div>
        
        <div className="mb-8">
          <LineChart
            data={priceHistoryData}
            dataKeys={[{ key: 'price', color: '#0ea5e9', name: 'Price ($)' }]}
            title="DEL Price History (Last 12 Months)"
            loading={loading}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <LineChart
            data={marketCapHistoryData}
            dataKeys={[{ key: 'marketCap', color: '#8b5cf6', name: 'Market Cap ($)' }]}
            title="Market Cap History"
            loading={loading}
          />
          <LineChart
            data={volumeHistoryData}
            dataKeys={[{ key: 'volume', color: '#10b981', name: 'Volume ($)' }]}
            title="Trading Volume History"
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
} 