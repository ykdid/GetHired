import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ScrollToTop from '../components/ScrollToTop';
import Loading from '../components/Loading';
import CustomToastContainer from '../components/CustomToastContainer';
import { toast } from 'react-toastify';
import defaultAvatar from '../assets/default-avatar.jpg';


const ApplicationsPage = () => {
    const { advertisementId } = useParams();
    const [applications, setApplications] = useState([]);
    const [users, setUsers] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
  
    

    useEffect(() => {
        const fetchApplications = async () => {
            setLoading(true);
            try {
                const token = sessionStorage.getItem('token');
                const employerId = localStorage.getItem('employerId'); 
                
                if (!employerId) {
                    throw new Error('Employer ID not found in localStorage');
                }
                if (!token) {
                    throw new Error('Token not found in sessionStorage');
                }

                const response = await axios.get(
                    `http://localhost:7053/api/JobApplication/getJobApplicationsByAdvertisement/${advertisementId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );
                const applicationsData = response.data;
                setApplications(applicationsData);

                const userRequests = applicationsData.map(application =>
                    axios.get(
                        `http://localhost:7053/api/User/getUserById/${application.userId}`,
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            },
                        }
                    )
                );
                const usersResponses = await Promise.all(userRequests);
                const usersData = usersResponses.map(res => res.data);
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching applications or user data:', error);
                toast.error('Error fetching data.');
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [advertisementId]);

    if (loading) {
        return <Loading />;
    }

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleContentClick = () => {
        if (isSidebarOpen) {
            setIsSidebarOpen(false);
        }
    };

    const handleAccept = async (applicationId) => {
        try {
            const token = sessionStorage.getItem('token');
            await axios.patch(
                `http://localhost:7053/api/JobApplication/${applicationId}/status`, 
                { status: 'Accepted' },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            setApplications(applications.map(app =>
                app.id === applicationId ? { ...app, status: 'Accepted' } : app
            ));
            toast.info('Application accepted.');
        } catch (error) {
            console.error('Error updating application status:', error);
            toast.error('Error accepting application.');
        }
    };

    const handleReject = async (applicationId) => {
        try {
            const token = sessionStorage.getItem('token');
            await axios.patch(
                `http://localhost:7053/api/JobApplication/${applicationId}/status`, 
                { status: 'Rejected' },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            setApplications(applications.filter(app => app.id !== applicationId));
            setUsers(users.filter(user => user.id !== applicationId));
            toast.info('Application rejected.');
        } catch (error) {
            console.error('Error rejecting application:', error);
            toast.error('Error rejecting application.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <Sidebar isSidebarOpen={isSidebarOpen} />
            <div
                className={`flex-1 flex flex-col bg-gray-100 transition-transform duration-300 ease-in-out ${
                    isSidebarOpen ? 'translate-x-64' : 'translate-x-0'
                }`}
                onClick={handleContentClick}
            >
                <Navbar isSidebarOpen={isSidebarOpen} handleSidebarToggle={handleSidebarToggle} />
                <div className="p-6">
                    <div className="flex justify-center mb-4">
                        <h1 className="text-3xl font-extrabold text-gray-900 bg-gradient-to-r from-blue-500 to-teal-500 text-transparent bg-clip-text">
                            Applications
                        </h1>
                    </div>
                    {applications.length > 0 ? (
                    <div className="flex flex-col items-center space-y-4 flex-wrap justify-center gap-4">
                        {applications.map((application, index) => (
                            <div key={application.id} className="bg-white shadow-md p-4 rounded-lg w-[600px]">
                                <img
                                    src={users[index]?.userProfileImagePath || defaultAvatar}
                                    alt={`${users[index]?.name} ${users[index]?.surname}`}
                                    className="w-32 h-32 object-cover rounded-full mb-2"
                                />
                                <h3 className="text-lg font-bold mb-2">
                                    {users[index]?.name} {users[index]?.surname}
                                </h3>
                                <p className="text-gray-700 mb-2">Age: {users[index]?.age}</p>
                                <p className="text-gray-700 mb-2">Email: {users[index]?.email}</p>
                                <p className="text-gray-700 mb-2">Phone Number: {users[index]?.phoneNumber}</p>
                                <p className="text-gray-700 mb-2">
                                    CV:{' '}
                                    {users[index]?.cvFilePath ? (
                                        <a
                                            href={users[index]?.cvFilePath}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline text-blue-600 mt-3"
                                        >
                                            View CV
                                        </a>
                                    ): ('None')}
                                </p>
                                <div className="flex justify-end gap-2 mt-4">
                                    <button
                                        className="bg-blue-500 text-white py-1 px-2 rounded"
                                        onClick={() => handleAccept(application.id)}
                                        disabled={application.status === 'Accepted' || application.status === 'Rejected'}
                                    >
                                    
                                        Accept
                                    </button>
                                    <button
                                        className="bg-red-500 text-white py-1 px-2 rounded"
                                        onClick={() => handleReject(application.id)}
                                        disabled={application.status === 'Accepted' || application.status === 'Rejected'}
                                    >
                                    
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    ) : (
                        <div className="text-center text-gray-500">
                            There is no application for this position yet.
                        </div>
                    )}
                </div>
                <ScrollToTop />
            </div>
            <CustomToastContainer />
        </div>
    );
};

export default ApplicationsPage;
