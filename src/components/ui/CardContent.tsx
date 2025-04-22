import React from 'react';

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'small' | 'normal';
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className = '',
  padding = 'normal',
}) => {
  const paddingClass = {
    none: 'p-0',
    small: 'p-2',
    normal: 'p-4',
  }[padding];

  return (
    <div className={`${paddingClass} ${className}`}>
      {children}
    </div>
  );
}; 