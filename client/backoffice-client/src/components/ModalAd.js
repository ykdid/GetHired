import React from 'react';
import 'react-quill/dist/quill.snow.css'; 
import ReactQuill from 'react-quill';


const modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['bold', 'italic', 'underline'],
        ['link'],
        [{ 'color': [] }],
        ['clean']
    ],
};

const formats = [
    'header', 'font', 'list', 'bullet', 'bold', 'italic', 'underline',
    'link','color'
];  

const ModalAd = ({ showModal, setShowModal, handleSubmit, formData, handleInputChange,errors }) => {
 
    if (!showModal) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50">
            <div className="absolute top-40 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded shadow-lg w-1/2 z-60">
                <h2 className="text-2xl mb-2 font-bold text-gray-800">Create New Advertisement</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Title</label>
                        <input
                            type="text" 
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                    </div>
                    <div className="mb-4">
                        
                        <label className="block text-lg font-semibold text-gray-700 ">Description</label>
                        {errors.description && <p className="text-red-500 text-xs mb-1">{errors.description}</p>}
                        <ReactQuill
                            name="description"
                            value={formData.description}
                            onChange={(value) => handleInputChange({ target: { name: 'description', value } })}
                            modules={modules}
                            formats={formats}
                            className="h-64"
                            required
                        />
                        
                    </div>
                    <div className="mb-4 mt-16">
                        <label className="block text-gray-700 ">Expire Date</label>
                        <input
                            type="date"
                            name="expireDate"
                            value={formData.expireDate}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        {errors.expireDate && <p className="text-red-500 text-xs mt-1">{errors.expireDate}</p>}
                    </div>
                    <div className="mb-4">
                    <label className="block text-gray-700">Employment Type</label>
                    <select
                        name="employmentType"
                        value={formData.employmentType}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition "
                        required
                    >
                        <option value="">Select</option>
                        <option value="0">Full Time</option>
                        <option value="1">Part Time</option>
                        <option value="2">Internship</option>
                    </select>
                    {errors.employmentType && (
                            <p className="text-red-500 text-xs mt-1">{errors.employmentType}</p>
                        )}
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
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalAd;