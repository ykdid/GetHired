import React from 'react';
import { FaTimes, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = ({ isSidebarOpen, handleSidebarToggle }) => {
    return (
        <div className="bg-blue-500 text-white p-4 flex items-center sticky top-0 left-0 right-0 z-50 ">
            <button
                onClick={handleSidebarToggle}
                className="mr-4 focus:outline-none"
            >
                {isSidebarOpen ? (
                    <FaTimes size={24} />
                ) : (
                    <FaBars size={24} />
                )}
            </button>
            <h1 className="text-xl font-bold"> <Link to="/main">GetHired-Employer</Link></h1>
        </div>
    );
};

export default Navbar;
