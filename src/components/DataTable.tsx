'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Column {
  key: string;
  header: string;
  render?: (value: any, item: any) => React.ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  loading?: boolean;
  keyField?: string;
  onRowClick?: (item: any) => void;
  linkPath?: string;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  loading = false,
  keyField = 'id',
  onRowClick,
  linkPath,
}) => {
  if (loading) {
    return (
      <div className="backdrop-blur-md bg-slate-800/40 border border-slate-700/50 rounded-xl shadow-lg overflow-hidden">
        <div className="animate-pulse">
          <div className="bg-slate-700/50 h-12"></div>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-16 flex items-center px-4 border-t border-slate-700/30">
              <div className="h-4 bg-slate-700 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Анимация для строк таблицы
  const tableRowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeInOut"
      }
    })
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="backdrop-blur-md bg-slate-800/40 border border-slate-700/50 rounded-xl shadow-lg overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-700/30">
          <thead className="bg-slate-900/50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-transparent divide-y divide-slate-700/30">
            {data.map((item, index) => {
              const rowProps = onRowClick
                ? {
                    onClick: () => onRowClick(item),
                    className: 'cursor-pointer hover:bg-slate-700/30 transition-colors',
                  }
                : {};

              const Row = (
                <motion.tr 
                  key={item[keyField]} 
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={tableRowVariants}
                  {...rowProps}
                  className={`${rowProps.className || ''} hover:bg-slate-700/30 transition-all duration-200`}
                >
                  {columns.map((column) => (
                    <td
                      key={`${item[keyField]}-${column.key}`}
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200"
                    >
                      {column.render
                        ? column.render(item[column.key], item)
                        : item[column.key]}
                    </td>
                  ))}
                </motion.tr>
              );

              if (linkPath) {
                return (
                  <Link
                    key={item[keyField]}
                    href={`${linkPath}/${item.symbol || item[keyField]}`}
                    className="block hover:bg-slate-700/30 transition-colors"
                  >
                    {Row}
                  </Link>
                );
              }

              return Row;
            })}
          </tbody>
        </table>
      </div>
      
      {/* Footer с пагинацией */}
      {data.length > 0 && (
        <div className="bg-slate-900/30 px-6 py-3 border-t border-slate-700/30 flex justify-between items-center text-xs text-gray-400">
          <div>Showing {data.length} items</div>
          <div>
            <span className="px-3 py-1.5 bg-blue-900/50 text-blue-300 rounded-md">1</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default DataTable; 