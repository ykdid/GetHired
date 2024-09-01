import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import CustomToastContainer from '../components/CustomToastContainer';
import { toast } from 'react-toastify';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/FirebaseConfig';
import PasswordChangeModal from '../components/PasswordChangeModal';
import defaultAvatar from '../assets/default-avatar.jpg';

const ProfilePage = () => {
    const [user, setUser] = useState({
        name: '',
        surname: '',
        email: '',
        phoneNumber:'',
        userProfileImagePath:'',
        cvFilePath: ''
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedCvFile, setSelectedCvFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchUser = async () => { 
            try {
                const token = sessionStorage.getItem('token');
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    throw new Error('User ID not found in localStorage');
                }
                if (!token) {
                    throw new Error('Token not found in sessionStorage');
                }

                const response = await axios.get(`https://localhost:7053/api/User/getUserById/${userId}`, {
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
    const handleCvFileChange = (event) => {
        setSelectedCvFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const userId = localStorage.getItem('userId');
            const token = sessionStorage.getItem('token');  
            if (!userId || !token) {
                console.error('User ID or Token not found');
                return;
            }

            let imagePath = user.userProfileImagePath;
            let cvPath =  user.cvFilePath;

            if (selectedFile) {
                const storageRef = ref(storage, `Users/UserProfileImages/${userId}/${selectedFile.name}`);
                const uploadTask = uploadBytesResumable(storageRef, selectedFile);

                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        
                    },
                    (error) => {
                        console.error('Upload failed:', error);
                        toast.error('Failed to upload profile image.');
                    },
                    async () => {
                        setLoading(true);
                        try {
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                            imagePath = downloadURL; 
                            
                            setUser((prevUser) => ({ ...prevUser, userProfileImagePath: imagePath }));
       
                            await axios.patch(`https://localhost:7053/api/User/updateUser/${userId}`, { ...user, userImagePath: imagePath }, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`,
                                },
                            });
                            toast.success('Your information updated successfully!');
                        }
                        catch(error){
                            console.error('An error occurred while updating user information:', error);
                            toast.error('An error occurred while updating user information.');
                        }
                        finally{
                            setLoading(false);
                        }
                    }
                );
            } 
            if (selectedCvFile) {
                const cvStorageRef = ref(storage, `Users/UserCVs/${userId}/${selectedCvFile.name}`);
                const cvUploadTask = uploadBytesResumable(cvStorageRef, selectedCvFile);
    
                cvUploadTask.on(
                    'state_changed',
                    (snapshot) => {
                      
                    },
                    (error) => {
                        console.error('CV upload failed:', error);
                        toast.error('Failed to upload CV.');
                    },
                    async () => {
                        try {
                            const downloadCVURL = await getDownloadURL(cvUploadTask.snapshot.ref);
                            cvPath = downloadCVURL;
    
                            setUser((prevUser) => ({ ...prevUser, cvFilePath: cvPath }));
    
                            await axios.patch(`https://localhost:7053/api/User/updateUser/${userId}`, { ...user, cvFilePath: cvPath }, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`,
                                },
                            });
                            toast.success('Your information updated successfully!');
                        } catch (error) {
                            console.error('An error occurred while updating user information:', error);
                            toast.error('An error occurred while updating user information.');
                        }
                    }
                );
            }
            if (!selectedFile && !selectedCvFile) {
                await axios.patch(`https://localhost:7053/api/User/updateUser/${userId}`, user, {
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
        finally{
            setLoading(false)
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

    const openPasswordModal = () => {
        setIsPasswordModalOpen(true);
    };

    const closePasswordModal = () => {
        setIsPasswordModalOpen(false);
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
                                src={user.userProfileImagePath || defaultAvatar}
                                alt="User"
                                className="w-64 h-64 mx-auto object-cover rounded-full shadow-md mt-5"
                            />
                        </div>
                        <div className="mt-auto space-y-4">
                            <p className="text-lg"><strong>Name:</strong> {user.name}</p>
                            <p className="text-lg"><strong>Surname:</strong> {user.surname}</p>
                            <p className="text-lg"><strong>Email:</strong> {user.email}</p>
                            <p className="text-lg"><strong>Phone Number:</strong> {user.phoneNumber}</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 w-2/3">
                        <h2 className="text-3xl font-semibold mb-3 text-center">Update Profile</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-700 text-lg">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={user.name}
                                    onChange={handleInputChange}
                                    className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-lg">Surname</label>
                                <input
                                    type="text"
                                    name="surname"
                                    value={user.surname}
                                    onChange={handleInputChange}
                                    className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-lg">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleInputChange}
                                    className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-lg">Phone Number</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={user.phoneNumber}
                                    onChange={handleInputChange}
                                    className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-lg">Profile Image</label>
                                <input
                                    type="file"
                                    name="userProfileImagePath"
                                    onChange={handleFileChange}
                                    className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-lg">CV</label>
                                <input
                                    type="file"
                                    name="cvFilePath"
                                    onChange={handleCvFileChange}
                                    className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex justify-end mt-3">      
                                <button type="submit" className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition duration-200">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                        <div className="flex justify-end mt-3">
                            <button
                                onClick={openPasswordModal}
                                className="bg-green-500 text-white py-3 px-6 rounded-lg shadow hover:bg-green-600 transition duration-200"
                            >
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
                {isPasswordModalOpen && <PasswordChangeModal closeModal={closePasswordModal} />}
                <CustomToastContainer />
            </div>
        </div>
    );
};

export default ProfilePage;
    