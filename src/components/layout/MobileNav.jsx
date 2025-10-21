import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { X, MessageSquare, Briefcase, Terminal, Settings, Home, HelpCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

const MobileNav = ({ isOpen, onClose }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'chat', label: 'Chat', icon: MessageSquare, path: '/dashboard/chat' },
    { id: 'jobs', label: 'Projects/Jobs', icon: Briefcase, path: '/dashboard/jobs' },
    { id: 'terminal', label: 'Terminal', icon: Terminal, path: '/dashboard/terminal' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
      />

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        exit={{ x: -300 }}
        transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
        className="fixed left-0 top-0 bottom-0 w-72 bg-surface-elevated border-r border-surface-border z-50 lg:hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-surface-border">
          <h2 className="text-lg font-semibold text-white">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-overlay rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center space-x-3 px-3 py-3 rounded-lg transition-all',
                  isActive
                    ? 'bg-primary-600/20 text-primary-400'
                    : 'text-gray-400 hover:bg-surface-overlay hover:text-white'
                )
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Help */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-surface-border">
          <button className="w-full flex items-center space-x-3 px-3 py-3 text-gray-400 hover:bg-surface-overlay hover:text-white rounded-lg transition-colors">
            <HelpCircle className="w-5 h-5" />
            <span>Help & Docs</span>
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default MobileNav;