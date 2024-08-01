import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isSidebarOpen }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('employerId');
        navigate('/login');
    };

    const handleMainPage = () => {
        navigate ('/main')
    }

    const handleProfilePage = () => {
        navigate ('/profile')
    }
    
    const handleMyStaffPage = () => {
        navigate ('/mystaff')
    }

    return (
        <div
            className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-4 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}
        >
            <div className="flex justify-center mb-4">
                <h2 className="text-lg font-semibold text-center">Menu</h2>
            </div>
            <ul className="flex-1">
                <li className="py-4 border-b border-gray-500">
                <button
                        onClick={handleMainPage}
                        className="hover:text-gray-400 transition-colors duration-200 block w-full text-left"
                    >
                        MainPage
                    </button>
                </li>
                <li className="py-4 border-b border-gray-500">
                <button
                        onClick={handleProfilePage}
                        className="hover:text-gray-400 transition-colors duration-200 block w-full text-left"
                    >
                        Profile
                    </button>
                </li>
                <li className="py-4 border-b border-gray-500">
                <button
                        onClick={handleMyStaffPage}
                        className="hover:text-gray-400 transition-colors duration-200 block w-full text-left"
                    >
                        MyStaff
                    </button>
                </li>
            </ul>
            <ul className="mt-auto">
                <li className="py-4 border-t border-gray-500">
                <button
                        onClick={handleLogout}
                        className="hover:text-gray-400 transition-colors duration-200 block w-full text-left"
                    >
                        Logout
                    </button>
                   
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
