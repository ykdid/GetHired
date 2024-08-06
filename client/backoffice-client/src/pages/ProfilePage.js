import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const ProfilePage = () => {
    const [user, setUser] = useState({
        name: '',
        surname: '',
        email: '',
        companyName: '',
        employerImagePath: ''
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const fetchUser = async () => { 
            try {
                const employerId = localStorage.getItem('employerId');
                if (!employerId) {
                    throw new Error('Employer ID not found in localStorage');
                }

                const response = await axios.get(`https://localhost:7053/api/Employer/getEmployerById/${employerId}`);
                setUser(response.data);
            } catch (error) {
                console.error('An error occurred while fetching user data:', error);
            }
        };
        fetchUser();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const employerId = localStorage.getItem('employerId'); 
            if (!employerId) {
                alert('Employer ID not found in localStorage');
                return;
            }

            if (selectedFile) {
                const formData = new FormData();
                formData.append('file', selectedFile);

                const uploadResponse = await axios.post(`https://localhost:7053/api/Employer/uploadEmployerImage/${employerId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                user.employerImagePath = uploadResponse.data.filePath;
            }

            await axios.patch(`https://localhost:7053/api/Employer/updateEmployer/${employerId}`, user, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            alert('Employer information updated successfully!');
        } catch (error) {
            console.error('An error occurred while updating user information:', error);
            alert('An error occurred while updating user information.');
        }
    };

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleContentClick = () => {
        if (isSidebarOpen) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <Sidebar isSidebarOpen={isSidebarOpen} />
            <div
                className={`flex-1 flex flex-col bg-gray-100 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-64' : 'translate-x-0'}`}
                onClick={handleContentClick}
            >
                <Navbar isSidebarOpen={isSidebarOpen} handleSidebarToggle={handleSidebarToggle} />
                <div className="p-6 flex space-x-6">
                <div className="bg-white shadow-md rounded-lg p-6 w-1/3 flex flex-col justify-between pb-10 ">
                    <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
                        <div className="mb-4 pt-10">
                            <img src={user.employerImagePath || 'default-avatar.png'} alt="Employer" className="w-48 h-48 mx-auto object-cover rounded-full" />
                        </div>
                        <div className="mt-auto">
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Surname:</strong> {user.surname}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Company Name:</strong> {user.companyName}</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6 w-2/3">
                        <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={user.name}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 border rounded w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Surname</label>
                                <input
                                    type="text"
                                    name="surname"
                                    value={user.surname}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 border rounded w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 border rounded w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Company Name</label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={user.companyName}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 border rounded w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Profile Image</label>
                                <input
                                    type="file"
                                    name="employerImagePath"
                                    onChange={handleFileChange}
                                    className="mt-1 p-2 border rounded w-full"
                                />
                            </div>
                            <div className="mt-6">
                                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded items-end">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
