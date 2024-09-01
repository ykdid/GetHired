import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import '../style/PasswordChangeModal.scss'; 

const PasswordChangeModal = ({ closeModal }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = (type) => {
        if (type === 'current') setShowCurrentPassword(!showCurrentPassword);
        if (type === 'new') setShowNewPassword(!showNewPassword);
        if (type === 'confirm') setShowConfirmPassword(!showConfirmPassword);
    };

    const handlePasswordChange = async () => {
        if (newPassword !== confirmPassword) {
            toast.error('New passwords do not match.');
            return;
        }
    
        setLoading(true);
        try {
            const token = sessionStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            if (!token || !userId) {
                throw new Error('Token or User ID not found.');
            }

            const passwordChangeModel = {
                currentPassword: currentPassword,
                newPassword: newPassword,
            };

            await axios.patch(`https://localhost:7053/api/User/changePassword/${userId}`, passwordChangeModel, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            toast.success('Password changed successfully.You will be redirected to the login page!',{
                autoClose:2000,
                position: "top-center"
            });
            closeModal();
            setTimeout(()=>{
                navigate('/login');  
            },3000);

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
                <div className="mb-4 password-input">
                    <label className="block text-gray-700">Current Password</label>
                    <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        required
                    />
                    <span 
                        className="eye-icon" 
                        onClick={() => togglePasswordVisibility('current')}
                    >
                        {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <div className="mb-4 password-input">
                    <label className="block text-gray-700">New Password</label>
                    <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        required
                    />
                    <span 
                        className="eye-icon" 
                        onClick={() => togglePasswordVisibility('new')}
                    >
                        {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <div className="mb-4 password-input">
                    <label className="block text-gray-700">Confirm New Password</label>
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        required
                    />
                    <span 
                        className="eye-icon" 
                        onClick={() => togglePasswordVisibility('confirm')}
                    >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
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
                        className="bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-700 transition duration-200"
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
