import React from 'react';
import Link from 'next/link';

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
      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div className="animate-pulse">
          <div className="bg-gray-200 dark:bg-gray-700 h-10"></div>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="bg-gray-100 dark:bg-gray-800 h-16 flex items-center px-4 border-t border-gray-200 dark:border-gray-700">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((item) => {
              const rowProps = onRowClick
                ? {
                    onClick: () => onRowClick(item),
                    className: 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700',
                  }
                : {};

              const Row = (
                <tr key={item[keyField]} {...rowProps}>
                  {columns.map((column) => (
                    <td
                      key={`${item[keyField]}-${column.key}`}
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {column.render
                        ? column.render(item[column.key], item)
                        : item[column.key]}
                    </td>
                  ))}
                </tr>
              );

              if (linkPath) {
                return (
                  <Link
                    key={item[keyField]}
                    href={`${linkPath}/${item.symbol || item[keyField]}`}
                    passHref
                    legacyBehavior
                  >
                    <a className="hover:bg-gray-50 dark:hover:bg-gray-700 block">{Row}</a>
                  </Link>
                );
              }

              return Row;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable; 