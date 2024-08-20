import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import CustomToastContainer from '../components/CustomToastContainer';
import { toast } from 'react-toastify';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/FirebaseConfig';

const ProfilePage = () => {
    const [user, setUser] = useState({
        name: '',
        surname: '',
        email: '',
        hashPassword: '',
        companyName: '',
        employerImagePath: ''
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fetchUser = async () => { 
            try {
                const token = sessionStorage.getItem('token');
                const employerId = localStorage.getItem('employerId');
                if (!employerId) {
                    throw new Error('Employer ID not found in localStorage');
                }
                if (!token) {
                    throw new Error('Token not found in sessionStorage');
                }

                const response = await axios.get(`https://localhost:7053/api/Employer/getEmployerById/${employerId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error('An error occurred while fetching user data:', error);
            } finally {
                setLoading(false);
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
            const token = sessionStorage.getItem('token');  
            if (!employerId || !token) {
                console.error('Employer ID or Token not found');
                return;
            }

            let imagePath = user.employerImagePath;

            if (selectedFile) {
                const storageRef = ref(storage, `Employers/EmployerProfileImages/${employerId}/${selectedFile.name}`);
                const uploadTask = uploadBytesResumable(storageRef, selectedFile);

                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        // Progress handler (can be used to show upload progress)
                    },
                    (error) => {
                        console.error('Upload failed:', error);
                        toast.error('Failed to upload profile image.');
                    },
                    async () => {
                        // Complete handler
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        imagePath = downloadURL;
                        
                        // Update user state with new image path
                        setUser((prevUser) => ({ ...prevUser, employerImagePath: imagePath }));
                        
                        // Now update the user profile with the new image path
                        await axios.patch(`https://localhost:7053/api/Employer/updateEmployer/${employerId}`, { ...user, employerImagePath: imagePath }, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`,
                            },
                        });
                        toast.success('Your information updated successfully!');
                    }
                );
            } else {
                
                // Update the user profile without changing the image
                await axios.patch(`https://localhost:7053/api/Employer/updateEmployer/${employerId}`, user, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                toast.success('Your information updated successfully!');
            }
        } catch (error) {
            console.error('An error occurred while updating user information:', error);
            toast.error('An error occurred while updating user information.');
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

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <Sidebar isSidebarOpen={isSidebarOpen} />
            <div
                className={`flex-1 flex flex-col bg-gray-100 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-64' : 'translate-x-0'}`}
                onClick={handleContentClick}
            >
                <Navbar isSidebarOpen={isSidebarOpen} handleSidebarToggle={handleSidebarToggle} />
                <div className="p-6 flex space-x-6">
                    <div className="bg-white shadow-lg rounded-lg p-6 w-1/3 flex flex-col justify-between">
                        <h2 className="text-3xl font-semibold mb-6 text-center">Profile Information</h2>
                        <div className="mb-6">
                            <img
                                src={user.employerImagePath || 'default-avatar.png'}
                                alt="Employer"
                                className="w-48 h-48 mx-auto object-cover rounded-full shadow-md"
                            />
                        </div>
                        <div className="mt-auto space-y-4">
                            <p className="text-lg"><strong>Name:</strong> {user.name}</p>
                            <p className="text-lg"><strong>Surname:</strong> {user.surname}</p>
                            <p className="text-lg"><strong>Email:</strong> {user.email}</p>
                            <p className="text-lg"><strong>Company Name:</strong> {user.companyName}</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 w-2/3">
                        <h2 className="text-3xl font-semibold mb-6 text-center">Update Profile</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-700 text-lg">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={user.name}
                                    onChange={handleInputChange}
                                    className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-lg">Surname</label>
                                <input
                                    type="text"
                                    name="surname"
                                    value={user.surname}
                                    onChange={handleInputChange}
                                    className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-lg">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleInputChange}
                                    className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-lg">Password</label>
                                <input
                                    type="text"
                                    name="hashPassword"
                                    value={user.hashPassword}
                                    className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-lg">Company Name</label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={user.companyName}
                                    onChange={handleInputChange}
                                    className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-lg">Profile Image</label>
                                <input
                                    type="file"
                                    name="employerImagePath"
                                    onChange={handleFileChange}
                                    className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex justify-end mt-6">
                                <button type="submit" className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition duration-200">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <CustomToastContainer />
        </div>
    );
};

export default ProfilePage;
