
import React from 'react';
import { Heart } from 'lucide-react';

interface LoadingManagerProps {
  isLoading: boolean;
  children: React.ReactNode;
  message?: string;
}

const LoadingManager: React.FC<LoadingManagerProps> = ({ 
  isLoading, 
  children, 
  message = "Loading PregCareGh..." 
}) => {
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 via-red-500 to-green-600 rounded-full flex items-center justify-center shadow-lg mx-auto mb-6 animate-pulse">
            <Heart className="w-8 h-8 text-white animate-bounce" />
          </div>
          <div className="space-y-2">
            <p className="text-gray-700 font-medium">{message}</p>
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default LoadingManager;
