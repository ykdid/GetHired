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
    const [employer, setEmployer] = useState({
        name: '',
        surname: '',
        email: '',
        companyName: '',
        employerImagePath: ''
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchEmployer = async () => { 
            try {
                const token = sessionStorage.getItem('token');
                const employerId = localStorage.getItem('employerId');
                if (!employerId) {
                    throw new Error('Employer ID not found in localStorage');
                }
                if (!token) {
                    throw new Error('Token not found in sessionStorage');
                }

                const response = await axios.get(`http://localhost:7053/api/Employer/getEmployerById/${employerId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setEmployer(response.data);
            } catch (error) {
                console.error('An error occurred while fetching employer data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEmployer();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEmployer({ ...employer, [name]: value });
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateEmployer()) {
            return;
        }

        setLoading(true);
        try {
            const employerId = localStorage.getItem('employerId');
            const token = sessionStorage.getItem('token');  
            if (!employerId || !token) {
                console.error('Employer ID or Token not found');
                return;
            }

            let imagePath = employer.employerImagePath;

            if (selectedFile) {
                const storageRef = ref(storage, `Employers/EmployerProfileImages/${employerId}/${selectedFile.name}`);
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
                            
                            setEmployer((prevEmployer) => ({ ...prevEmployer, employerImagePath: imagePath }));
       
                            await axios.patch(`http://localhost:7053/api/Employer/updateEmployer/${employerId}`, { ...employer, employerImagePath: imagePath }, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`,
                                },
                            });
                            toast.success('Your information updated successfully!');
                        }
                        catch(error){
                            console.error('An error occurred while updating employer information:', error);
                            toast.error('An error occurred while updating employer information.');
                        }
                        finally{
                            setLoading(false);
                        }
                    }
                );
            } 
            else {
                await axios.patch(`http://localhost:7053/api/Employer/updateEmployer/${employerId}`, employer, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                toast.success('Your information updated successfully!');   
            }
        } catch (error) {
            console.error('An error occurred while updating employer information:', error);
            toast.error('An error occurred while updating employer information.');
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
    
    const validateEmployer = () =>{
        const { name, surname, email, companyName } = employer;

        if (name.length < 2) {
            toast.error('Name must be at least 2 characters.',{
                position:'top-center',
                autoClose:4000
            });
            return false;
        }

        if (surname.length <= 2) {
            toast.error('Surname must be at least 2 characters.',{
                position:'top-center',
                autoClose:4000
            });
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address.',{
                position:'top-center',
                autoClose:4000
            });
            return false;
        }
        if (companyName.length < 3) {
            toast.error('Company name must be at least 3 characters.',{
                position:'top-center',
                autoClose:4000
            });
            return false;
        }

        return true;
    }
    

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
                                src={employer.employerImagePath || defaultAvatar}
                                alt="Employer"
                                className="w-64 h-64 mx-auto object-cover rounded-full shadow-md mt-5"
                            />
                        </div>
                        <div className="mt-auto space-y-4">
                            <p className="text-lg"><strong>Name:</strong> {employer.name}</p>
                            <p className="text-lg"><strong>Surname:</strong> {employer.surname}</p>
                            <p className="text-lg"><strong>Email:</strong> {employer.email}</p>
                            <p className="text-lg"><strong>Company Name:</strong> {employer.companyName}</p>
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
                                    value={employer.name}
                                    onChange={handleInputChange}
                                    className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-lg">Surname</label>
                                <input
                                    type="text"
                                    name="surname"
                                    value={employer.surname}
                                    onChange={handleInputChange}
                                    className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-lg">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={employer.email}
                                    onChange={handleInputChange}
                                    className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-lg">Company Name</label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={employer.companyName}
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
                        <div className="flex justify-end mt-6">
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
            </div>
            <CustomToastContainer />
        </div>
    );
};

export default ProfilePage;
    