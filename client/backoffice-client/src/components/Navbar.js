import React from 'react';
import { FaTimes, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = ({ isSidebarOpen, handleSidebarToggle }) => {
    return (
        <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white p-4 flex items-center justify-between shadow-md sticky top-0 left-0 right-0 z-20">
            <div className="flex items-center">
                <button
                    onClick={handleSidebarToggle}
                    className="mr-4 focus:outline-none"
                >
                    {isSidebarOpen ? (
                        <FaTimes size={24} className="hover:text-teal-200 transition-colors duration-300" />
                    ) : (
                        <FaBars size={24} className="hover:text-teal-200 transition-colors duration-300" />
                    )}
                </button>
                <h1 className="text-2xl font-bold">
                    <Link to="/main" className="hover:text-teal-200 transition-colors duration-300">
                        GetHired-Employer
                    </Link>
                </h1>
            </div>
        </div>
    );
};

export default Navbar;
