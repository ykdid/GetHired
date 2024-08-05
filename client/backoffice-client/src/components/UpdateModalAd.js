import React from 'react';

const UpdateAdModal = ({ showModal, setShowModal, handleSubmit, formData, handleInputChange, modalPosition }) => {
    if (!showModal) return null;

    const modalStyle = modalPosition
        ? {
              top: modalPosition.top,
              left: modalPosition.left,
              transform: 'translate(-50%, -50%)',
              zIndex  : 60,
          }
        : {};   

    return (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center ">
            <div className="bg-white p-6 rounded shadow-lg relative z-60" style={modalStyle}>
                <h2 className="text-2xl mb-4 font-bold text-gray-800">Edit Advertisement</h2>
                <form onSubmit={handleSubmit}>
                    <div className="">
                        <label className="block text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Expire Date</label>
                        <input
                            type="date"
                            name="expireDate"
                            value={formData.expireDate}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Image Path</label>
                        <input
                            type="file"
                            name="imagePath"
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-">
                        <label className="block text-gray-700">Job Type</label>
                        <input
                            type="text"
                            name="jobType"
                            value={formData.jobType}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="mr-4 bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateAdModal;
