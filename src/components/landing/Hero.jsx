import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Code2, MessageSquare, Terminal } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { APP_NAME, APP_TAGLINE, APP_MISSION } from '../../utils/constants';

const Hero = () => {
  const { login, isAuthenticated } = useAuth();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-accent-blue/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Logo and name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center space-x-2 mb-4">
            <div className="relative">
              <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-primary-500 animate-pulse" />
              <div className="absolute inset-0 bg-primary-500/20 blur-xl animate-pulse" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {APP_NAME}
            </h1>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 text-white"
        >
          {APP_TAGLINE}
        </motion.h2>

        {/* Mission statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-base sm:text-lg lg:text-xl text-gray-300 mb-12 max-w-3xl mx-auto px-4"
        >
          {APP_MISSION}
        </motion.p>

        {/* Feature icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center items-center space-x-8 mb-12"
        >
          <div className="flex flex-col items-center">
            <Code2 className="w-8 h-8 text-green-400 mb-2" />
            <span className="text-sm text-gray-400">Code</span>
          </div>
          <div className="flex flex-col items-center">
            <MessageSquare className="w-8 h-8 text-blue-400 mb-2" />
            <span className="text-sm text-gray-400">Chat</span>
          </div>
          <div className="flex flex-col items-center">
            <Terminal className="w-8 h-8 text-purple-400 mb-2" />
            <span className="text-sm text-gray-400">Command</span>
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          {!isAuthenticated ? (
            <>
              <Button
                onClick={login}
                size="xl"
                variant="gradient"
                className="w-full sm:w-auto group"
              >
                <span>Sign in with Google</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                size="xl"
                variant="outline"
                className="w-full sm:w-auto"
              >
                Try as Guest (10 messages free)
              </Button>
            </>
          ) : (
            <Button
              onClick={() => window.location.href = '/dashboard'}
              size="xl"
              variant="gradient"
              className="w-full sm:w-auto group"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-primary-400">3</div>
            <div className="text-xs sm:text-sm text-gray-500">AI Personas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-accent-blue">∞</div>
            <div className="text-xs sm:text-sm text-gray-500">Possibilities</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-accent-purple">24/7</div>
            <div className="text-xs sm:text-sm text-gray-500">Available</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <span className="text-xs text-gray-500">Scroll to explore</span>
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;