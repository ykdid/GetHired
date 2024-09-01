import React from 'react';
import '../style/AdvertisementCard.scss';

const employmentTypeLabels = {
    0: 'Full Time',
    1: 'Part Time',
    2: 'Intern',
};

const AdvertisementCard = ({ ad }) => {
    return (
        <div className="advertisement-card bg-white shadow-md p-4 rounded-lg w-[700px] h-[400px] flex flex-col justify-between relative mb-10">
            <div>
                <h3 className="text-lg font-bold mb-2">{ad.title}</h3>
                <p className="text-gray-700 mb-2">Type: {employmentTypeLabels[ad.employmentType]}</p>
                <div className="description text-gray-700 mb-2" dangerouslySetInnerHTML={{ __html: ad.description }}></div>
            </div>
            <p className="absolute bottom-2 left-2 text-gray-500 text-sm p-2">
                {new Date(ad.initDate).toLocaleDateString()} - {new Date(ad.expireDate).toLocaleDateString()}
            </p>
        </div>
    );
};

export default AdvertisementCard;
