import React from 'react';

export const Card = ({
  children,
  className = '',
  padding = 'md',
  hover = false
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const classes = [
    'bg-white rounded-xl shadow-sm border border-gray-200',
    paddingClasses[padding],
    hover ? 'hover:shadow-md transition-shadow duration-200' : '',
    className
  ].join(' ');

  return (
    <div className={classes}>
      {children}
    </div>
  );
};