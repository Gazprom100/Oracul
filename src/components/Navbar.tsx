'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Bell, Settings, User } from 'lucide-react';

interface NavbarProps {
  lightMode?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ lightMode = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`${lightMode ? 'bg-slate-900/90' : 'fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-900/60'} border-b border-slate-700`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: lightMode ? 0.2 : 0.4 }}
              className="text-white font-bold text-xl"
            >
              <Link href="/" className="flex items-center text-xl font-bold">
                <span className="text-blue-400 hover:text-blue-300">
                  Oracul Dashboard
                </span>
              </Link>
            </motion.div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-48 pl-10 pr-3 py-2 border border-slate-700 rounded-md leading-5 bg-slate-800/50 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:placeholder-gray-300 sm:text-sm"
              />
            </div>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-800/50 focus:outline-none"
            >
              <Bell className="h-5 w-5" />
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-800/50 focus:outline-none"
            >
              <Settings className="h-5 w-5" />
            </motion.button>
            
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="ml-3 relative flex-shrink-0"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-900/90 backdrop-blur-md">
          <Link
            href="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-800"
          >
            Dashboard
          </Link>
          <Link
            href="/coins"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-slate-800 hover:text-white"
          >
            Coins
          </Link>
          <Link
            href="/delprice"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-slate-800 hover:text-white"
          >
            DEL Price
          </Link>
          <Link
            href="/live"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-slate-800 hover:text-white"
          >
            Live Data
          </Link>
          <Link
            href="/native"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-slate-800 hover:text-white"
          >
            Native Coin
          </Link>
          <Link
            href="/ratings"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-slate-800 hover:text-white"
          >
            Ratings
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 