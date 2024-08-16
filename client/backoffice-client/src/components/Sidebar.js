import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isSidebarOpen }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        localStorage.removeItem('employerId');
        navigate('/login');
    };

    const handleMainPage = () => {
        navigate('/main');
    };

    const handleProfilePage = () => {
        navigate('/profile');
    };

    const handleMyStaffPage = () => {
        navigate('/mystaff');
    };

    return (
        <div
            className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-gray-900 to-gray-700 text-white p-6 transform ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } transition-transform duration-300 ease-in-out z-50 shadow-lg`}
        >
            <div className="flex justify-center mb-8">
                <h2 className="text-2xl  text-center">Menu</h2>
            </div>
            <ul className="flex-1 space-y-6">
                <li>
                    <button
                        onClick={handleMainPage}
                        className="hover:bg-gray-600 transition-colors duration-200 block w-full text-left py-3 px-4 rounded-lg"
                    >
                        Main Page
                    </button>
                </li>
                <li>
                    <button
                        onClick={handleProfilePage}
                        className="hover:bg-gray-600 transition-colors duration-200 block w-full text-left py-3 px-4 rounded-lg"
                    >
                        Profile
                    </button>
                </li>
                <li>
                    <button
                        onClick={handleMyStaffPage}
                        className="hover:bg-gray-600 transition-colors duration-200 block w-full text-left py-3 px-4 rounded-lg"
                    >
                        My Staff
                    </button>
                </li>
                <li>
                    <button
                        onClick={handleLogout}
                        className="hover:bg-red-500  transition-colors duration-200 block w-full text-left py-3 px-4 rounded-lg"
                    >
                        Logout
                    </button>
                </li>
            </ul>
           
        </div>
    );
};

export default Sidebar;
