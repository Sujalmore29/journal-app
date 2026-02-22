import React from 'react'
import auth from '../assets/auth.png';
const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className='min-h-screen grid grid-cols-1 md:grid-cols-2'>
        { /* LEFT PREVIEW */}
        <div className='hidden md:flex flex-col justify-center items-center bg-linear-to-br from-indigo-600 to-purple-700 text-white p-10'>
            <h1 className='text-4xl font-bold mb-4'>Journal App</h1>
            <p className='text-lg text-center max-w-md opacity-90'>
                Capture thoughts. Track progress. Reflect daily.
            </p>

            <div className='mt-10 w-full max-w-sm rounded-xl overflow-hidden shadow-2xl'>
                <img src={auth} alt='Journal Preview'
                className='w-full object-cover' />
            </div>
        </div>

        { /* RIGHT FORM */ }
        <div className='flex items-center justify-center bg-gray-100 p-6'>
            <div className='bg-white w-full max-w-md rounded-2xl shadow-lg p-8'>
                <h2 className='text-2xl font-bold text-center mb-2'>{title}</h2>
                <p className='text-center text-gray-500 mb-6'>{subtitle}</p>
                {children}
            </div>
        </div>
        </div>
  );
};

export default AuthLayout