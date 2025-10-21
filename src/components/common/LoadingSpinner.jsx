import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

const LoadingSpinner = ({ 
  size = 'default', 
  fullScreen = false, 
  text = 'Loading...', 
  className 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    default: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-base/80 backdrop-blur-sm">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className={cn('animate-spin text-primary-500', sizeClasses.large)} />
          <p className="text-sm text-muted-foreground animate-pulse">{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex items-center justify-center p-4', className)}>
      <Loader2 className={cn('animate-spin text-primary-500', sizeClasses[size])} />
      {text && size !== 'small' && (
        <span className="ml-2 text-sm text-muted-foreground">{text}</span>
      )}
    </div>
  );
};

export default LoadingSpinner;