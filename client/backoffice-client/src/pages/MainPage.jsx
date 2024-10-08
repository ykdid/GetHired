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
        const [errors, setErrors] = useState({});
        const [formData, setFormData] = useState({
            title: '',
            description: '',
            initDate: formattedDate,
            expireDate: '',
            employmentType: ''
        }); 
        const [isSidebarOpen, setIsSidebarOpen] = useState(false);
        const [selectedAd, setSelectedAd] = useState(null);
        const [showConfirmDelete, setShowConfirmDelete] = useState(false);
        const [showUpdateModal, setShowUpdateModal] = useState(false);
        

        const handleCreateClick = () => {
            setFormData({
                title: '',
                description: '',
                initDate: formattedDate,
                expireDate: '',
                employmentType: ''
            });
            setTimeout(() => setShowModal(true), 0);
        };
        

        useEffect(() => {
            const fetchAds = async () => {
               setloading(true);
                try {
                    const employerId = localStorage.getItem('employerId'); 
                    const token = sessionStorage.getItem('token');
                    if (!token && employerId) {
                        throw new Error('Employer ID not found in localStorage or token not found in sessionStorage');
                    }
                    const response = await axios.get(`http://localhost:7053/api/JobAdvertisement/getJobAdvertisementsByEmployer/${employerId}`,{
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
            } else if (name === 'employmentType') {
                setFormData({ ...formData, [name]: parseInt(value, 10) });
            } else {
                setFormData({ ...formData, [name]: value });
            }
        };

        const validateForm = (formData) => {
            const errors = {};
        
            if (!formData.title) {
                errors.title = 'Title is required.';
            }else if (formData.title.length < 10 || formData.title.length >40) {
                errors.title = 'Title should be greater than 10 and smaller than 40 characters.';
            }
        
            if (!formData.description) {
                errors.description = 'Description is required.';
            } else if (formData.description.length < 20) {
                errors.description = 'Description should be greater than 20 characters.';
            }
        
            if (!formData.expireDate) {
                errors.expireDate = 'Expire date is required.';
            } else if (new Date(formData.initDate) > new Date(formData.expireDate)) {
                errors.expireDate = 'Expire date must be after the initial date.';
            }
        
            return errors;
        };
        

        const handleSubmit = async (event) => {
            event.preventDefault();

            const errors = validateForm(formData);
            if (Object.keys(errors).length > 0) {
                setErrors(errors);
                return;
            }
        
            const employerId = localStorage.getItem('employerId');
            if (!employerId) {
                console.error('Employer ID not found in localStorage');
                return;
            }
        
           
            const adData = {
                title: formData.title,
                description: formData.description,
                initDate: formData.initDate ? new Date(formData.initDate).toISOString() : null,
                expireDate: formData.expireDate ? new Date(formData.expireDate).toISOString() : null,
                employerId: parseInt(employerId, 10), // Convert employerId to integer
                employmentType: parseInt(formData.employmentType, 10) // Convert employmentType to integer
            };
        
            try {
                const employerId = localStorage.getItem('employerId');
                const token = sessionStorage.getItem('token');
                await axios.post('http://localhost:7053/api/JobAdvertisement/addJobAdvertisement', adData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json', // Ensure JSON is being sent
                    },
                });
                toast.success('Advertisement created successfully!');
                setShowModal(false);
        
                const response = await axios.get(`http://localhost:7053/api/JobAdvertisement/getJobAdvertisementsByEmployer/${employerId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
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
                employmentType: ad.employmentType
            });
            setShowUpdateModal(true);
        };
        
    
        
        return (
            <div className="min-h-screen bg-gray-100 flex">
                <Sidebar isSidebarOpen={isSidebarOpen} />
                <div
                    className={`flex-1 flex flex-col bg-gray-50 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-64' : 'translate-x-0'}`}
                    onClick={handleContentClick}
                >
                    <Navbar isSidebarOpen={isSidebarOpen} handleSidebarToggle={handleSidebarToggle} />
                    <div className="p-6 flex-1" >
                        <div className="flex justify-center mb-6">
                            <button
                                onClick={handleCreateClick}
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
                            errors={errors}
                            
                        />
                        <div className="flex flex-col items-center py-4 w-full">
                        <div className="flex justify-center mb-4">
                            {Array.isArray(ads) && ads.length > 0 && (
                                <h1 className="text-3xl font-extrabold text-gray-900 bg-gradient-to-r from-blue-500 to-teal-500 text-transparent bg-clip-text">
                                    My Job List
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

                                                const response = await axios.get(`http://localhost:7053/api/JobAdvertisement/getJobAdvertisementsByEmployer/${employerId}`, {
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

                        <div className="text-center text-gray-500">
                            Create an advertisement and find your employees!
                        </div>
                            
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
                        errors = {errors}
                        
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
                                    await axios.delete(`http://localhost:7053/api/JobAdvertisement/deleteAdvertisement/${selectedAd.id}`,{
                                        headers : {
                                            'Authorization':`Bearer ${token}`
                                        }
                                    });
                                    toast.success('Advertisement deleted successfully!');
                                    const employerId = localStorage.getItem('employerId');
                                    const response = await axios.get(`http://localhost:7053/api/JobAdvertisement/getJobAdvertisementsByEmployer/${employerId}`,{
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
