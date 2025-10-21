import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Palette, Sparkles } from 'lucide-react';
import { AI_MODELS } from '../../utils/constants';

const PersonasSection = () => {
  const personas = [
    {
      ...AI_MODELS.URESHII_P1,
      icon: Brain,
      features: [
        'Builds production-ready applications',
        'Debugs and optimizes code',
        'Implements best practices',
        'Creates scalable architectures',
      ],
    },
    {
      ...AI_MODELS.URESHII_C1,
      icon: Heart,
      features: [
        'Patient and thorough explanations',
        'Step-by-step tutorials',
        'Beginner-friendly approach',
        'Clear documentation',
      ],
    },
    {
      ...AI_MODELS.URESHII_C2,
      icon: Palette,
      features: [
        'Creative problem solving',
        'Out-of-the-box thinking',
        'Fun and engaging interactions',
        'Innovative solutions',
      ],
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-surface-elevated/50">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Meet Your AI Personas
            </h3>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Three unique AI personalities, each specialized to help you in different ways
            </p>
          </motion.div>
        </div>

        {/* Personas grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {personas.map((persona, index) => (
            <motion.div
              key={persona.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              {/* Card */}
              <div className="relative h-full p-6 sm:p-8 rounded-2xl bg-surface-elevated border border-surface-border group-hover:border-primary-500/50 transition-all duration-300 overflow-hidden">
                {/* Background gradient */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${persona.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon and emoji */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${persona.color} bg-opacity-10`}>
                      <persona.icon className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-4xl">{persona.emoji}</span>
                  </div>
                  
                  {/* Name and title */}
                  <h4 className="text-xl sm:text-2xl font-bold text-white mb-1">
                    {persona.name}
                  </h4>
                  <p className="text-sm text-primary-400 mb-3">{persona.title}</p>
                  
                  {/* Description */}
                  <p className="text-gray-400 mb-6">
                    {persona.description}
                  </p>
                  
                  {/* Features */}
                  <ul className="space-y-2">
                    {persona.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Sparkles className="w-4 h-4 text-primary-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile tip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-500">
            You can switch between personas anytime during your conversation
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PersonasSection;