'use client';

import React from 'react';
import { Card } from '../ui/Card';
import { CardContent } from '../ui/CardContent';
import { CardHeader } from '../ui/CardHeader';
import LoadingSpinner from '../LoadingSpinner';

interface HolderGroup {
  name: string;
  count: number;
  percentage: number;
  tokenAmount: string;
  change: number; // Percentage change, positive or negative
}

interface HolderBalanceDynamicsProps {
  data?: HolderGroup[];
  loading?: boolean;
  title?: string;
}

const HolderBalanceDynamics: React.FC<HolderBalanceDynamicsProps> = ({
  data = [],
  loading = false,
  title = "Динамика баланса держателей"
}) => {
  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader 
          title="Загрузка..." 
          rightContent={<div className="animate-pulse h-6 w-64 bg-gray-700/30 rounded"></div>}
        />
        <CardContent className="min-h-[220px] flex items-center justify-center">
          <LoadingSpinner size="large" />
        </CardContent>
      </Card>
    );
  }

  const hasData = data && data.length > 0;

  return (
    <Card className="h-full">
      <CardHeader title={title} />
      <CardContent>
        {hasData ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {data.map((group, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <div className="font-medium">{group.name}</div>
                    <div className="text-xs text-text-secondary mt-1">
                      {group.count.toLocaleString()} аккаунтов · {group.tokenAmount}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{group.percentage}%</div>
                    <div className={`text-sm flex items-center justify-end gap-1 mt-1 ${
                      group.change > 0 
                        ? 'text-green-400' 
                        : group.change < 0 
                          ? 'text-red-400' 
                          : 'text-text-secondary'
                    }`}>
                      <span>
                        {group.change > 0 ? '+' : ''}
                        {group.change}%
                      </span>
                      {group.change !== 0 && (
                        <svg 
                          width="12" 
                          height="12" 
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d={
                            group.change > 0
                              ? "M12 19V5M5 12l7-7 7 7"
                              : "M12 5v14M5 12l7 7 7-7"
                          } />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[220px] text-center">
            <p className="text-text-secondary">
              Нет данных о динамике баланса держателей
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HolderBalanceDynamics; 