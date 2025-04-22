import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'bordered';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
}) => {
  const variantClass = {
    default: 'bg-card dark:bg-card-dark shadow-sm',
    bordered: 'border border-border dark:border-border-dark',
  }[variant];

  return (
    <div className={`rounded-lg ${variantClass} ${className}`}>
      {children}
    </div>
  );
}; 