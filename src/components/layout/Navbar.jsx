import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Menu, 
  Search, 
  Bell, 
  User, 
  LogOut, 
  Settings, 
  Eye, 
  EyeOff,
  Moon,
  Sun,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { userApi } from '../../api/user';
import { APP_NAME } from '../../utils/constants';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

const Navbar = ({ onMenuClick, onSidebarToggle, sidebarOpen }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [privateMode, setPrivateMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handlePrivateModeToggle = async () => {
    try {
      const newState = !privateMode;
      await userApi.togglePrivateMode(newState);
      setPrivateMode(newState);
      toast.success(newState ? 'Private mode enabled' : 'Private mode disabled');
    } catch (error) {
      toast.error('Failed to toggle private mode');
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    return parts.map(p => p[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-surface-elevated border-b border-surface-border z-40">
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-surface-overlay rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-400" />
          </button>

          {/* Desktop sidebar toggle */}
          <button
            onClick={onSidebarToggle}
            className="hidden lg:block p-2 hover:bg-surface-overlay rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-400" />
          </button>

          {/* Logo */}
          <div 
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <Sparkles className="w-6 h-6 text-primary-500" />
            <span className="hidden sm:block text-lg font-bold text-white">
              {APP_NAME}
            </span>
          </div>
        </div>

        {/* Center section - Search (hidden on mobile) */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search or type a command..."
              className="w-full pl-10 pr-4 py-2 bg-surface-overlay border border-surface-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Private mode toggle */}
          <button
            onClick={handlePrivateModeToggle}
            className={cn(
              'p-2 rounded-lg transition-colors',
              privateMode 
                ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' 
                : 'hover:bg-surface-overlay text-gray-400'
            )}
            title={privateMode ? 'Private mode on' : 'Private mode off'}
          >
            {privateMode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-surface-overlay rounded-lg transition-colors"
            title="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-gray-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-400" />
            )}
          </button>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-surface-overlay rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </button>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 p-1.5 hover:bg-surface-overlay rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {user?.avatar_url ? (
                  <img 
                    src={user.avatar_url} 
                    alt={user.name} 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  getInitials(user?.name)
                )}
              </div>
              <span className="hidden sm:block text-sm text-white">
                {user?.name || 'User'}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-surface-elevated border border-surface-border rounded-lg shadow-lg py-1 z-50">
                <div className="px-4 py-2 border-b border-surface-border">
                  <p className="text-sm font-medium text-white truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {user?.email}
                  </p>
                </div>
                
                <button
                  onClick={() => {
                    navigate('/dashboard/settings');
                    setDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-surface-overlay transition-colors flex items-center space-x-2"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                
                <button
                  onClick={() => {
                    logout();
                    setDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-surface-overlay transition-colors flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Private mode banner */}
      {privateMode && (
        <div className="absolute top-16 left-0 right-0 bg-yellow-500/20 border-b border-yellow-500/30 px-4 py-2">
          <p className="text-xs sm:text-sm text-yellow-400 text-center">
            🔒 Private Mode: Your chats won't be saved in this session
          </p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;