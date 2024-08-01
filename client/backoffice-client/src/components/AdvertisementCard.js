import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdvertisementCard = ({ ad }) => {
    const navigate = useNavigate();

    const handleShowApplications = () => {
        navigate(`/applications/${ad.id}`);
    };

    return (
        <div key={ad.id} className="bg-white shadow-md p-4 rounded-lg w-[700px]">
            <h3 className="text-lg font-bold mb-2">{ad.title}</h3>
            <p className="text-gray-700 mb-2">{ad.description}</p>
            <p className="text-gray-700 mb-2">{ad.jobType}</p>  
            <p className="text-gray-500 mb-2">
                {new Date(ad.initDate).toLocaleDateString()} - {new Date(ad.expireDate).toLocaleDateString()}
            </p>
            {ad.imagePath && (
                <img
                    src={ad.imagePath}
                    alt={ad.title}
                    className="w-full h-32 object-cover rounded-lg mb-2"
                />  
            )}
            <div className="flex justify-end mt-4">
                <button
                    className="bg-green-500 text-white py-2 px-4 rounded"
                    onClick={handleShowApplications}
                >
                    Show Applications
                </button>
            </div>
        </div>
    );
};

export default AdvertisementCard;
