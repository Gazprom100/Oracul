import React, { ReactNode } from 'react';

interface CardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  change?: number;
  loading?: boolean;
}

const Card: React.FC<CardProps> = ({ title, value, icon, change, loading = false }) => {
  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          {icon && <div className="flex-shrink-0 mr-3">{icon}</div>}
          <div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              {title}
            </div>
            <div className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
              {loading ? (
                <div className="animate-pulse h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ) : (
                value
              )}
            </div>
          </div>
        </div>
      </div>
      {change !== undefined && (
        <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
          <div className="text-sm">
            <span
              className={`font-medium ${
                change >= 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {change >= 0 ? '↑' : '↓'} {Math.abs(change).toFixed(2)}%
            </span>{' '}
            <span className="text-gray-500 dark:text-gray-400">from previous period</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card; 