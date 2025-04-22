'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MagnifyingGlassIcon, Cog6ToothIcon, BellIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const [marketPrice, setMarketPrice] = useState('39.674B');
  const [priceChange, setPriceChange] = useState('+0.0212%');
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background-dark/80 border-b border-border-color">
      <div className="flex justify-between items-center h-16 px-4 md:px-6">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center gap-2">
            <svg className="w-8 h-8 text-primary-color" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 6V18M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="text-xl font-bold hidden md:inline-block">OraculAnalytics</span>
          </Link>
          
          <div className="flex items-center px-2 py-1 ml-4 rounded-lg text-text-secondary">
            <span className="text-sm font-medium">{marketPrice}</span>
            <span className={`ml-1 text-xs ${priceChange.startsWith('+') ? 'text-success-color' : 'text-danger-color'}`}>
              {priceChange}
            </span>
          </div>
        </div>

        <div className="relative flex-1 max-w-md mx-4">
          <div className="relative">
            <input
              type="search"
              placeholder="Найти..."
              className="w-full py-2 px-4 pr-10 rounded-lg bg-card-bg border border-border-color focus:border-primary-color focus:outline-none transition-colors"
            />
            <MagnifyingGlassIcon className="absolute right-3 top-2.5 w-5 h-5 text-text-secondary" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center px-3 py-1 bg-primary-color/10 rounded-full">
            <span className="text-xs font-medium mr-1 text-primary-color">Обучение</span>
            <span className="text-[10px] px-1 py-0.5 bg-primary-color text-white rounded">new</span>
          </div>

          <button className="relative p-2 rounded-full hover:bg-card-bg transition-colors">
            <BellIcon className="w-5 h-5 text-text-secondary" />
          </button>

          <Link 
            href="/settings" 
            className={`p-2 rounded-full hover:bg-card-bg transition-colors ${pathname === '/settings' ? 'bg-card-bg text-primary-color' : 'text-text-secondary'}`}
          >
            <Cog6ToothIcon className="w-5 h-5" />
          </Link>

          <button className="px-4 py-2 font-medium text-sm rounded-full bg-primary-color hover:bg-primary-dark text-white transition-colors">
            Connect Wallet
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 