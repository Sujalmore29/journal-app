import React from 'react'
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
        <h1 className='text-6xl font-bold text-indigo-600'>404</h1>
        <p className='text-xl mt-4 text-gray-700'>Page Not Found</p>
        <Link to="/" className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-full">
        Go to Dashboard</Link>

    </div>
  );
};

export default NotFound