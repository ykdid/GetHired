    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import Sidebar from '../components/Sidebar';
    import Navbar from '../components/Navbar';
    import ModalAd from '../components/ModalAd';
    import AdvertisementCard from '../components/AdvertisementCard';
    import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
    import UpdateAdModal from '../components/UpdateModalAd';
    import ScrollToTop from '../components/ScrollToTop';
    import Loading from '../components/Loading';
    import CustomToastContainer from '../components/CustomToastContainer';
    import { toast } from 'react-toastify';
  

    const MainPage = () => {
        const date = new Date();
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        const [loading , setloading] = useState(true);
        const [ads, setAds] = useState([]);
        const [showModal, setShowModal] = useState(false);
        const [formData, setFormData] = useState({
            title: '',
            description: '',
            initDate: formattedDate,
            expireDate: '',
            htmlContent: '',
            jobType: ''
        });
        const [isSidebarOpen, setIsSidebarOpen] = useState(false);
        const [selectedAd, setSelectedAd] = useState(null);
        const [showConfirmDelete, setShowConfirmDelete] = useState(false);
        const [showUpdateModal, setShowUpdateModal] = useState(false);

        useEffect(() => {
            const fetchAds = async () => {
               setloading(true);
                try {
                    const employerId = localStorage.getItem('employerId'); 
                    const token = sessionStorage.getItem('token');
                    if (!token && employerId) {
                        throw new Error('Employer ID not found in localStorage or token not found in sessionStorage');
                    }
                    const response = await axios.get(`https://localhost:7053/api/JobAdvertisement/getJobAdvertisementsByEmployer/${employerId}`,{
                        headers:{
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setAds(Array.isArray(response.data) ? response.data : []);
                } catch (error) {
                    console.error('An error occurred while getting advertisements:', error);
                }
                finally{
                    setloading(false);
                }
            };

            fetchAds();
        }, []);

        if (loading) {
            return <Loading />;
        }

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
        
            const employerId = localStorage.getItem('employerId');
            if (!employerId) {
                console.error('Employer ID not found in localStorage');
                return;
            }
        
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                if (key === 'initDate' || key === 'expireDate') {
                    if (formData[key]) {
                        formDataToSend.append(key, new Date(formData[key]).toISOString());
                    }
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            });
        
            formDataToSend.append('employerId', employerId);
        
            try {
                const token = sessionStorage.getItem('token');
                await axios.post('https://localhost:7053/api/JobAdvertisement/addJobAdvertisement', formDataToSend, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                toast.success('Advertisement created successfully!');
                setShowModal(false);
                const response = await axios.get(`https://localhost:7053/api/JobAdvertisement/getJobAdvertisementsByEmployer/${employerId}`,{
                    headers : {
                        'Authorization':`Bearer ${token}`
                    }
                });
                setAds(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('An error occurred while creating advertisement:', error);
                toast.error('An error occurred while creating advertisement.');
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

        const handleDeleteClick = (ad) => {
            setSelectedAd(ad);
            setShowConfirmDelete(true);
            console.log('Selected ad:', ad);
        };

        const handleUpdateClick = (ad) => {
            setSelectedAd(ad);
            setFormData({
                title: ad.title,
                description: ad.description,
                expireDate: ad.expireDate,
                imagePath: ad.imagePath,
                jobType: ad.jobType
            });
            setShowUpdateModal(true);
        };
    
        
        return (
            <div className="min-h-screen bg-gray-100 flex">
                <Sidebar isSidebarOpen={isSidebarOpen} />
                <div
                    className={`flex-1 flex flex-col bg-gray-100 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-64' : 'translate-x-0'}`}
                    onClick={handleContentClick}
                >
                    <Navbar isSidebarOpen={isSidebarOpen} handleSidebarToggle={handleSidebarToggle} />
                    <div className="p-6 flex-1 relative" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-center mb-6">
                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-blue-500 text-white p-2 rounded shadow-lg hover:bg-blue-600 transition"
                            >
                                Create New Advertisement
                            </button>
                        </div>
                        <ModalAd
                            showModal={showModal}
                            setShowModal={setShowModal}
                            handleSubmit={handleSubmit}
                            formData={formData}
                            handleInputChange={handleInputChange}
                        />
                        <div className="flex flex-col items-center space-y-4 py-4 w-full">
                        <div className="flex justify-center mb-6">
                            {Array.isArray(ads) && ads.length > 0 && (
                                <h1 className="text-3xl font-extrabold text-gray-900 bg-gradient-to-r from-blue-500 to-teal-500 text-transparent bg-clip-text">
                                    My JobList
                                </h1>
                            )}
                        </div>
                            {Array.isArray(ads) && ads.length > 0 ? (
                            ads.map((ad) => (
                                <AdvertisementCard
                                    key={ad.id}
                                    ad={ad}
                                    onUpdate={() => {
                                        const fetchAds = async () => {
                                            try {
                                                const token = sessionStorage.getItem('token');
                                                const employerId = localStorage.getItem('employerId');
                                                if (!employerId) {
                                                    throw new Error('Employer ID not found in localStorage');
                                                }

                                                const response = await axios.get(`https://localhost:7053/api/JobAdvertisement/getJobAdvertisementsByEmployer/${employerId}`, {
                                                    headers: {
                                                        'Authorization': `Bearer ${token}`
                                                    }
                                                });

                                                setAds(Array.isArray(response.data) ? response.data : []);
                                            } catch (error) {
                                                console.error('An error occurred while getting advertisements:', error);
                                            }
                                        };

                                        fetchAds();
                                    }}
                                    onEdit={handleUpdateClick}
                                    onDelete={handleDeleteClick}
                                />
                            ))
                        ) : (

                            <p>Create an advertisement and find your employees!</p>
                        )}
                        </div>
                    </div>
                </div>
                <ScrollToTop />
                {showUpdateModal && (
                    <UpdateAdModal
                        showModal={showUpdateModal}
                        setShowModal={setShowUpdateModal}
                        handleSubmit={handleSubmit}
                        formData={formData}
                        handleInputChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    />
                )}
                {showConfirmDelete && (
                    <ConfirmDeleteModal
                        show={showConfirmDelete}
                        onClose={() => setShowConfirmDelete(false)}
                        onConfirm={async () => {
                            if (selectedAd) {
                                try {
                                    const token = sessionStorage.getItem('token');               
                                    await axios.delete(`https://localhost:7053/api/JobAdvertisement/deleteAdvertisement/${selectedAd.id}`,{
                                        headers : {
                                            'Authorization':`Bearer ${token}`
                                        }
                                    });
                                    toast.success('Advertisement deleted successfully!');
                                    const employerId = localStorage.getItem('employerId');
                                    const response = await axios.get(`https://localhost:7053/api/JobAdvertisement/getJobAdvertisementsByEmployer/${employerId}`,{
                                        headers :{
                                            'Authorization':`Bearer ${token}`
                                        }
                                    });
                                    setAds(Array.isArray(response.data) ? response.data : []);
                                } catch (error) {
                                    console.error('An error occurred while deleting advertisement:', error);
                                    toast.error('An error occurred while deleting advertisement.');
                                    
                                    
                                } finally {
                                    setShowConfirmDelete(false);
                                    console.log(selectedAd.id);
                                    
                                }
                            }
                        }}
                    />
                )}
                <CustomToastContainer />
            </div>
        );
    };

    export default MainPage;
