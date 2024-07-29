import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Link bileşenini buradan import edin
import axios from 'axios';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // API isteği gönder
            const response = await axios.post('https://api.example.com/login', { email, password });
            if (response.status === 200) {
                // Başarılı girişte yönlendir
                navigate('/main');
            }
        } catch (error) {
            navigate('/main');
            console.error('Giriş başarısız:', error);
            alert('Giriş yaparken bir hata oluştu.');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 mt-10 shadow-md rounded">
            <h2 className="text-2xl mb-4 font-bold text-gray-800">GetHired - Employer</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded shadow-lg hover:bg-blue-600 transition"
                    >
                        Login
                    </button>
                </div>
            </form>
            <div className="mt-4 text-center">
                <p className="text-gray-700">
                    Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
