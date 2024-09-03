import React from 'react';
import '../style/AdvertisementCard.scss';
import defaultAvatar from '../assets/default-avatar.jpg';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';

const employmentTypeLabels = {
    FullTime: 'Full Time',
    PartTime: 'Part Time',
    Intern: 'Internship',
};

const AdvertisementCard = ({ ad, employer }) => {
    const [isApplied, setIsApplied] = useState(false);
    const handleApplyJob = async () => {
        try {
            const token = sessionStorage.getItem('token'); 
            const userId = localStorage.getItem('userId'); 
            
            if (!token || !userId) {
                throw new Error('User is not authenticated.');
            }

            await axios.post(
                'https://localhost:7053/api/JobApplication/applyJob',
                {
                    userId: parseInt(userId, 10),
                    jobAdvertisementId: ad.id,
                    employerId: employer.id,
                    status: 0
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            setIsApplied(true);
            toast.success('Application submitted successfully!');
        } catch (error) {
            console.error('An error occurred while applying for the job:', error);
            alert('Failed to submit application. Please try again.');
        }
    };
    
    return (
        <div className="advertisement-card bg-white shadow-md p-4 rounded-lg w-[700px] h-[400px] flex flex-col justify-between relative mb-10">
            <div className="absolute top-2 right-2 flex items-center space-x-4">
                {employer && (
                    <>
                        <img
                            src={employer.employerImagePath ||defaultAvatar }
                            alt={`${employer.name} ${employer.surname}`}
                            className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                        />
                        <div>
                            <p className="font-bold">{employer.name} {employer.surname}</p>
                            <p className="text-gray-600">{employer.email}</p>
                            <p className="text-gray-600">{employer.companyName}</p>
                        </div>
                    </>
                )}
            </div>
            <div>
                <h3 className="text-lg font-bold mb-2">{ad.title}</h3>
                <p className="text-gray-700 mb-2">Type: {employmentTypeLabels[ad.employmentType]}</p>
                <div className="description text-gray-900 mb-2" dangerouslySetInnerHTML={{ __html: ad.description }}></div>
            </div>
            <p className="absolute bottom-2 right-2 text-gray-500 text-sm p-2">
                {new Date(ad.initDate).toLocaleDateString()} - {new Date(ad.expireDate).toLocaleDateString()}
            </p>
            <div className="flex justify-center mt-4">
                <button
                    className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 px-4 rounded"
                    onClick={handleApplyJob}
                    disabled={isApplied}
                >
                    {isApplied ? 'Applied' : 'Apply To Job'}
                </button>
            </div>
        </div>
        
       
        
    );
};

export default AdvertisementCard;
