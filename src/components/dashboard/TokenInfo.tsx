'use client';

import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { TriangleIcon } from 'lucide-react';

interface TokenInfoProps {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  supply: number;
  walletAddress?: string;
}

const TokenInfo: React.FC<TokenInfoProps> = ({
  symbol,
  name,
  price,
  change24h,
  marketCap,
  volume24h,
  supply,
  walletAddress,
}) => {
  const formatNumber = (num: number, digits = 2): string => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(digits)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(digits)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(digits)}K`;
    return num.toFixed(digits);
  };

  return (
    <div className="card p-4 overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="bg-primary-color/10 p-2 rounded-full mr-3">
            <span className="text-primary-color font-bold">{symbol.slice(0, 2)}</span>
          </div>
          <div>
            <div className="flex items-center">
              <h2 className="text-lg font-bold mr-2">{symbol}</h2>
              <span className="bg-card-bg px-2 py-0.5 text-xs rounded">{walletAddress ? walletAddress.slice(0, 6) + '...' + walletAddress.slice(-4) : 'Chainlink'}</span>
            </div>
            <p className="text-text-secondary text-sm">{name}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="p-1.5 rounded-full hover:bg-card-bg text-text-secondary">
            <InformationCircleIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Цена */}
        <div className="bg-card-bg rounded-lg p-3">
          <p className="text-xs text-text-secondary mb-1">Цена</p>
          <div className="flex items-end">
            <span className="text-lg font-bold mr-2">${price.toFixed(5)}</span>
            <span
              className={`text-xs flex items-center ${
                change24h >= 0 ? 'text-success-color' : 'text-danger-color'
              }`}
            >
              <TriangleIcon
                className={`h-3 w-3 ${change24h >= 0 ? '' : 'transform rotate-180'}`}
              />
              {Math.abs(change24h).toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Капитализация */}
        <div className="bg-card-bg rounded-lg p-3">
          <p className="text-xs text-text-secondary mb-1">Капитализация</p>
          <p className="text-lg font-bold">${formatNumber(marketCap)}</p>
        </div>

        {/* Объем 24ч */}
        <div className="bg-card-bg rounded-lg p-3">
          <p className="text-xs text-text-secondary mb-1">Объем 24ч</p>
          <p className="text-lg font-bold">${formatNumber(volume24h)}</p>
        </div>

        {/* Эмиссия */}
        <div className="bg-card-bg rounded-lg p-3 flex flex-col">
          <p className="text-xs text-text-secondary mb-1">Эмиссия</p>
          <p className="text-lg font-bold">{formatNumber(supply)}</p>
        </div>

        {/* Рост */}
        <div className="bg-card-bg rounded-lg p-3 col-span-2 md:col-span-1">
          <p className="text-xs text-text-secondary mb-1">Обеспеченность роста</p>
          <div className="flex items-center">
            <div className="w-full h-2 bg-gray-700 rounded overflow-hidden">
              <div
                className="h-full gradient-blue rounded"
                style={{ width: '100%' }}
              ></div>
            </div>
            <span className="ml-2 font-bold text-lg">100%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenInfo; 