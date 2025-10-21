import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Zap, 
  Globe, 
  Clock, 
  Lock, 
  Users,
  Code,
  Terminal as TerminalIcon,
  MessageCircle,
  Cpu,
  Cloud,
  GitBranch
} from 'lucide-react';

const FeaturesGrid = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and never shared. Private mode available for sensitive work.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Instant responses powered by cutting-edge AI technology.',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Globe,
      title: 'Always Available',
      description: '24/7 access from anywhere in the world. No downtime.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Clock,
      title: 'Memory & Context',
      description: 'Remembers your preferences and past conversations for personalized help.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Code,
      title: 'Full-Stack Development',
      description: 'Build complete applications from frontend to backend with guided assistance.',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: TerminalIcon,
      title: 'AI-Protected Terminal',
      description: 'Safe command execution with natural language. No direct access for security.',
      color: 'from-gray-600 to-gray-500',
    },
  ];

  const stats = [
    { label: 'Free Messages', value: '10/day', subtext: 'for guests' },
    { label: 'Response Time', value: '<2s', subtext: 'average' },
    { label: 'Uptime', value: '99.9%', subtext: 'guaranteed' },
    { label: 'Models', value: '3+', subtext: 'AI personas' },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Why Choose URESHII Partner?
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Everything you need to code, learn, and automate - all in one place
          </motion.p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="group relative p-6 rounded-xl bg-surface-elevated border border-surface-border hover:border-primary-500/50 transition-all duration-300"
            >
              {/* Icon */}
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.color} bg-opacity-10 mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              {/* Title */}
              <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-300 transition-colors">
                {feature.title}
              </h4>
              
              {/* Description */}
              <p className="text-sm text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-8 rounded-2xl bg-surface-elevated/50 border border-surface-border"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary-400 mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-white">
                {stat.label}
              </div>
              <div className="text-xs text-gray-500">
                {stat.subtext}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 mb-4">
            Ready to supercharge your development workflow?
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
          >
            Get started for free ↑
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesGrid;