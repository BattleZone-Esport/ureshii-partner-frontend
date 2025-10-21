import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ROUTES } from './utils/constants';
import LoadingSpinner from './components/common/LoadingSpinner';
import ProtectedRoute from './components/common/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';

// Lazy load pages for better performance
const Landing = lazy(() => import('./pages/Landing'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Chat = lazy(() => import('./pages/Chat'));
const Jobs = lazy(() => import('./pages/Jobs'));
const JobDetail = lazy(() => import('./pages/JobDetail'));
const Terminal = lazy(() => import('./pages/Terminal'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Suspense fallback={<LoadingSpinner fullScreen />}>
            <Routes>
              {/* Public routes */}
              <Route path={ROUTES.HOME} element={<Landing />} />

              {/* Protected routes with dashboard layout */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="chat" element={<Chat />} />
                <Route path="jobs" element={<Jobs />} />
                <Route path="jobs/:id" element={<JobDetail />} />
                <Route path="terminal" element={<Terminal />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* Catch all - redirect to home */}
              <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
            </Routes>
          </Suspense>

          {/* Global toast notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1e293b',
                color: '#f1f5f9',
                border: '1px solid #334155',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#1e293b',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#1e293b',
                },
              },
            }}
          />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;