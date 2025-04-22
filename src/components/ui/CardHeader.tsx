import React from 'react';

export interface CardHeaderProps {
  title: string;
  description?: string;
  subtitle?: string;
  rightContent?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  description,
  subtitle,
  rightContent,
  actions,
  className = '',
}) => {
  return (
    <div className={`px-4 py-3 border-b border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
          {subtitle && (
            <p className="mt-0.5 text-sm font-medium text-gray-700 dark:text-gray-300">{subtitle}</p>
          )}
          {description && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
          )}
        </div>
        {(rightContent || actions) && (
          <div>
            {rightContent}
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}; 