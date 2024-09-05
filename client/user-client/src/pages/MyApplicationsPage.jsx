import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Loading from '../components/Loading';
import CustomToastContainer from '../components/CustomToastContainer';
import { toast } from 'react-toastify';
import defaultAvatar from '../assets/default-avatar.jpg';
import ScrollToTop from '../components/ScrollToTop';

const MyApplicationsPage = () => {
    const { userId } = useParams();
    const [applications, setApplications] = useState([]);
    const [employers, setEmployers] = useState({});
    const [advertisements, setAdvertisements] = useState({});
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchApplications = async () => {
            setLoading(true);
            try {
                const token = sessionStorage.getItem('token');
                const userId = localStorage.getItem('userId');
                if (!token) {
                    throw new Error('Token not found in sessionStorage');
                }

                // Fetch job applications by userId
                const response = await axios.get(
                    `https://localhost:7053/api/JobApplication/getJobApplicationsByUser/${userId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );
                const applicationsData = response.data;
                setApplications(applicationsData);

                // Fetch employer details for each application
                const employerRequests = applicationsData.map(application =>
                    axios.get(
                        `https://localhost:7053/api/Employer/getEmployerById/${application.employerId}`,
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            },
                        }
                    )
                );
                const employersResponses = await Promise.all(employerRequests);
                const employersData = employersResponses.reduce((acc, res) => {
                    const employer = res.data;
                    acc[employer.id] = employer;
                    return acc;
                }, {});
                setEmployers(employersData);

                // Fetch advertisement details for each application
                const advertisementRequests = applicationsData.map(application =>
                    axios.get(
                        `https://localhost:7053/api/JobAdvertisement/getJobAdvertisementsByJobAdvertisementId/${application.jobAdvertisementId}`,
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            },
                        }
                    )
                );
                const advertisementsResponses = await Promise.all(advertisementRequests);
                const advertisementsData = advertisementsResponses.reduce((acc, res) => {
                    const advertisement = res.data;
                    acc[advertisement.id] = advertisement;
                    return acc;
                }, {});
                setAdvertisements(advertisementsData);

            } catch (error) {
                console.error('Error fetching applications, employers, or advertisements:', error);
                toast.error('Error fetching data.');
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [userId]);

    const handleCancelApplication = async (jobApplicationId) => {
        try {
            const token = sessionStorage.getItem('token');
            await axios.delete(
                `https://localhost:7053/api/JobApplication/getJobApplicationByUser/${jobApplicationId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            setApplications(applications.filter(app => app.id !== jobApplicationId));
            toast.success('Application cancelled successfully.');
        } catch (error) {
            console.error('Error cancelling application:', error);
            toast.error('Error cancelling application.');
        }
    };

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <div className={`flex-1 flex flex-col bg-gray-100 transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-64' : 'translate-x-0'
        }`}>
            <Navbar isSidebarOpen={isSidebarOpen} handleSidebarToggle={handleSidebarToggle} />
            <div className="p-6 flex flex-col items-center">
                <h1 className="text-3xl font-extrabold text-gray-900 bg-gradient-to-r from-blue-500 to-teal-500 text-transparent bg-clip-text mb-12">My Job Applications</h1>
                <div className="flex flex-col items-center space-y-4">
                    {applications.map((application) => {
                        const employer = employers[application.employerId];
                        const advertisement = advertisements[application.jobAdvertisementId];
                        let statusColor = 'text-gray-700'; // Default color
    
                        switch (application.status) {
                            case 'Accepted':
                                statusColor = 'text-green-600';
                                break;
                            case 'Rejected':
                                statusColor = 'text-red-600';
                                break;
                            case 'Pending':
                            default:
                                statusColor = 'text-gray-700';
                                break;
                        }
    
                        return (
                            <div key={application.id} className="bg-white shadow-lg p-6 rounded-lg w-[700px] relative">
                            <h2 className="text-xl font-bold absolute top-4 left-4">
                                {advertisement?.title || 'Advertisement Title'}
                            </h2>
                            <div className="absolute top-4 right-4 flex items-center space-x-2">
                                <img
                                    src={employer?.employerImagePath || defaultAvatar}
                                    alt={`${employer?.name} ${employer?.surname}`}
                                    className="w-12 h-12 object-cover rounded-full border-2 border-gray-300"
                                />
                                <div className="text-sm text-gray-700">
                                    <h3 className="font-semibold">{employer?.name} {employer?.surname}</h3>
                                    <p>{employer?.email}</p>
                                </div>
                            </div>
                            <p className="absolute top-8 left-4  text-sm text-gray-700 pt-5">{employer?.companyName}</p>
                            <div className="pt-24 flex items-center justify-between">
    <div className="flex items-center">
        <span>Application Status:</span>
        <p className={`pl-2 text-lg font-semibold ${statusColor}`}>
            {application.status}
        </p>
    </div>
    {application.status === 'Pending' && (
        <button
            className="bg-red-500 text-white py-1 px-4 rounded ml-auto"
            onClick={() => handleCancelApplication(application.id)}
        >
            Cancel Application
        </button>
    )}
</div>
                        </div>
                        );
                    })}
                </div>
            </div>
            <CustomToastContainer />
            <ScrollToTop />
        </div>
    </div>
    );
};

export default MyApplicationsPage;
