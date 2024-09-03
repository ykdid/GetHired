import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTrash, FaEdit } from 'react-icons/fa';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import UpdateAdModal from './UpdateModalAd';
import { toast } from 'react-toastify';
import '../style/AdvertisementCard.scss';

const AdvertisementCard = ({ ad, onUpdate, isModalOpen }) => {
    const navigate = useNavigate();
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        title: ad.title,
        description: ad.description,
        initDate: ad.initDate,
        expireDate: ad.expireDate ? ad.expireDate.split('T')[0] : '',
        employmentType: ad.employmentType
    });

    const validateForm = (formData) => {
        const errors = {};
    
        if (!formData.title) {
            errors.title = 'Title is required.';
        } else if (formData.title.length < 10 || formData.title.length > 40) {
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
    const employmentTypeLabels = {
        'FullTime': 'Full Time',
        'PartTime': 'Part Time',
        'Intern': 'Internship'
    };

    const handleShowApplications = () => {
        navigate(`/applications/${ad.id}`);
    };

    const handleDelete = async () => {
        try {
            const token = sessionStorage.getItem('token');
            await axios.delete(`https://localhost:7053/api/JobAdvertisement/deleteAdvertisement/${ad.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            toast.success('Advertisement deleted successfully');
            onUpdate();
        } catch (error) {
            console.error('An error occurred while deleting advertisement:', error);
            toast.error('An error occurred while deleting advertisement.');
        } finally {
            setShowConfirmDelete(false);
        }
    };

    const handleUpdate = async (event) => {
        event.preventDefault();

        const errors = validateForm(formData);
            if (Object.keys(errors).length > 0) {
                setErrors(errors);
                return;
            }

        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });

        formDataToSend.set('imagePath', formData.imagePath);
        try {
            const token = sessionStorage.getItem('token');
            await axios.patch(`https://localhost:7053/api/JobAdvertisement/updateAdvertisement/${ad.id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            toast.success('Advertisement updated successfully!');
            onUpdate();
        } catch (error) {
            console.error('An error occurred while updating advertisement:', error);
            toast.error('An error occurred while updating advertisement.');
        } finally {
            setShowUpdateModal(false);
        }
    };

    return (

        <>
        <div key={ad.id} className={`advertisement-card bg-white shadow-md p-4 rounded-lg w-[700px] h-[400px] flex flex-col justify-between relative mb-10   ${isModalOpen ? 'opacity-50' : ''}`} >
            <div className="absolute top-2 right-2 flex space-x-2">
                <button
                    onClick={() => setShowUpdateModal(true)}
                    className={`text-blue-500 hover:text-blue-700 ${isModalOpen ? 'cursor-not-allowed' : ''}`}
                    disabled={isModalOpen}
                >
                    <FaEdit size={20} />
                </button>
                <button
                    onClick={() => setShowConfirmDelete(true)}
                    className={`text-red-500 hover:text-red-700 ${isModalOpen ? 'cursor-not-allowed' : ''}`}
                    disabled={isModalOpen}
                >
                    <FaTrash size={20} />
                </button>
            </div>

            <div>
                <h3 className="text-lg font-bold mb-2">{ad.title}</h3>
                <p className="text-gray-700 mb-2">Type: {employmentTypeLabels[ad.employmentType]}</p>
                <div className="description text-gray-900 mb-2" dangerouslySetInnerHTML={{ __html: ad.description }}></div>
                {ad.imagePath && (
                    <img
                        src={ad.imagePath}
                        alt={ad.title}
                        className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                )}
            </div>
            <div className="flex justify-end mt-4">
                <button
                    className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 px-4 rounded"
                    onClick={handleShowApplications}
                >
                    Show Applications
                </button>
            </div>
            <p className="absolute bottom-2 left-2 text-gray-500 text-sm p-2">
                {new Date(formData.initDate).toLocaleDateString()} - {new Date(ad.expireDate).toLocaleDateString()}
            </p> 

            <ConfirmDeleteModal
                show={showConfirmDelete}
                onClose={() => setShowConfirmDelete(false)}
                onConfirm={handleDelete}
            />
        </div>
        {
            showUpdateModal && (
                <div className='absolute top-0 p-0 flex flex-col justify-start items-center h-full w-full z-50 bg-black bg-opacity-50'>
                    <UpdateAdModal
                            showModal={showUpdateModal}
                            setShowModal={setShowUpdateModal}
                            handleSubmit={handleUpdate}
                            formData={formData}
                            handleInputChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            errors = {errors}
                        />
                </div>
            )
        }
       
       
        </>
    );
};

export default AdvertisementCard;
