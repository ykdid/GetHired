import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Modal from '../components/ModalAd';
import AdvertisementCard from '../components/AdvertisementCard';
import { FaTimes, FaBars } from 'react-icons/fa';  

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
        employerId: '',
        jobType: ''
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const response = await axios.get('https://api.example.com/advertisements');
                setAds(response.data);
            } catch (error) {
                console.error('İlanlar alınırken bir hata oluştu:', error);
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
            formDataToSend.append(key, formData[key]);
        });

        try {
            await axios.post('https://api.example.com/advertisements', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('İlan başarıyla oluşturuldu!');
            setShowModal(false);
            const response = await axios.get('https://api.example.com/advertisements');
            setAds(response.data);
        } catch (error) {
            console.error('Bir hata oluştu:', error);
            alert('İlan oluşturulurken bir hata oluştu.');
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
            {/* Sidebar */}
            <Sidebar isSidebarOpen={isSidebarOpen} />

            {/* Main Content */}
            <div
                className={`flex-1 flex flex-col bg-gray-100 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-64' : 'translate-x-0'}`}
                onClick={handleContentClick}
            >
                {/* Navbar */}
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

                    {/* Popup Modal */}
                    <Modal
                        showModal={showModal}
                        setShowModal={setShowModal}
                        handleSubmit={handleSubmit}
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />

                    {/* Advertisement Cards */}
                    <div className="flex overflow-x-auto space-x-4 py-4">
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
