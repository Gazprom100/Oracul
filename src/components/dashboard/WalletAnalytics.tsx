'use client';

import React from 'react';
import { InformationCircleIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline';

interface Wallet {
  address: string;
  roi: number;
  pnl: number;
  balance?: number;
  tokens?: number;
}

interface WalletAnalyticsProps {
  topWallets: Wallet[];
  loading?: boolean;
  mcap?: number;
  totalVolume?: number;
}

const WalletAnalytics: React.FC<WalletAnalyticsProps> = ({
  topWallets,
  loading = false,
  mcap,
  totalVolume,
}) => {
  // Форматирование адреса кошелька
  const formatAddress = (address: string): string => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Форматирование числа
  const formatNumber = (num: number, isCurrency = true): string => {
    const prefix = isCurrency ? '$' : '';
    if (Math.abs(num) >= 1000000) {
      return `${prefix}${(num / 1000000).toFixed(2)}M`;
    } else if (Math.abs(num) >= 1000) {
      return `${prefix}${(num / 1000).toFixed(2)}K`;
    } else {
      return `${prefix}${num.toFixed(2)}`;
    }
  };

  return (
    <div className="card p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Топ прибыльных кошельков</h2>
        <button className="p-1.5 rounded-full hover:bg-card-bg text-text-secondary">
          <InformationCircleIcon className="w-5 h-5" />
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse bg-card-bg rounded-lg p-4">
              <div className="flex justify-between">
                <div className="w-1/4 h-4 bg-gray-700 rounded"></div>
                <div className="w-1/6 h-4 bg-gray-700 rounded"></div>
                <div className="w-1/4 h-4 bg-gray-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Заголовки таблицы */}
          <div className="grid grid-cols-12 text-xs text-text-secondary px-4 py-2 border-b border-border-color">
            <div className="col-span-1 font-medium">#</div>
            <div className="col-span-5 font-medium">Адрес</div>
            <div className="col-span-3 font-medium text-right">ROI</div>
            <div className="col-span-3 font-medium text-right">PnL</div>
          </div>

          {/* Строки таблицы */}
          <div className="space-y-1 mt-2">
            {topWallets.map((wallet, index) => (
              <div
                key={wallet.address}
                className="grid grid-cols-12 items-center px-4 py-3 rounded-lg hover:bg-card-bg transition-colors"
              >
                <div className="col-span-1 font-bold text-text-secondary">{index + 1}</div>
                <div className="col-span-5 flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${index < 3 ? 'bg-primary-color' : 'bg-gray-500'}`}></div>
                  <a
                    href={`https://etherscan.io/address/${wallet.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-color hover:text-primary-color transition-colors flex items-center"
                  >
                    {formatAddress(wallet.address)}
                    <ArrowUpRightIcon className="w-3 h-3 ml-1" />
                  </a>
                </div>
                <div className="col-span-3 text-right">
                  <span className={`font-bold ${wallet.roi >= 0 ? 'text-success-color' : 'text-danger-color'}`}>
                    {wallet.roi >= 0 ? '+' : ''}{wallet.roi.toFixed(0)}%
                  </span>
                </div>
                <div className="col-span-3 text-right font-medium">
                  <span className={wallet.pnl >= 0 ? 'text-success-color' : 'text-danger-color'}>
                    {wallet.pnl >= 0 ? '+' : ''}{formatNumber(wallet.pnl)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Сводная информация */}
          <div className="mt-6 pt-4 border-t border-border-color grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-text-secondary text-sm">Общая капитализация</p>
              <p className="font-bold text-lg">{mcap ? formatNumber(mcap) : 'N/A'}</p>
            </div>
            <div className="text-center">
              <p className="text-text-secondary text-sm">Объем (24ч)</p>
              <p className="font-bold text-lg">{totalVolume ? formatNumber(totalVolume) : 'N/A'}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WalletAnalytics; 