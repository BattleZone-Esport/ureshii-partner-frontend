import { useState, useCallback, useEffect } from 'react';
import { chatApi } from '../api/chat';
import { useAuth } from '../contexts/AuthContext';
import { generateId } from '../lib/utils';
import toast from 'react-hot-toast';

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  // Load chat history from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('ureshii_chat_messages');
    if (stored) {
      try {
        setMessages(JSON.parse(stored));
      } catch (err) {
        console.error('Failed to load chat history:', err);
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('ureshii_chat_messages', JSON.stringify(messages));
    }
  }, [messages]);

  const sendMessage = useCallback(async (prompt, model = 'ureshii-c1') => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);

    // Add user message to chat immediately
    const userMessage = {
      id: generateId('msg'),
      role: 'user',
      content: prompt,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = isAuthenticated
        ? await chatApi.sendMessage({ prompt, model })
        : await chatApi.sendGuestMessage(prompt);

      // Add AI response to chat
      const aiMessage = {
        id: generateId('msg'),
        role: 'assistant',
        content: response.text || response.response,
        model,
        private: response.private_mode,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiMessage]);

      // Handle guest message limit
      if (!isAuthenticated && response.limit_reached) {
        toast.error('You have reached the guest message limit. Please sign in to continue.');
      } else if (!isAuthenticated && response.remaining_messages <= 2) {
        toast.warning(`Only ${response.remaining_messages} messages remaining in guest mode.`);
      }

      return response;
    } catch (err) {
      console.error('Failed to send message:', err);
      setError(err.message);
      
      // Add error message to chat
      const errorMessage = {
        id: generateId('msg'),
        role: 'system',
        content: 'Failed to get response. Please try again.',
        isError: true,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
      
      toast.error('Failed to send message. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    localStorage.removeItem('ureshii_chat_messages');
  }, []);

  const deleteMessage = useCallback((messageId) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  }, []);

  const retryMessage = useCallback(async (messageId) => {
    const message = messages.find(msg => msg.id === messageId);
    if (message && message.role === 'user') {
      // Remove the failed response if any
      const messageIndex = messages.findIndex(msg => msg.id === messageId);
      if (messageIndex < messages.length - 1) {
        setMessages(prev => prev.slice(0, messageIndex + 1));
      }
      // Resend the message
      await sendMessage(message.content);
    }
  }, [messages, sendMessage]);

  return {
    messages,
    loading,
    error,
    sendMessage,
    clearMessages,
    deleteMessage,
    retryMessage,
  };
};