import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const PasswordChangeModal = ({ closeModal }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePasswordChange = async () => {
        if (newPassword !== confirmPassword) {
            toast.error('New passwords do not match.');
            return;
        }
    
        setLoading(true);
        try {
            const token = sessionStorage.getItem('token');
            const employerId = localStorage.getItem('employerId');
            if (!token || !employerId) {
                throw new Error('Token or Employer ID not found.');
            }

            // Backend'in beklediği veri yapısını oluşturma
            const passwordChangeModel = {
                currentPassword: currentPassword,
                newPassword: newPassword,
            };

            await axios.patch(`https://localhost:7053/api/Employer/changePassword/${employerId}`, passwordChangeModel, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            toast.success('Password changed successfully.');
            closeModal();
        } catch (error) {
            console.error('An error occurred while changing password:', error);
            toast.error('Failed to change password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Current Password</label>
                    <input
                        type="text"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">New Password</label>
                    <input
                        type="text"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Confirm New Password</label>
                    <input
                        type="text"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        required
                    />
                </div>
                <div className="flex justify-end">
                     <button
                        onClick={closeModal}
                        className="bg-gray-400 text-white py-2 px-4 rounded-lg shadow ml-4 hover:bg-gray-500 transition duration-200 mr-5"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handlePasswordChange}
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-200"
                        disabled={loading}
                    >
                        {loading ? 'Changing...' : 'Change Password'}
                    </button>
                 
                </div>
            </div>
        </div>
    );
};

export default PasswordChangeModal;
