import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Modal from '../components/ModalAd';
import AdvertisementCard from '../components/AdvertisementCard';

const MainPage = () => {
    const [ads, setAds] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        initDate: '',
        expireDate: '',
        imagePath: '',
        htmlContent: '',
        jobType: ''
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const employerId = localStorage.getItem('employerId'); 
                if (!employerId) {
                    throw new Error('Employer ID not found in localStorage');
                }

                const response = await axios.get(`https://localhost:7053/api/JobAdvertisement/getJobAdvertisementsByEmployer/${employerId}`);
                setAds(response.data);
            } catch (error) {
                console.error('An error occurred while getting advertisements:', error);
            }
        };

        fetchAds();
    }, []);

    const handleInputChange = (event) => {
        const { name, value, files } = event.target;
        if (name === 'imagePath') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'initDate' || key === 'expireDate') {
                formDataToSend.append(key, new Date(formData[key]).toISOString());
            } else {
                formDataToSend.append(key, formData[key]);
            }
        });

        const employerId = localStorage.getItem('employerId'); 
        if (!employerId) {
            alert('Employer ID not found in localStorage');
            return;
        }

        formDataToSend.append('employerId', employerId); 

        try {
            await axios.post('https://localhost:7053/api/JobAdvertisement/addJobAdvertisement', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Advertisement created successfully!');
            setShowModal(false);
            const response = await axios.get(`https://localhost:7053/api/JobAdvertisement/getJobAdvertisementsByEmployer/${employerId}`);
            setAds(response.data);
        } catch (error) {
            console.error('An error occurred while creating advertisement:', error);
            alert('An error occurred while creating advertisement.');
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
                <div className="p-6 flex-1" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-center mb-6">
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-blue-500 text-white p-2 rounded shadow-lg hover:bg-blue-600 transition"
                        >
                            Create New Advertisement
                        </button>
                    </div>
                    <Modal
                        showModal={showModal}
                        setShowModal={setShowModal}
                        handleSubmit={handleSubmit}
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />
                    <div className="flex flex-col items-center space-y-4 py-4 w-full">
                        <div className="flex justify-center mb-4">
                            <h1 className="text-2xl font-bold text-center">
                                My JobList
                            </h1>
                        </div>
                        {ads.map((ad) => (
                            <AdvertisementCard key={ad.id} ad={ad} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
