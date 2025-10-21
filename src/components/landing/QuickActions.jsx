import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const QuickActions = ({ actions, onActionClick }) => {
  const categoryColors = {
    Build: 'bg-green-500/10 text-green-400 border-green-500/30',
    Learn: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    Automate: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    Debug: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
  };

  const categoryGradients = {
    Build: 'from-green-500/20 to-emerald-500/20',
    Learn: 'from-blue-500/20 to-cyan-500/20',
    Automate: 'from-purple-500/20 to-pink-500/20',
    Debug: 'from-orange-500/20 to-red-500/20',
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Quick Actions
          </h3>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Jump right in with these popular requests. No sign-up required for your first 10 messages.
          </p>
        </div>

        {/* Actions grid - Mobile first responsive design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {actions.map((action, index) => (
            <motion.button
              key={action.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onActionClick(action)}
              className="group relative p-6 bg-surface-elevated rounded-xl border border-surface-border hover:border-primary-500/50 transition-all duration-300 text-left overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className={cn(
                'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300',
                categoryGradients[action.category]
              )} />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Emoji */}
                <div className="text-4xl mb-4">{action.emoji}</div>
                
                {/* Title */}
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-300 transition-colors">
                  {action.title}
                </h4>
                
                {/* Description */}
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                  {action.description}
                </p>
                
                {/* Category badge and arrow */}
                <div className="flex items-center justify-between">
                  <span className={cn(
                    'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border',
                    categoryColors[action.category]
                  )}>
                    {action.category}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Mobile-specific hint */}
        <div className="mt-8 text-center sm:hidden">
          <p className="text-sm text-gray-500">
            Swipe left/right to see more actions
          </p>
        </div>
      </div>
    </section>
  );
};

export default QuickActions;