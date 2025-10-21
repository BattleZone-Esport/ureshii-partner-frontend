// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://ureshii-partner.onrender.com';
export const API_V1_STR = '/api/v1';

// Application Constants
export const APP_NAME = 'URESHII Partner';
export const APP_TAGLINE = 'Your AI Partner for Code, Chat, and Command.';
export const APP_MISSION = 'To make technology feel human — where AI remembers you, understands you, and grows with you.';
export const APP_CREATOR = 'Mukei';

// Authentication
export const AUTH_PROVIDER = 'google';

// AI Models
export const AI_MODELS = {
  URESHII_C1: {
    id: 'ureshii-c1',
    name: 'Ureshii-C1',
    title: 'The Guide',
    description: 'Calm, patient, perfect for learning',
    emoji: '🧘',
    color: 'from-blue-500 to-cyan-500',
  },
  URESHII_C2: {
    id: 'ureshii-c2',
    name: 'Ureshii-C2',
    title: 'The Rebel',
    description: 'Creative, playful, thinks outside the box',
    emoji: '🎨',
    color: 'from-purple-500 to-pink-500',
  },
  URESHII_P1: {
    id: 'ureshii-p1',
    name: 'Ureshii-P1',
    title: 'The Architect',
    description: 'Logical, precise, builds production-ready apps',
    emoji: '🏗️',
    color: 'from-green-500 to-emerald-500',
  },
};

// Job Status
export const JOB_STATUS = {
  PENDING: 'pending',
  RUNNING: 'running',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
  DEBUGGING: 'debugging',
};

// Job Status Colors
export const JOB_STATUS_COLORS = {
  [JOB_STATUS.PENDING]: 'text-gray-500 bg-gray-100 dark:bg-gray-800',
  [JOB_STATUS.RUNNING]: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30',
  [JOB_STATUS.SUCCEEDED]: 'text-green-500 bg-green-100 dark:bg-green-900/30',
  [JOB_STATUS.FAILED]: 'text-red-500 bg-red-100 dark:bg-red-900/30',
  [JOB_STATUS.DEBUGGING]: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30',
};

// Quick Actions for Landing Page
export const QUICK_ACTIONS = {
  BUILD: [
    {
      id: 'build-todo',
      emoji: '✅',
      title: 'Build a Todo App',
      description: 'Create a full-stack todo application',
      category: 'Build',
      prompt: 'Build me a modern todo app with React and Node.js',
    },
    {
      id: 'design-api',
      emoji: '🔌',
      title: 'Design REST API',
      description: 'Design and implement a RESTful API',
      category: 'Build',
      prompt: 'Design a REST API for an e-commerce platform',
    },
    {
      id: 'create-landing',
      emoji: '🎨',
      title: 'Create Landing Page',
      description: 'Build a responsive landing page',
      category: 'Build',
      prompt: 'Create a modern landing page with animations',
    },
  ],
  LEARN: [
    {
      id: 'explain-async',
      emoji: '⏳',
      title: 'Explain Async/Await',
      description: 'Understand asynchronous programming',
      category: 'Learn',
      prompt: 'Explain async/await in JavaScript with examples',
    },
    {
      id: 'data-structures',
      emoji: '🌳',
      title: 'Data Structures',
      description: 'Learn essential data structures',
      category: 'Learn',
      prompt: 'Teach me about common data structures and when to use them',
    },
    {
      id: 'web-security',
      emoji: '🔒',
      title: 'Web Security Basics',
      description: 'Learn about web security best practices',
      category: 'Learn',
      prompt: 'Explain web security basics and common vulnerabilities',
    },
  ],
  AUTOMATE: [
    {
      id: 'check-logs',
      emoji: '📋',
      title: 'Check Server Logs',
      description: 'Monitor and analyze server logs',
      category: 'Automate',
      prompt: 'Show me how to check and analyze server logs',
    },
    {
      id: 'docker-setup',
      emoji: '🐳',
      title: 'Docker Setup',
      description: 'Set up Docker for your project',
      category: 'Automate',
      prompt: 'Help me set up Docker for my application',
    },
    {
      id: 'setup-cicd',
      emoji: '🔄',
      title: 'Setup CI/CD',
      description: 'Configure continuous integration',
      category: 'Automate',
      prompt: 'Set up CI/CD pipeline with GitHub Actions',
    },
  ],
  DEBUG: [
    {
      id: 'debug-code',
      emoji: '🐛',
      title: 'Debug My Code',
      description: 'Find and fix bugs in your code',
      category: 'Debug',
      prompt: 'Help me debug this code',
    },
    {
      id: 'code-review',
      emoji: '👀',
      title: 'Code Review',
      description: 'Get feedback on your code',
      category: 'Debug',
      prompt: 'Review my code and suggest improvements',
    },
    {
      id: 'optimize-performance',
      emoji: '⚡',
      title: 'Optimize Performance',
      description: 'Improve code performance',
      category: 'Debug',
      prompt: 'Help me optimize my code for better performance',
    },
  ],
};

// Limits
export const GUEST_MESSAGE_LIMIT = 10;
export const MESSAGE_CHAR_LIMIT = 2000;

// Terminal Examples
export const TERMINAL_EXAMPLES = [
  'Check server logs from the last hour',
  'Show running processes and memory usage',
  'Monitor system resources in real-time',
  'Install npm packages for my project',
  'Set up a Python virtual environment',
  'Configure nginx for my web app',
  'Check disk space and clean up old files',
  'Run database migrations',
];

// Routes
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  CHAT: '/dashboard/chat',
  JOBS: '/dashboard/jobs',
  JOB_DETAIL: '/dashboard/jobs/:id',
  TERMINAL: '/dashboard/terminal',
  SETTINGS: '/dashboard/settings',
  LOGIN: '/login',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  USER: 'ureshii_user',
  THEME: 'ureshii_theme',
  CHAT_HISTORY: 'ureshii_chat_history',
  PREFERENCES: 'ureshii_preferences',
  PRIVATE_MODE: 'ureshii_private_mode',
};

// Animation Variants for Framer Motion
export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  slideRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },
};