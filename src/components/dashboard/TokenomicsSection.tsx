'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@headlessui/react';
import { Card } from '../ui/Card';
import { CardContent } from '../ui/CardContent';
import { CardHeader } from '../ui/CardHeader';
import { CircleAlertIcon } from 'lucide-react';
import LoadingSpinner from '../LoadingSpinner';

interface TokenomicsItem {
  name: string;
  allocation: number; // процент от общего количества токенов
  tokens: string; // количество токенов в удобочитаемом формате
  vesting?: string; // описание графика вестинга (если есть)
  locked?: boolean; // заблокированы ли токены
  color: string; // цвет для отображения
}

interface TokenomicsProps {
  data?: {
    tokenomicsItems: TokenomicsItem[];
    totalSupply: string;
    circulatingSupply: string;
    tokenName: string;
  };
  loading?: boolean;
}

const TokenomicsSection: React.FC<TokenomicsProps> = ({
  data,
  loading = false
}) => {
  if (loading) {
    return (
      <Card className="relative">
        <CardHeader 
          title="Загрузка..." 
          rightContent={<div className="animate-pulse h-6 w-32 bg-gray-700/30 rounded"></div>}
        />
        <CardContent className="min-h-[260px] flex items-center justify-center">
          <LoadingSpinner size="large" />
        </CardContent>
      </Card>
    );
  }

  const hasTokenomicsData = data && data.tokenomicsItems && data.tokenomicsItems.length > 0;

  return (
    <Card className="relative">
      <CardHeader title="Токеномика" />
      <CardContent>
        <Tabs defaultValue="distribution" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="distribution">Распределение</TabsTrigger>
            <TabsTrigger value="statistics">Статистика</TabsTrigger>
          </TabsList>
          
          <TabsContent value="distribution" className="min-h-[220px]">
            {hasTokenomicsData ? (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3 mb-5">
                  {data.tokenomicsItems.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-2"
                    >
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm">{item.name}</span>
                    </div>
                  ))}
                </div>
                
                <div className="h-6 w-full flex overflow-hidden rounded-md">
                  {data.tokenomicsItems.map((item, index) => (
                    <div
                      key={index}
                      className="h-full transition-all duration-500 ease-in-out"
                      style={{ 
                        width: `${item.allocation}%`,
                        backgroundColor: item.color,
                        minWidth: item.allocation < 1 ? '4px' : undefined
                      }}
                      title={`${item.name} - ${item.allocation}%`}
                    ></div>
                  ))}
                </div>
                
                <div className="space-y-3 mt-4">
                  {data.tokenomicsItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm font-medium">{item.name}</span>
                        {item.locked && (
                          <span className="text-xs px-1.5 py-0.5 bg-amber-400/20 text-amber-400 rounded">
                            Locked
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{item.allocation}%</div>
                        <div className="text-xs text-text-secondary">{item.tokens}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[220px] text-center">
                <CircleAlertIcon className="h-10 w-10 text-text-secondary mb-3 opacity-50" />
                <p className="text-text-secondary">
                  Монета не имеет релевантных данных по токеномике
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="statistics" className="min-h-[220px]">
            {hasTokenomicsData ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-text-secondary">Общее предложение:</p>
                    <p className="text-lg font-medium">{data.totalSupply}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-text-secondary">В обращении:</p>
                    <p className="text-lg font-medium">{data.circulatingSupply}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-text-secondary">Процент в обращении:</p>
                    <p className="text-lg font-medium">
                      {data.circulatingSupply && data.totalSupply 
                        ? Math.round((Number(data.circulatingSupply.replace(/[^0-9.]/g, '')) / 
                           Number(data.totalSupply.replace(/[^0-9.]/g, ''))) * 100) + '%'
                        : '-'}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 border-t border-border pt-4">
                  <h4 className="text-sm font-medium mb-3">Вестинг токенов</h4>
                  <div className="space-y-3">
                    {data.tokenomicsItems
                      .filter(item => item.vesting)
                      .map((item, index) => (
                        <div key={index} className="text-sm">
                          <div className="flex items-center gap-2 mb-1">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: item.color }}
                            ></div>
                            <span className="font-medium">{item.name}</span>
                          </div>
                          <p className="text-text-secondary pl-5">{item.vesting}</p>
                        </div>
                    ))}
                    
                    {data.tokenomicsItems.filter(item => item.vesting).length === 0 && (
                      <p className="text-sm text-text-secondary">
                        Нет данных о вестинге
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[220px] text-center">
                <CircleAlertIcon className="h-10 w-10 text-text-secondary mb-3 opacity-50" />
                <p className="text-text-secondary">
                  Монета не имеет релевантных данных по токеномике
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TokenomicsSection; 