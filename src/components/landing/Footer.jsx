import React from 'react';
import { Heart, Github, Twitter, Mail } from 'lucide-react';
import { APP_NAME, APP_CREATOR } from '../../utils/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-surface-border bg-surface-elevated/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">{APP_NAME}</h3>
            <p className="text-sm text-gray-400 mb-4">
              Your AI Partner for Code, Chat, and Command.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:support@ureshii.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#personas" className="text-sm text-gray-400 hover:text-white transition-colors">
                  AI Personas
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#docs" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/cookies" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 pt-8 border-t border-surface-border">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <p className="text-sm text-gray-400">
              © {currentYear} {APP_NAME}. All rights reserved.
            </p>
            <p className="text-sm text-gray-400 mt-4 sm:mt-0 flex items-center">
              Built with <Heart className="w-4 h-4 mx-1 text-red-500" /> by {APP_CREATOR}
            </p>
          </div>
        </div>

        {/* Mobile-optimized spacing */}
        <div className="mt-8 text-center sm:hidden">
          <p className="text-xs text-gray-500">
            Optimized for mobile and desktop experiences
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;