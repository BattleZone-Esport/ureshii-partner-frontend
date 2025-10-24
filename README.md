# URESHII Partner Frontend

A modern, mobile-first React frontend for **URESHII Partner** - an AI-powered coding platform with chat, code generation, and terminal capabilities.

## 🚀 Live Demo

**Frontend URL**: [https://5173-iqtp9qrnk9o85cdv9ffqg-2e1b9533.sandbox.novita.ai](https://5173-iqtp9qrnk9o85cdv9ffqg-2e1b9533.sandbox.novita.ai)

**Backend API**: https://ureshii-partner.onrender.com

## 🎯 Features

### Core Functionality
- ✅ **Landing Page**: Hero section, quick actions, AI personas showcase
- ✅ **Authentication**: Google OAuth integration with session management
- ✅ **Dashboard**: Welcome screen, quick actions, recent jobs, stats
- ✅ **Responsive Design**: Mobile-first approach (70% mobile, 30% desktop)
- ✅ **Theme System**: Dark/Light/System theme support
- ✅ **Private Mode**: Session-based private browsing
- ✅ **Guest Mode**: 10 free messages without authentication

### Pages Status
- ✅ Landing Page - Complete with all sections
- ✅ Dashboard - Complete with stats and recent jobs
- ✅ Layout System - Navbar, Sidebar, Mobile Navigation
- ✅ Chat Interface - Complete with message history, model selection, and private mode
- 🚧 Jobs/Projects - Placeholder (ready for implementation)  
- 🚧 Terminal - Placeholder with warning banner
- 🚧 Settings - Placeholder (ready for implementation)

## 🏗️ Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS + Custom Design System
- **State Management**: React Context API + Custom Hooks
- **API Communication**: Axios with interceptors
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation
- **Code Display**: Monaco Editor / Prism.js (ready to integrate)
- **Terminal**: Xterm.js (ready to integrate)
- **Authentication**: Session-based with Google OAuth
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast

## 📱 Mobile-First Design

The application is optimized for mobile devices with:
- Responsive grid layouts that adapt to screen size
- Touch-friendly buttons and interactions
- Mobile navigation drawer
- Optimized font sizes and spacing
- Bottom navigation consideration
- Swipe gestures support (ready to implement)

## 🔐 Authentication Flow

1. User clicks "Sign in with Google"
2. Redirects to backend OAuth endpoint
3. Google authentication completes
4. Backend redirects back with session cookie
5. Frontend fetches user data and CSRF token
6. User is authenticated and can access protected routes

## 🎨 Design System

### Color Palette
- **Primary**: Purple (#8B5CF6)
- **Backgrounds**: Dark theme with surface layers
- **Accents**: Blue, Purple, Pink gradients
- **Status Colors**: Success (Green), Error (Red), Warning (Yellow)

### Components
- Custom Button with variants (default, gradient, outline, ghost)
- Card components with header/content/footer
- Loading spinners with full-screen support
- Toast notifications
- Responsive navigation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project
cd ureshii-partner-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/         # Navbar, Sidebar, MobileNav
│   ├── landing/        # Landing page components
│   ├── chat/           # Chat components
│   ├── jobs/           # Jobs components (to implement)
│   ├── terminal/       # Terminal components (to implement)
│   ├── settings/       # Settings components (to implement)
│   ├── common/         # Shared components
│   └── ui/             # Base UI components
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── api/                # API service layer
├── utils/              # Utility functions
└── lib/                # Library utilities
```

## 🔄 API Integration

All API calls go through a centralized Axios instance with:
- Automatic CSRF token injection
- Session cookie handling
- Global error handling
- Request/response interceptors
- Automatic auth redirects

## 📈 SEO Optimization

- Meta tags for social media sharing
- Structured data for search engines
- Canonical URLs
- Mobile-friendly viewport
- Fast loading with code splitting
- Progressive enhancement

## 🛠️ Environment Variables

```env
VITE_API_URL=https://ureshii-partner.onrender.com
```

## 🚧 Next Steps

### Priority 1: Core Features
1. **Jobs/Projects**: Complete CRUD operations for jobs
2. **Terminal**: Implement natural language command interface
3. **Settings Page**: User preferences and profile management

### Priority 2: Enhancements
1. **Settings Page**: User preferences and profile management
2. **Command Palette**: Global search with Cmdk
3. **Code Editor**: Integrate Monaco Editor for code display
4. **Virtual Scrolling**: Optimize for large message lists

### Priority 3: Polish
1. **PWA Support**: Add service worker and offline capability
2. **Animations**: Enhance micro-interactions
3. **Testing**: Add unit and integration tests
4. **Performance**: Implement virtual scrolling and lazy loading

## 🐛 Known Issues

1. Jobs, Terminal, and Settings pages show placeholder content
2. Guest chat modal needs connection to backend
3. Stats API endpoint might not exist yet (gracefully handled)
4. Private mode toggle needs backend implementation

## 📝 License

Built with ❤️ by Mukei

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions, please open an issue in the repository.