import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Loading = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex">
            <Sidebar />
            <div className='flex-1 flex flex-col bg-gray-100 '>
                <Navbar />
                <div className="flex justify-center items-center flex-1">
                    <FaSpinner className="animate-spin text-4xl text-blue-500" />
                </div>
            </div>
            
            
        </div>
    );
};

export default Loading;
