import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import { cn } from '../../lib/utils';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-surface-base">
      {/* Navbar */}
      <Navbar 
        onMenuClick={() => setMobileMenuOpen(true)}
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileNav 
            isOpen={mobileMenuOpen} 
            onClose={() => setMobileMenuOpen(false)} 
          />
        )}
      </AnimatePresence>

      <div className="flex h-[calc(100vh-64px)] pt-16">
        {/* Desktop Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -250 }}
              animate={{ x: 0 }}
              exit={{ x: -250 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className={cn(
                'hidden lg:block w-64 bg-surface-elevated border-r border-surface-border',
                'fixed left-0 top-16 h-[calc(100vh-64px)] z-30'
              )}
            >
              <Sidebar />
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main content area */}
        <main 
          className={cn(
            'flex-1 overflow-y-auto transition-all duration-300',
            sidebarOpen && 'lg:ml-64'
          )}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Status bar (optional - for connection status, etc.) */}
      <div className="fixed bottom-0 left-0 right-0 h-6 bg-surface-elevated border-t border-surface-border flex items-center px-4 text-xs text-gray-500 z-20">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            <span>Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;