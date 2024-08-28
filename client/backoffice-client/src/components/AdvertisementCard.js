import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTrash, FaEdit } from 'react-icons/fa';   
import ConfirmDeleteModal from './ConfirmDeleteModal'; 
import UpdateAdModal from './UpdateModalAd';
import { toast } from 'react-toastify';

const AdvertisementCard = ({ ad, onUpdate, isModalOpen }) => {
    const navigate = useNavigate();
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [formData, setFormData] = useState({
        title: ad.title,
        description: ad.description,
        initDate: ad.initDate, 
        expireDate: ad.expireDate ? ad.expireDate.split('T')[0] : '',    
        employmentType: ad.employmentType
    });

    const handleShowApplications = () => {
        navigate(`/applications/${ad.id}`);
    };

    const handleDelete = async () => {
        try {
            const token = sessionStorage.getItem('token');
            await axios.delete(`https://localhost:7053/api/JobAdvertisement/deleteAdvertisement/${ad.id}`,{
                headers:{
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
        
        <div key={ad.id} className={` bg-white shadow-md p-4 rounded-lg w-[700px] h-[350px] flex flex-col justify-between relative ${isModalOpen ? 'opacity-50' : ''}`} >
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
                <p className="text-gray-700 mb-2">{ad.description}</p>
                <p className="text-gray-700 mb-2">{ad.jobType}</p>  
                
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
                {new Date(formData.initDate).toLocaleDateString()}  - {new Date(ad.expireDate).toLocaleDateString()}
            </p>    
            <UpdateAdModal
                showModal={showUpdateModal}
                setShowModal={setShowUpdateModal}
                handleSubmit={handleUpdate}
                formData={formData}
                handleInputChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
            />
            <ConfirmDeleteModal
                show={showConfirmDelete}
                onClose={() => setShowConfirmDelete(false)}
                onConfirm={handleDelete}
            />
        </div>
       
    );
};

export default AdvertisementCard;
