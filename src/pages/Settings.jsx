import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Settings = () => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  // Mock state, replace with API calls
  const [preferences, setPreferences] = useState({
    defaultModel: 'ureshii-c1',
    memoryEnabled: true,
  });

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    // TODO: Add API call to save preferences
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <div className="text-white max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="space-y-8">
        {/* Profile Section */}
        <Card className="bg-surface-elevated">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Profile</h2>
            <div className="flex items-center space-x-4">
              <img src={user?.avatar_url} alt="User Avatar" className="w-16 h-16 rounded-full" />
              <div>
                <p className="font-medium text-white">{user?.full_name}</p>
                <p className="text-sm text-gray-400">{user?.email}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* AI Preferences */}
        <Card className="bg-surface-elevated">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">AI Preferences</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Default Model</label>
                <select
                  value={preferences.defaultModel}
                  onChange={(e) => handlePreferenceChange('defaultModel', e.target.value)}
                  className="w-full bg-surface-overlay border border-surface-border rounded-lg px-3 py-2 text-white"
                >
                  <option value="ureshii-c1">Ureshii C1</option>
                  <option value="ureshii-c1-turbo">Ureshii C1 Turbo</option>
                  <option value="ureshii-code-b1">Ureshii Code B1</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-300">Enable Memory</label>
                <button
                  onClick={() => handlePreferenceChange('memoryEnabled', !preferences.memoryEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.memoryEnabled ? 'bg-primary-600' : 'bg-surface-border'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.memoryEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Appearance */}
        <Card className="bg-surface-elevated">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Appearance</h2>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Theme</label>
              <select
                value={theme}
                onChange={handleThemeChange}
                className="w-full bg-surface-overlay border border-surface-border rounded-lg px-3 py-2 text-white"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="system">System</option>
              </select>
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button variant="gradient">Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
