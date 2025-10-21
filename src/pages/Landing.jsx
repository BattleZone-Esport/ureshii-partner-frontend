import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import Hero from '../components/landing/Hero';
import QuickActions from '../components/landing/QuickActions';
import PersonasSection from '../components/landing/PersonasSection';
import FeaturesGrid from '../components/landing/FeaturesGrid';
import Footer from '../components/landing/Footer';
import GuestChatModal from '../components/landing/GuestChatModal';
import { QUICK_ACTIONS } from '../utils/constants';

const Landing = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();
  const [selectedAction, setSelectedAction] = useState(null);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, loading, navigate]);

  const handleActionClick = (action) => {
    if (isAuthenticated) {
      // Navigate to chat with pre-filled prompt
      navigate('/dashboard/chat', { state: { prompt: action.prompt } });
    } else {
      // Open guest chat modal
      setSelectedAction(action);
      setIsChatModalOpen(true);
    }
  };

  const allActions = [
    ...QUICK_ACTIONS.BUILD,
    ...QUICK_ACTIONS.LEARN,
    ...QUICK_ACTIONS.AUTOMATE,
    ...QUICK_ACTIONS.DEBUG,
  ];

  return (
    <div className="min-h-screen bg-surface-base">
      {/* Background gradient mesh */}
      <div className="fixed inset-0 bg-gradient-mesh opacity-30" />
      
      {/* Content */}
      <div className="relative z-10">
        <Hero />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <QuickActions
            actions={allActions}
            onActionClick={handleActionClick}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <PersonasSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <FeaturesGrid />
        </motion.div>

        <Footer />
      </div>

      {/* Guest Chat Modal */}
      {isChatModalOpen && (
        <GuestChatModal
          isOpen={isChatModalOpen}
          onClose={() => {
            setIsChatModalOpen(false);
            setSelectedAction(null);
          }}
          initialPrompt={selectedAction?.prompt}
        />
      )}
    </div>
  );
};

export default Landing;