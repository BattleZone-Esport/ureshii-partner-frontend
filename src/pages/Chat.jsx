import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Loader2, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Search,
  Settings,
  Trash2,
  Copy,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  User as UserIcon,
  Bot,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useModels } from '../contexts/ModelsContext';
import { chatApi } from '../api/chat';
import { userApi } from '../api/user';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { MESSAGE_CHAR_LIMIT } from '../utils/constants';
import { formatRelativeTime } from '../utils/formatters';
import { cn, copyToClipboard } from '../lib/utils';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Chat = () => {
  const { user } = useAuth();
  const { models } = useModels();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('ureshii-c1');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [memoryEnabled, setMemoryEnabled] = useState(true);
  const [privateMode, setPrivateMode] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

const loadInitialData = async () => {
  try {
    // Load private mode status
    const privateModeStatus = await userApi.getPrivateModeStatus();
    setPrivateMode(privateModeStatus.private_mode);

    // ✅ FIXED: Load user settings with correct structure
    const settings = await userApi.getSettings();

    // Access nested memory settings
    if (settings?.memory?.enabled !== undefined) {
      setMemoryEnabled(settings.memory.enabled);
    }

    // Access nested model settings
    if (settings?.models?.default_model) {
      setSelectedModel(settings.models.default_model);
    }

    // Load chat history if not in private mode
    if (!privateModeStatus.private_mode) {
      const memory = await userApi.getMemory();
      if (memory.chat_history && memory.chat_history.length > 0) {
        // Convert chat_history array to messages format
        setMessages(memory.chat_history.map((item, index) => ({
          id: index,
          role: item.role || 'user',
          content: item.prompt || item.response || item.content,
          timestamp: item.timestamp || new Date().toISOString(),
        })));
      }
    }
  } catch (error) {
    console.error('Failed to load initial data:', error);
    toast.error('Failed to load chat settings');
  }
};

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
      model: selectedModel,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      const response = await chatApi.sendMessage({
        prompt: userMessage.content,
        model: selectedModel,
      });

      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response.text || response.response,
        timestamp: new Date().toISOString(),
        model: selectedModel,
        private_mode: response.private_mode,
      };

      setMessages(prev => [...prev, aiMessage]);

      // Update private mode if changed
      if (response.private_mode !== undefined) {
        setPrivateMode(response.private_mode);
      }

      // Show private mode notification
      if (response.private_mode) {
        toast('🔒 This conversation is in private mode', {
          icon: '🔒',
          duration: 2000,
        });
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        role: 'system',
        content: error.response?.data?.detail || 'Failed to get response. Please try again.',
        timestamp: new Date().toISOString(),
        isError: true,
      };
      
      setMessages(prev => [...prev, errorMessage]);
      toast.error('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTextareaChange = (e) => {
    setInput(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setInput('');
  };

  const handleClearHistory = async () => {
    if (!window.confirm('Are you sure you want to clear all chat history?')) {
      return;
    }

    try {
      await chatApi.clearHistory();
      setChatHistory([]);
      toast.success('Chat history cleared');
    } catch (error) {
      toast.error('Failed to clear history');
    }
  };

  const handleCopyMessage = async (content) => {
    const success = await copyToClipboard(content);
    if (success) {
      setCopiedId(content);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopiedId(null), 2000);
    } else {
      toast.error('Failed to copy');
    }
  };

  const CodeBlock = ({ language, value }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
      const success = await copyToClipboard(value);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    };

    return (
      <div className="relative group">
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 bg-surface-overlay rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
          title="Copy code"
        >
          {copied ? (
            <CheckCircle className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-gray-400" />
          )}
        </button>
        <SyntaxHighlighter
          language={language || 'text'}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
          }}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    );
  };

  const MessageContent = ({ content }) => {
    return (
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <CodeBlock
                language={match[1]}
                value={String(children).replace(/\n$/, '')}
              />
            ) : (
              <code className="bg-surface-overlay px-1.5 py-0.5 rounded text-sm" {...props}>
                {children}
              </code>
            );
          },
          p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
          ul: ({ children }) => <ul className="list-disc list-inside mb-4">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside mb-4">{children}</ol>,
          li: ({ children }) => <li className="mb-1">{children}</li>,
          h1: ({ children }) => <h1 className="text-2xl font-bold mb-4">{children}</h1>,
          h2: ({ children }) => <h2 className="text-xl font-bold mb-3">{children}</h2>,
          h3: ({ children }) => <h3 className="text-lg font-bold mb-2">{children}</h3>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary-500 pl-4 italic my-4">
              {children}
            </blockquote>
          ),
        }}
        className="prose prose-invert max-w-none"
      >
        {content}
      </ReactMarkdown>
    );
  };

  const modelInfo = Object.values(models).find(m => m.id === selectedModel);

  return (
    <div className="flex h-[calc(100vh-10rem)]">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-r border-surface-border bg-surface-elevated overflow-hidden"
          >
            <div className="p-4 h-full flex flex-col">
              {/* New Chat Button */}
              <Button
                onClick={handleNewChat}
                variant="gradient"
                className="w-full mb-4"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Chat
              </Button>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search chats..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-surface-overlay border border-surface-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Settings */}
              <div className="space-y-2 mb-4">
                <label className="flex items-center justify-between p-2 hover:bg-surface-overlay rounded-lg cursor-pointer">
                  <span className="text-sm text-gray-300">Memory</span>
                  <button
                    onClick={() => setMemoryEnabled(!memoryEnabled)}
                    className={cn(
                      'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                      memoryEnabled ? 'bg-primary-600' : 'bg-surface-border'
                    )}
                  >
                    <span
                      className={cn(
                        'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                        memoryEnabled ? 'translate-x-6' : 'translate-x-1'
                      )}
                    />
                  </button>
                </label>

                {privateMode && (
                  <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-400 text-sm">
                    <div className="flex items-center font-medium">
                      <EyeOff className="w-4 h-4 mr-2" />
                      Private Mode Active
                    </div>
                    <p className="text-xs text-yellow-500 mt-1">
                      This mode is for the current session and will reset on page reload.
                    </p>
                  </div>
                )}
              </div>

              {/* Chat History */}
              <div className="flex-1 overflow-y-auto space-y-2">
                <h3 className="text-sm font-semibold text-gray-400 mb-2">Recent Chats</h3>
                {chatHistory.length > 0 ? (
                  chatHistory
                    .filter(chat => 
                      !searchQuery || 
                      chat.messages?.some(m => 
                        m.content.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                    )
                    .map((chat) => (
                      <button
                        key={chat.id}
                        onClick={() => setMessages(chat.messages || [])}
                        className="w-full text-left p-2 hover:bg-surface-overlay rounded-lg transition-colors"
                      >
                        <div className="text-sm text-white truncate">
                          {chat.messages?.[0]?.content || 'Empty chat'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatRelativeTime(chat.created_at)}
                        </div>
                      </button>
                    ))
                ) : (
                  <p className="text-sm text-gray-500">No chat history</p>
                )}
              </div>

              {/* Clear History */}
              {!privateMode && chatHistory.length > 0 && (
                <Button
                  onClick={handleClearHistory}
                  variant="ghost"
                  size="sm"
                  className="w-full mt-4 text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear History
                </Button>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-surface-elevated border border-surface-border rounded-r-lg hover:bg-surface-overlay transition-colors"
      >
        {sidebarOpen ? (
          <ChevronLeft className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-400" />
        )}
      </button>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">
                  Start a conversation
                </h3>
                <p className="text-sm text-gray-500 max-w-md">
                  Choose an AI model below and type your message to begin
                </p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    'flex',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[80%] sm:max-w-[70%] relative group',
                      message.role === 'user' && 'order-2'
                    )}
                  >
                    {/* Avatar */}
                    <div
                      className={cn(
                        'flex items-start space-x-3',
                        message.role === 'user' && 'flex-row-reverse space-x-reverse'
                      )}
                    >
                      <div
                        className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                          message.role === 'user'
                            ? 'bg-primary-600'
                            : message.role === 'system'
                            ? 'bg-red-600'
                            : 'bg-gradient-to-br from-purple-600 to-pink-600'
                        )}
                      >
                        {message.role === 'user' ? (
                          <UserIcon className="w-5 h-5 text-white" />
                        ) : message.role === 'system' ? (
                          <AlertCircle className="w-5 h-5 text-white" />
                        ) : (
                          <Bot className="w-5 h-5 text-white" />
                        )}
                      </div>

                      {/* Message Content */}
                      <div className="flex-1">
                        <div
                          className={cn(
                            'p-4 rounded-lg',
                            message.role === 'user'
                              ? 'bg-primary-600 text-white'
                              : message.isError
                              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                              : 'bg-surface-overlay text-gray-200'
                          )}
                        >
                          {message.role === 'assistant' ? (
                            <MessageContent content={message.content} />
                          ) : (
                            <p className="whitespace-pre-wrap">{message.content}</p>
                          )}
                        </div>

                        {/* Message Meta */}
                        <div className="flex items-center mt-2 text-xs text-gray-500 space-x-3">
                          <span>{formatRelativeTime(message.timestamp)}</span>
                          {message.model && (
                            <span className="text-primary-400">
                              {Object.values(models).find(m => m.id === message.model)?.name || message.model}
                            </span>
                          )}
                          {message.private_mode && (
                            <span className="text-yellow-400 flex items-center">
                              <Eye className="w-3 h-3 mr-1" />
                              Private
                            </span>
                          )}
                          <button
                            onClick={() => handleCopyMessage(message.content)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-gray-300"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-surface-overlay p-4 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Section */}
        <div className="border-t border-surface-border p-4">
          {/* Model Selector */}
          <div className="mb-3 flex items-center space-x-2">
            <label className="text-sm text-gray-400">Model:</label>
            <div className="flex space-x-2">
              {Object.values(models).map((model) => (
                <button
                  key={model.id}
                  onClick={() => setSelectedModel(model.id)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm transition-all',
                    selectedModel === model.id
                      ? 'bg-gradient-to-r ' + model.color + ' text-white'
                      : 'bg-surface-overlay text-gray-400 hover:text-white'
                  )}
                >
                  <span className="mr-1">{model.emoji}</span>
                  {model.name}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleTextareaChange}
                onKeyPress={handleKeyPress}
                placeholder={`Message ${modelInfo?.name || 'AI'}...`}
                disabled={loading}
                rows={1}
                className="w-full px-4 py-3 bg-surface-overlay border border-surface-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 resize-none overflow-y-auto"
                style={{ minHeight: '48px', maxHeight: '200px' }}
              />
              {/* Character counter */}
              {input.length > MESSAGE_CHAR_LIMIT - 200 && (
                <div
                  className={cn(
                    'absolute bottom-2 right-2 text-xs',
                    input.length > MESSAGE_CHAR_LIMIT
                      ? 'text-red-400'
                      : 'text-gray-500'
                  )}
                >
                  {input.length}/{MESSAGE_CHAR_LIMIT}
                </div>
              )}
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || loading || input.length > MESSAGE_CHAR_LIMIT}
              variant="gradient"
              className="h-12 px-6"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Model Description */}
          {modelInfo && (
            <p className="mt-2 text-xs text-gray-500">
              {modelInfo.title}: {modelInfo.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;