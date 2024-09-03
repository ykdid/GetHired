import React from 'react';

const ConfirmDeleteModal = ({ show, onClose, onConfirm }) => {
    if (!show) return null;

    return (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-1/3 relative z-60">
                <h2 className="text-xl mb-4 font-bold text-gray-800">Are you sure?</h2>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="mr-4 bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;
