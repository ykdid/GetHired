import React from 'react';

const Sidebar = ({ isSidebarOpen }) => {
    return (
        <div
            className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-4 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}
        >
            <div className="flex justify-center mb-4">
                <h2 className="text-lg font-semibold text-center">Menu</h2>
            </div>
            <ul>
                <li className="py-4 border-b border-gray-500">
                    <a
                        href="#"
                        className="hover:text-gray-400 transition-colors duration-200 block"
                    >
                        Main Page
                    </a>
                </li>
                <li className="py-4 border-b border-gray-500">
                    <a
                        href="#"
                        className="hover:text-gray-400 transition-colors duration-200 block"
                    >
                        Profile
                    </a>
                </li>
                <li className="py-4 border-b border-gray-500">
                    <a
                        href="#"
                        className="hover:text-gray-400 transition-colors duration-200 block"
                    >
                        MyStaff
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
