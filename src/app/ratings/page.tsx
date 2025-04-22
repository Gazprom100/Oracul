'use client';

import React, { useEffect, useState } from 'react';
import DataTable from '@/components/DataTable';
import { getCoinRatings } from '@/lib/api';
import { CoinRating } from '@/interfaces/api';

export default function RatingsPage() {
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState<CoinRating[]>([]);
  const [limit, setLimit] = useState(50);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        setLoading(true);
        const response = await getCoinRatings(limit, offset);
        setRatings(response.result);
        setHasMore(response.result.length === limit);
      } catch (error) {
        console.error('Error fetching ratings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [limit, offset]);

  const loadMore = () => {
    setOffset(offset + limit);
  };

  const tableColumns = [
    { 
      key: 'rank', 
      header: 'Rank',
      render: (value: number) => `#${value}`
    },
    { key: 'symbol', header: 'Symbol' },
    { key: 'name', header: 'Name' },
    { 
      key: 'rating', 
      header: 'Rating Score',
      render: (value: number) => {
        const ratingPercentage = (value / 10) * 100;
        return (
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2 dark:bg-gray-700">
              <div 
                className="bg-primary-600 h-2.5 rounded-full" 
                style={{ width: `${ratingPercentage}%` }}
              ></div>
            </div>
            <span>{value.toFixed(1)}/10</span>
          </div>
        );
      }
    },
    {
      key: 'category',
      header: 'Category',
      render: (value: string, item: CoinRating) => {
        const rating = item.rating;
        let category = 'Unknown';
        let colorClass = 'bg-gray-500';
        
        if (rating >= 8) {
          category = 'Excellent';
          colorClass = 'bg-green-500';
        } else if (rating >= 6) {
          category = 'Good';
          colorClass = 'bg-blue-500';
        } else if (rating >= 4) {
          category = 'Fair';
          colorClass = 'bg-yellow-500';
        } else if (rating >= 0) {
          category = 'Poor';
          colorClass = 'bg-red-500';
        }
        
        return (
          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full text-white ${colorClass}`}>
            {category}
          </span>
        );
      }
    },
  ];

  return (
    <div className="py-6">
      <div className="px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Coin Ratings</h1>
        
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">About Ratings</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Our comprehensive rating system evaluates coins based on multiple factors including:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-2">
            <li>Technology and innovation</li>
            <li>Adoption metrics and real-world use cases</li>
            <li>Team experience and track record</li>
            <li>Market performance and stability</li>
            <li>Community strength and governance</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400">
            Ratings range from 0 to 10, with 10 being the highest possible score.
          </p>
        </div>
        
        <DataTable
          data={ratings}
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