import React from 'react';
import { useParams } from 'react-router-dom';

const JobDetail = () => {
  const { id } = useParams();
  
  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-4">Job Detail</h1>
      <p className="text-gray-400">Job ID: {id}</p>
    </div>
  );
};

export default JobDetail;