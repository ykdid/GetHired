// ApplicationsPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const ApplicationsPage = () => {
    const { advertisementId } = useParams();
    const [applications, setApplications] = useState([]);
    const [users, setUsers] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get(`https://localhost:7053/api/JobApplication/getJobApplicationsByAdvertisement/${advertisementId}`);
                const applicationsData = response.data;
                setApplications(applicationsData);

                const userRequests = applicationsData.map(application =>
                    axios.get(`https://localhost:7053/api/User/getUserById/${application.userId}`)
                );
                const usersResponses = await Promise.all(userRequests);
                const usersData = usersResponses.map(res => res.data);
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching applications or user data:', error);
            }
        };

        fetchApplications();
    }, [advertisementId]);

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
            await axios.put(`https://localhost:7053/api/JobApplication/${applicationId}/status`, { status: 'Accepted' });
            console.log(`Application ${applicationId} accepted.`);
        } catch (error) {
            console.error('Error updating application status:', error);
        }
    };

    const handleReject = (applicationId) => {
        setApplications(applications.filter(app => app.id !== applicationId));
        setUsers(users.filter(user => user.id !== applicationId));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <Sidebar isSidebarOpen={isSidebarOpen} />
            <div
                className={`flex-1 flex flex-col bg-gray-100 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-64' : 'translate-x-0'}`}
                onClick={handleContentClick}
            >
                <Navbar isSidebarOpen={isSidebarOpen} handleSidebarToggle={handleSidebarToggle} />
                <div className="p-6">
                    <div className="flex justify-center mb-4">
                        <h1 className="text-2xl font-bold text-center">Applications</h1>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        {applications.map((application, index) => (
                            <div key={application.id} className="bg-white shadow-md p-4 rounded-lg w-[600px]">
                                <img src={users[index]?.profilePhoto} alt={`${users[index]?.name} ${users[index]?.surname}`} className="w-full h-32 object-cover rounded-lg mb-2" />
                                <h3 className="text-lg font-bold mb-2">{users[index]?.name} {users[index]?.surname}</h3>
                                <p className="text-gray-700 mb-2">Age: {users[index]?.age}</p>
                                <p className="text-gray-700 mb-2">Email: {users[index]?.email}</p>
                                <div className="flex justify-end gap-2 mt-4">
                                    <button
                                        className="bg-blue-500 text-white py-1 px-2 rounded"
                                        onClick={() => handleAccept(application.id)}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className="bg-red-500 text-white py-1 px-2 rounded"
                                        onClick={() => handleReject(application.id)}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationsPage;
