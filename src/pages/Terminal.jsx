import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle, ChevronRight } from 'lucide-react';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (input.trim()) {
        const newHistory = [...history, { type: 'command', content: input }];
        // Mock AI response
        newHistory.push({ type: 'response', content: `AI processing: "${input}"... Functionality coming soon.` });
        setHistory(newHistory);
        setInput('');
      }
    }
  };

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

      <div
        className="bg-surface-elevated font-mono text-sm rounded-lg p-4 h-96 overflow-y-auto"
        onClick={() => inputRef.current?.focus()}
      >
        <div>
          {history.map((item, index) => (
            <div key={index} className="mb-2">
              {item.type === 'command' ? (
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-primary-400" />
                  <span className="text-gray-300">{item.content}</span>
                </div>
              ) : (
                <div className="text-gray-400 whitespace-pre-wrap">{item.content}</div>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center">
          <ChevronRight className="w-4 h-4 text-primary-400" />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            className="bg-transparent border-none text-gray-300 focus:outline-none w-full"
            placeholder="Describe what you want to do..."
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
