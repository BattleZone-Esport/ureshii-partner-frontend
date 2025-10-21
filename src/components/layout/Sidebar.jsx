import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  MessageSquare, 
  Briefcase, 
  Terminal, 
  Settings, 
  HelpCircle,
  Home,
  Plus
} from 'lucide-react';
import { cn } from '../../lib/utils';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: Home, 
      path: '/dashboard',
      exact: true 
    },
    { 
      id: 'chat', 
      label: 'Chat', 
      icon: MessageSquare, 
      path: '/dashboard/chat' 
    },
    { 
      id: 'jobs', 
      label: 'Projects/Jobs', 
      icon: Briefcase, 
      path: '/dashboard/jobs' 
    },
    { 
      id: 'terminal', 
      label: 'Terminal', 
      icon: Terminal, 
      path: '/dashboard/terminal' 
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Settings, 
      path: '/dashboard/settings' 
    },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* New chat/job button */}
      <div className="p-4">
        <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          <span>New Chat</span>
        </button>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 px-4 pb-4 space-y-1">
        {navItems.map((item) => {
          const isActive = item.exact 
            ? location.pathname === item.path
            : location.pathname.startsWith(item.path);

          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={cn(
                'flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-primary-600/20 text-primary-400 border-l-2 border-primary-500'
                  : 'text-gray-400 hover:bg-surface-overlay hover:text-white'
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Help section */}
      <div className="p-4 border-t border-surface-border">
        <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-400 hover:bg-surface-overlay hover:text-white rounded-lg transition-colors">
          <HelpCircle className="w-5 h-5" />
          <span>Help & Docs</span>
        </button>
      </div>

      {/* Usage stats */}
      <div className="p-4 border-t border-surface-border">
        <div className="text-xs text-gray-500">
          <div className="flex justify-between mb-1">
            <span>Jobs Today</span>
            <span>5/∞</span>
          </div>
          <div className="w-full bg-surface-overlay rounded-full h-1.5">
            <div className="bg-primary-600 h-1.5 rounded-full" style={{ width: '25%' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;