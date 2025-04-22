'use client';

import React from 'react';
import { LockClosedIcon } from '@heroicons/react/24/outline';

export interface WhaleData {
  address: string;
  name?: string;
  balance: number;
  percentage: number;
  isPublic: boolean;
}

interface WhaleSectionProps {
  whales: WhaleData[];
  loading?: boolean;
}

const WhaleSection: React.FC<WhaleSectionProps> = ({ whales, loading = false }) => {
  // Разделяем китов на публичных и непубличных
  const publicWhales = whales.filter(whale => whale.isPublic);
  const privateWhales = whales.filter(whale => !whale.isPublic);

  // Функция для форматирования адреса (показывает начало и конец)
  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Функция для форматирования баланса
  const formatBalance = (balance: number) => {
    if (balance >= 1_000_000) {
      return `${(balance / 1_000_000).toFixed(2)}M`;
    } else if (balance >= 1_000) {
      return `${(balance / 1_000).toFixed(2)}K`;
    }
    return balance.toFixed(2);
  };

  // Компонент для отображения списка китов
  const WhaleList = ({ data, title, isPrivate }: { data: WhaleData[]; title: string; isPrivate: boolean }) => (
    <div className="card p-4">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {isPrivate && <LockClosedIcon className="w-4 h-4 text-text-secondary" />}
      </div>

      {loading ? (
        <div className="space-y-4 animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gray-700/30"></div>
              <div className="flex-1">
                <div className="h-4 w-32 bg-gray-700/30 rounded mb-2"></div>
                <div className="h-3 w-24 bg-gray-700/50 rounded"></div>
              </div>
              <div className="h-6 w-16 bg-gray-700/30 rounded"></div>
            </div>
          ))}
        </div>
      ) : data.length === 0 ? (
        <div className="text-text-secondary text-sm py-4 text-center">
          Нет данных о {isPrivate ? 'непубличных' : 'публичных'} китах
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((whale, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-primary-light/20 flex items-center justify-center text-primary-main">
                  {whale.name ? whale.name.charAt(0) : '#'}
                </div>
                <div>
                  <div className="font-medium">
                    {whale.name || formatAddress(whale.address)}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {whale.name ? formatAddress(whale.address) : ''}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="font-medium">{formatBalance(whale.balance)}</div>
                <div className="text-xs text-text-secondary">{whale.percentage.toFixed(2)}%</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <WhaleList data={publicWhales} title="Публичные киты" isPrivate={false} />
      <WhaleList data={privateWhales} title="Не публичные киты" isPrivate={true} />
    </div>
  );
};

export default WhaleSection; 