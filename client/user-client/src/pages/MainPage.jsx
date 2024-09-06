import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import AdvertisementCard from '../components/AdvertisementCard';
import ScrollToTop from '../components/ScrollToTop';
import Loading from '../components/Loading';
import CustomToastContainer from '../components/CustomToastContainer';  

const MainPage = () => {
    const [loading, setLoading] = useState(true);
    const [ads, setAds] = useState([]);
    const [employers, setEmployers] = useState({}); 
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedEmploymentType, setSelectedEmploymentType] = useState(''); 

    const employmentTypes = [
        { label: 'All', value: '' },
        { label: 'Full Time', value: 'FullTime' },
        { label: 'Part Time', value: 'PartTime' },
        { label: 'Intern', value: 'Intern' }
    ];

    useEffect(() => {
        const fetchAds = async () => {
            setLoading(true);
            try {
                const token = sessionStorage.getItem('token');
                const userId = localStorage.getItem('userId');
                let apiUrl = `https://localhost:7053/api/JobAdvertisement/getAllJobAdvertisements/${userId}`;

                if (selectedEmploymentType) {
                    apiUrl = `https://localhost:7053/api/JobAdvertisement/getFilteredJobAdvertisements/${userId}?employmentType=${selectedEmploymentType}`;
                }

                const response = await axios.get(apiUrl, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const adsData = Array.isArray(response.data) ? response.data : [];
                setAds(adsData);

                const employerPromises = adsData.map(ad =>
                    axios.get(`https://localhost:7053/api/Employer/getEmployerById/${ad.employerId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                );
                const employerResponses = await Promise.all(employerPromises);
                const employerData = employerResponses.reduce((acc, response) => {
                    const employer = response.data;
                    acc[employer.id] = employer;
                    return acc;
                }, {});

                setEmployers(employerData);
            } catch (error) {
                console.error('An error occurred while getting advertisements or employers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAds();
    }, [selectedEmploymentType]); 

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
                className={`flex-1 flex flex-col bg-gray-50 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-64' : 'translate-x-0'}`}
                onClick={handleContentClick}
            >
                <Navbar isSidebarOpen={isSidebarOpen} handleSidebarToggle={handleSidebarToggle} />
                <div className="p-6 flex-1">
                <div className="relative mb-6">
                    <div className="flex justify-center">
                        <h1 className="text-3xl font-extrabold text-gray-900 bg-gradient-to-r from-blue-500 to-teal-500 text-transparent bg-clip-text">
                            Job List
                        </h1>
                    </div>
                    <div className="flex flex-col items-center sm:items-center sm:absolute sm:right-96 sm:top-12">
                        <p className="w-full sm:w-auto text-center mb-2 text-blue-950">Filter</p>
                        <select
                            value={selectedEmploymentType}
                            onChange={(e) => setSelectedEmploymentType(e.target.value)}
                            className="py-2 px-4 rounded bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {employmentTypes.map(type => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                    <div className="flex flex-col items-center py-4 w-full">
                        {Array.isArray(ads) && ads.length > 0 ? (
                            ads.map((ad) => (
                                <AdvertisementCard
                                    key={ad.id}
                                    ad={ad}
                                    employer={employers[ad.employerId]} 
                                />
                            ))
                        ) : (
                            <div className="text-center text-gray-500">
                                There is no new job advertisement yet.
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ScrollToTop />
            <CustomToastContainer />
        </div>
    );
};

export default MainPage;
