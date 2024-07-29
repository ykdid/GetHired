import React from 'react';

const AdvertisementCard = ({ ad }) => {
    return (
        <div key={ad.id} className="w-80 bg-white shadow-md p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-2">{ad.title}</h3>
            <p className="text-gray-700 mb-2">{ad.description}</p>
            <p className="text-gray-500 mb-2">{new Date(ad.initDate).toLocaleDateString()} - {new Date(ad.expireDate).toLocaleDateString()}</p>
            {ad.imagePath && (
                <img
                    src={ad.imagePath}
                    alt={ad.title}
                    className="w-full h-32 object-cover rounded-lg mb-2"
                />
            )}
        </div>
    );
};

export default AdvertisementCard;
