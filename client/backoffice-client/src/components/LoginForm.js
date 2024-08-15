import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 
import Loading from './Loading';
import CustomToastContainer from './CustomToastContainer';
import { toast } from 'react-toastify';


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);

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
                    sessionStorage.setItem('token',token)
                    navigate('/main');  
                } else {
                    console.error('Employer ID not found in token.');
                }
            }
        } catch (error) {
            console.error('Login failed:', error);
            toast.error('Invalid email or password.');
        }
        finally{
            setLoading(false);
        }
    };

    if(loading){
      return <Loading />
    }

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
            <CustomToastContainer/>
        </div>
    );
};

export default LoginForm;
