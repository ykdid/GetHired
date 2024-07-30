import React from 'react';
import { FaTimes, FaBars } from 'react-icons/fa'; // İkonları import ediyoruz

const Navbar = ({ isSidebarOpen, handleSidebarToggle }) => {
    return (
        <div className="bg-blue-500 text-white p-4 flex items-center">
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
            <h1 className="text-xl font-bold">GetHired-Employer</h1>
        </div>
    );
};

export default Navbar;
