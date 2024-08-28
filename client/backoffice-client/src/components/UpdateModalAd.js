import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill'in varsayılan stilleri

const UpdateAdModal = ({ showModal, setShowModal, handleSubmit, formData, handleInputChange }) => {
    if (!showModal) return null;

    const employmentTypes = [
        { value: 'FullTime', label: 'Full Time' },
        { value: 'PartTime', label: 'Part Time' },
        { value: 'Intern', label: 'Internship' },
    ];

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

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Edit Advertisement</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-lg font-semibold text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-semibold text-gray-700">Description</label>
                        <ReactQuill
                            name="description"
                            value={formData.description}
                            onChange={(value) => handleInputChange({ target: { name: 'description', value } })}
                            modules={modules}
                            formats={formats}
                            className="h-64"
                        />
                    </div>
                    <div className="mb-4 mt-20">
                        <label className="block text-lg font-semibold text-gray-700">Expire Date</label>
                        <input
                            type="date"
                            name="expireDate"
                            value={formData.expireDate}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-lg font-semibold text-gray-700">Employment Type</label>
                        <select
                            name="employmentType"
                            value={formData.employmentType}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        >
                            <option value="" disabled>Select Employment Type</option>
                            {employmentTypes.map(type => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200 ease-in-out"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out"
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
