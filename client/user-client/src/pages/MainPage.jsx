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

    useEffect(() => {
        const fetchAds = async () => {
            setLoading(true);
            try {
                const token = sessionStorage.getItem('token');
                const userId = localStorage.getItem('userId');
                const response = await axios.get(`https://localhost:7053/api/JobAdvertisement/getAllJobAdvertisements/${userId}`,{
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                });
                const adsData = Array.isArray(response.data) ? response.data : [];
                setAds(adsData);
                const employerPromises = adsData.map(ad =>
                    axios.get(`https://localhost:7053/api/Employer/getEmployerById/${ad.employerId}`,{
                        headers:{
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
    }, []);

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
                    <div className="flex flex-col items-center py-4 w-full">
                        <div className="flex justify-center mb-6">
                        
                                <h1 className="text-3xl font-extrabold text-gray-900 bg-gradient-to-r from-blue-500 to-teal-500 text-transparent bg-clip-text mb-4">
                                   Job List
                                </h1>
                            
                        </div>
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
