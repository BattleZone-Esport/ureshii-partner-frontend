import React from 'react';
import { AlertCircle } from 'lucide-react';

const Terminal = () => {
  return (
    <div className="text-white">
      <div className="bg-yellow-500/20 border border-yellow-500/30 p-4 rounded-lg mb-4">
        <div className="flex items-start space-x-2">
          <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-yellow-400 font-medium">AI-Protected Terminal</p>
            <p className="text-yellow-300 text-sm mt-1">
              Terminal access is AI-only. Commands are executed through AI agents for security. 
              Describe what you want to do in natural language.
            </p>
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-4">Terminal</h1>
      <p className="text-gray-400">Terminal functionality coming soon...</p>
    </div>
  );
};

export default Terminal;