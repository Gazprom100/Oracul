'use client';

import React from 'react';
import { Card } from '../ui/Card';
import { CardHeader } from '../ui/CardHeader';
import { CardContent } from '../ui/CardContent';
import LoadingSpinner from '../LoadingSpinner';

interface DistributionItem {
  name: string;
  percentage: number;
  tokenAmount: string;
  color: string;
  iconUrl?: string;
}

interface EmissionDistributionProps {
  data?: DistributionItem[];
  loading?: boolean;
  title?: string;
}

const EmissionDistribution: React.FC<EmissionDistributionProps> = ({
  data = [],
  loading = false,
  title = "Распределение эмиссии"
}) => {
  if (loading) {
    return (
      <Card className="relative">
        <CardHeader 
          title="Загрузка..."
          rightContent={<div className="animate-pulse h-6 w-40 bg-gray-700/30 rounded"></div>}
        />
        <CardContent className="min-h-[220px] flex items-center justify-center">
          <LoadingSpinner size="large" />
        </CardContent>
      </Card>
    );
  }

  const hasData = data && data.length > 0;

  return (
    <Card className="relative">
      <CardHeader title={title}>
      </CardHeader>
      <CardContent>
        {hasData ? (
          <div className="space-y-6">
            <div className="h-6 w-full flex overflow-hidden rounded-md">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="h-full transition-all duration-500 ease-in-out"
                  style={{ 
                    width: `${item.percentage}%`,
                    backgroundColor: item.color,
                    minWidth: item.percentage < 1 ? '4px' : undefined
                  }}
                  title={`${item.name} - ${item.percentage}%`}
                ></div>
              ))}
            </div>
            
            <div className="space-y-3">
              {data.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div className="flex items-center">
                      {item.iconUrl && (
                        <img
                          src={item.iconUrl}
                          alt={item.name}
                          className="w-4 h-4 mr-2"
                        />
                      )}
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{item.percentage}%</div>
                    <div className="text-xs text-text-secondary">{item.tokenAmount}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[180px] text-center">
            <p className="text-text-secondary">
              Нет данных о распределении эмиссии
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmissionDistribution; 