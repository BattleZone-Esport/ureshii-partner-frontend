import { z } from 'zod';

// Email validation
export const emailSchema = z.string().email('Invalid email address');

// Chat message validation
export const chatMessageSchema = z.object({
  prompt: z.string()
    .min(1, 'Message cannot be empty')
    .max(2000, 'Message must be less than 2000 characters'),
  model: z.enum(['ureshii-c1', 'ureshii-c2', 'ureshii-p1']).optional(),
});

// Job creation validation
export const createJobSchema = z.object({
  prompt: z.string()
    .min(1, 'Prompt is required')
    .max(5000, 'Prompt must be less than 5000 characters'),
  mode: z.enum(['sync', 'queue']).default('sync'),
  pipeline: z.enum(['ureshii-p1', 'chat']).default('ureshii-p1'),
  coder_model: z.string().optional(),
  debugger_model: z.string().optional(),
  fixer_model: z.string().optional(),
  github_repo: z.string().url().optional().or(z.literal('')),
  github_branch: z.string().optional(),
  github_file_path: z.string().optional(),
});

// Terminal command validation
export const terminalCommandSchema = z.object({
  command: z.string()
    .min(1, 'Command is required')
    .max(1000, 'Command must be less than 1000 characters'),
  is_natural_language: z.boolean().default(true),
  model: z.enum(['ureshii-p1', 'ureshii-c1', 'ureshii-c2']).default('ureshii-p1'),
});

// Settings validation schemas
export const generalSettingsSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']).default('dark'),
  language: z.enum(['en']).default('en'),
  fontSize: z.enum(['small', 'medium', 'large']).default('medium'),
  autoSave: z.boolean().default(true),
});

export const aiPreferencesSchema = z.object({
  defaultModel: z.enum(['ureshii-c1', 'ureshii-c2', 'ureshii-p1']).default('ureshii-c1'),
  customInstructions: z.string().max(2000).optional(),
  memoryEnabled: z.boolean().default(true),
  privateMode: z.boolean().default(false),
});

export const profileSchema = z.object({
  displayName: z.string()
    .min(1, 'Display name is required')
    .max(50, 'Display name must be less than 50 characters'),
  avatar: z.string().url().optional().or(z.literal('')),
});

// Validation helpers
export const isValidEmail = (email) => {
  try {
    emailSchema.parse(email);
    return true;
  } catch {
    return false;
  }
};

export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidJobId = (id) => {
  // MongoDB ObjectId format
  return /^[a-f\d]{24}$/i.test(id);
};

export const validateChatMessage = (message) => {
  try {
    return chatMessageSchema.parse(message);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    return { error: 'Invalid message' };
  }
};

export const validateJobCreation = (data) => {
  try {
    return createJobSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    return { error: 'Invalid job data' };
  }
};

export const validateTerminalCommand = (command) => {
  try {
    return terminalCommandSchema.parse(command);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    return { error: 'Invalid command' };
  }
};

// Form validation rules
export const formRules = {
  required: (message = 'This field is required') => ({
    required: message,
  }),
  minLength: (min, message) => ({
    minLength: {
      value: min,
      message: message || `Minimum length is ${min}`,
    },
  }),
  maxLength: (max, message) => ({
    maxLength: {
      value: max,
      message: message || `Maximum length is ${max}`,
    },
  }),
  pattern: (pattern, message) => ({
    pattern: {
      value: pattern,
      message: message || 'Invalid format',
    },
  }),
  email: {
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address',
    },
  },
};