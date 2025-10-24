import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { jobsApi } from '../api/jobs';
import { formatRelativeTime } from '../utils/formatters';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const fetchedJobs = await jobsApi.getJobs();
      setJobs(fetchedJobs.jobs || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch jobs. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Jobs & Projects</h1>
        <Button variant="gradient">
          <Plus className="w-4 h-4 mr-2" />
          Create Job
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface-overlay border border-surface-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {loading && <p className="text-gray-400">Loading jobs...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <Card key={job.id} className="bg-surface-elevated hover:bg-surface-overlay transition-colors">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">{job.title}</h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-3">{job.description}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{job.status}</span>
                    <span>{formatRelativeTime(job.created_at)}</span>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <p className="text-gray-400 md:col-span-2 lg:col-span-3 text-center">No jobs found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Jobs;
