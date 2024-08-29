import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 
import Loading from './Loading';
import { toast } from 'react-toastify';
import '../style/LoginForm.scss';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.post('https://localhost:7053/api/Auth/login/employer', { email, password });
            if (response.status === 200) {
                const token = response.data.token;
                const decodedToken = jwtDecode(token);
                const employerId = decodedToken.employerId;
                if (employerId && token) {
                    setLoading(true);
                    localStorage.setItem('employerId', employerId);
                    sessionStorage.setItem('token', token);
                    toast.success('Login succsessfully!',{
                        autoClose : 1000,
                        position: "top-center"
                    });
                    setTimeout(() => {
                        navigate('/main');  
                    }, 1500);
                    
                } else {
                    console.error('Employer ID not found in token.');
                }
            }
        } catch (error) {
            console.error('Login failed:', error);
            toast.error('Invalid email or password.',{
                autoClose : 1500,
                position:"top-center"
            }
            );
        } finally {
            setLoading(false);
        }
    };
    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="login-bg">
            <div className="login-container">
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
                    <div className="mb-4 password-input-login">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                            required
                        />
                         <span 
                        className="eye-icon-login" 
                        onClick={() => togglePasswordVisibility('confirm')}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
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
            
        </div>
    );
};

export default LoginForm;
