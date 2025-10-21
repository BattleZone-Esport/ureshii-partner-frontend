import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, AlertCircle, LogIn } from 'lucide-react';
import { Button } from '../ui/Button';
import { chatApi } from '../../api/chat';
import { useAuth } from '../../contexts/AuthContext';
import { GUEST_MESSAGE_LIMIT } from '../../utils/constants';
import toast from 'react-hot-toast';

const GuestChatModal = ({ isOpen, onClose, initialPrompt }) => {
  const { login } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [remainingMessages, setRemainingMessages] = useState(GUEST_MESSAGE_LIMIT);
  const [limitReached, setLimitReached] = useState(false);

  // Load guest status on mount
  useEffect(() => {
    if (isOpen) {
      loadGuestStatus();
      if (initialPrompt) {
        sendMessage(initialPrompt);
      }
    }
  }, [isOpen, initialPrompt]);

  const loadGuestStatus = async () => {
    try {
      const status = await chatApi.getGuestStatus();
      setRemainingMessages(status.remaining_messages);
      setLimitReached(status.remaining_messages === 0);
    } catch (error) {
      console.error('Failed to load guest status:', error);
    }
  };

  const sendMessage = async (text) => {
    if (!text.trim() || loading || limitReached) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await chatApi.sendGuestMessage(text);
      
      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response.response,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setRemainingMessages(response.remaining_messages);
      
      if (response.limit_reached) {
        setLimitReached(true);
        toast.error('Guest message limit reached. Please sign in to continue.');
      } else if (response.remaining_messages <= 2) {
        toast.warning(`Only ${response.remaining_messages} messages remaining.`);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Failed to send message. Please try again.');
      
      const errorMessage = {
        id: Date.now() + 1,
        role: 'system',
        content: 'Failed to get response. Please try again.',
        isError: true,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-2xl max-h-[80vh] bg-surface-elevated rounded-xl border border-surface-border shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-surface-border">
            <div>
              <h3 className="text-lg font-semibold text-white">Guest Chat</h3>
              <p className="text-sm text-gray-400">
                {remainingMessages} messages remaining
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-surface-overlay rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <p>Start a conversation...</p>
              </div>
            )}
            
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-primary-600 text-white'
                      : message.isError
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-surface-overlay text-gray-200'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-surface-overlay p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input area or limit reached message */}
          {!limitReached ? (
            <div className="p-4 border-t border-surface-border">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
                  placeholder="Type your message..."
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-surface-overlay border border-surface-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
                />
                <Button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || loading}
                  variant="gradient"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              {remainingMessages <= 3 && (
                <div className="mt-2 flex items-center text-yellow-400 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Only {remainingMessages} messages left. Sign in for unlimited access.
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 border-t border-surface-border bg-surface-overlay/50">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">
                  Guest Limit Reached
                </h4>
                <p className="text-gray-400 mb-4">
                  You've used all 10 free messages. Sign in with Google to continue chatting.
                </p>
                <Button onClick={login} variant="gradient" className="w-full sm:w-auto">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign in with Google
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GuestChatModal;