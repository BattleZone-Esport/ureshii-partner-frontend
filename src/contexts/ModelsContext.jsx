import React, { createContext, useContext, useState, useEffect } from 'react';
import { modelsApi } from '../api/models';
import { AI_MODELS } from '../utils/constants';

const ModelsContext = createContext(null);

export const useModels = () => {
  const context = useContext(ModelsContext);
  if (!context) {
    throw new Error('useModels must be used within ModelsProvider');
  }
  return context;
};

export const ModelsProvider = ({ children }) => {
  const [models, setModels] = useState(AI_MODELS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadModels = async () => {
      try {
        setLoading(true);
        const modelsInfo = await modelsApi.getModelsInfo();
        setModels(modelsInfo);
      } catch (error) {
        console.error('Failed to load models info:', error);
        // Fallback to hardcoded models
      } finally {
        setLoading(false);
      }
    };
    loadModels();
  }, []);

  const value = {
    models,
    loading,
  };

  return <ModelsContext.Provider value={value}>{children}</ModelsContext.Provider>;
};
