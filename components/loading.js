import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <FaSpinner className="animate-spin text-4xl text-blue-500" />
    </div>
  );
};

export default Loader;
