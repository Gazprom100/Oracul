'use client';

import React, { useEffect, useState } from 'react';
import DataTable from '@/components/DataTable';
import { getCoins } from '@/lib/api';
import { Coin } from '@/interfaces/api';

export default function CoinsPage() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [limit, setLimit] = useState(50);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const response = await getCoins(limit, offset);
        const result = Array.isArray(response.result) ? response.result : [];
        setCoins(result);
        setHasMore(result.length === limit);
      } catch (error) {
        console.error('Error fetching coins:', error);
        setCoins([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [limit, offset]);

  const loadMore = () => {
    setOffset(offset + limit);
  };

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
    { 
      key: 'volume24h', 
      header: '24h Volume',
      render: (value: number) => `$${value ? value.toLocaleString() : '0'}`
    },
  ];

  return (
    <div className="py-6">
      <div className="px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Coins List</h1>
        
        <DataTable
          data={coins}
          columns={tableColumns}
          loading={loading}
          keyField="symbol"
          linkPath="/coins"
        />
        
        {hasMore && (
          <div className="mt-6 text-center">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              onClick={loadMore}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 