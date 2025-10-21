import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Briefcase, 
  Terminal, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { jobsApi } from '../api/jobs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { formatRelativeTime } from '../utils/formatters';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [recentJobs, setRecentJobs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // Load recent jobs
      const jobsData = await jobsApi.getJobs({ limit: 6 });
      setRecentJobs(jobsData.jobs || []);
      
      // Load stats (if endpoint exists)
      try {
        const statsData = await jobsApi.getStats();
        setStats(statsData);
      } catch (err) {
        // Stats endpoint might not exist yet
        console.log('Stats not available');
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'Start New Chat',
      description: 'Chat with AI personas',
      icon: MessageSquare,
      color: 'from-blue-500 to-cyan-500',
      path: '/dashboard/chat',
    },
    {
      title: 'Create Job',
      description: 'Build something new',
      icon: Briefcase,
      color: 'from-purple-500 to-pink-500',
      path: '/dashboard/jobs',
    },
    {
      title: 'Open Terminal',
      description: 'Execute commands',
      icon: Terminal,
      color: 'from-green-500 to-emerald-500',
      path: '/dashboard/terminal',
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'succeeded':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'running':
        return <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen={false} text="Loading dashboard..." />;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-primary p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                Welcome back, {user?.name?.split(' ')[0] || 'Developer'}! 👋
              </h1>
              <p className="text-white/80">
                Ready to build something amazing today?
              </p>
            </div>
            <Sparkles className="w-12 h-12 text-white/50 hidden sm:block" />
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <motion.button
              key={action.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(action.path)}
              className="group relative p-6 bg-surface-elevated rounded-xl border border-surface-border hover:border-primary-500/50 transition-all duration-300 text-left overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
              <div className="relative z-10">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${action.color} bg-opacity-10 mb-4`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-primary-300 transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-400">
                  {action.description}
                </p>
                <ArrowRight className="absolute bottom-6 right-6 w-4 h-4 text-gray-500 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Recent Jobs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Recent Jobs</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/dashboard/jobs')}
          >
            View all <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {recentJobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentJobs.map((job) => (
              <Card
                key={job.id}
                className="cursor-pointer hover:border-primary-500/50 transition-all"
                onClick={() => navigate(`/dashboard/jobs/${job.id}`)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(job.status)}
                      <span className="text-xs text-gray-500">
                        {formatRelativeTime(job.created_at)}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300 line-clamp-2">
                    {job.prompt}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-8">
              <Briefcase className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No jobs yet. Create your first one!</p>
              <Button
                variant="gradient"
                size="sm"
                className="mt-4"
                onClick={() => navigate('/dashboard/jobs')}
              >
                Create Job
              </Button>
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* Stats */}
      {stats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-white mb-4">Your Stats</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card>
              <CardContent className="text-center py-4">
                <div className="text-2xl font-bold text-primary-400">
                  {stats.total_jobs || 0}
                </div>
                <div className="text-sm text-gray-400">Total Jobs</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="text-center py-4">
                <div className="text-2xl font-bold text-green-400">
                  {stats.success_rate || '100'}%
                </div>
                <div className="text-sm text-gray-400">Success Rate</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="text-center py-4">
                <div className="text-2xl font-bold text-blue-400">
                  {stats.ai_interactions || 0}
                </div>
                <div className="text-sm text-gray-400">AI Chats</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="text-center py-4">
                <div className="text-2xl font-bold text-purple-400">
                  {stats.active_today || 0}
                </div>
                <div className="text-sm text-gray-400">Active Today</div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;