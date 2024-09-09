import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../style/RegisterForm.scss'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        age: '',
        phoneNumber: '',
        registrationNumber: '',
        identityNumber:'',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'birthdate') {
            const age = calculateAge(value);
            setFormData({
                ...formData,
                [name]: value,
                age: age
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };
    
    const calculateAge = (birthdate) => {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
    
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
    
        return age;
    };

    const validateForm = () => {
        const { name, surname, email, password,age ,identityNumber,registrationNumber,phoneNumber} = formData;
        
        if (name.length < 2) {
            toast.error('Name must be at least 2 characters.',{
                position:'top-center',
                autoClose:4000
            });
            return false;
        }

        if (surname.length <= 2) {
            toast.error('Surname must be at least 2 characters.',{
                position:'top-center',
                autoClose:4000
            });
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address.',{
                position:'top-center',
                autoClose:4000
            });
            return false;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            toast.error('Password must be at least 8 characters, including a number, a lowercase and an uppercase letter.',{
                position:'top-center',
                autoClose:4000
            });
            return false;

        }
        if(age < 18 || age > 60){
            toast.error('Age must be at between 18-60 years interval.',{
                position:'top-center',
                autoClose:4000
            });
            return false;
        }

        const identityNumberRegex = /^\d{11}$/; 
        if (!identityNumberRegex.test(identityNumber)) {
            toast.error('Identity Number must be 11 digits.', {
                position: 'top-center',
                autoClose: 4000
            });
            return false;
        }
        if(registrationNumber.length !== 20){
            toast.error('Registration Number must be 20 character.', {
                position: 'top-center',
                autoClose: 4000
            });
            return false;    
        }

        const phoneNumberRegex = /^(\+90|0)?5\d{9}$/;
        if (!phoneNumberRegex.test(phoneNumber)) {
            toast.error('Please enter a valid Turkish phone number.', {
                position: 'top-center',
                autoClose: 4000
            });
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, surname, email, password, age, phoneNumber, registrationNumber,identityNumber } = formData;
        
        if (!name || !surname || !email || !password || !age || !phoneNumber|| !registrationNumber|| !identityNumber) {
            toast.error('Please fill all the blanks.');
            return;
        }
        if (!validateForm()) {
            return;
        }

        try {
            await axios.post('http://localhost:7053/api/Auth/register/user', formData);
            toast.success('Registration completed successfully!',{
                position:"top-center",
                autoClose : 1000
            });
            setTimeout(() => {
                navigate('/login');
            }, 1500);
            
        } catch (error) {
            console.error('An error occurred while registration:', error);
            toast.error('An error occurred while registration.',{
                position:"top-center",
                autoClose : 1500
            });
        }
    };
    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };


    return (
        <div className="register-bg">
            <div className="register-container">
                <h2 className="text-2xl mb-4 font-bold text-gray-800">Register - GetHired</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Surname</label>
                        <input
                            type="text"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4 password-input-register">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                          <span 
                        className="eye-icon-register" 
                        onClick={() => togglePasswordVisibility('')}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Date of Birth</label>
                        <input
                            type="date"
                            name="birthdate"
                            value={formData.birthdate}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Registration Number</label>
                        <input
                            type="text"
                            name="registrationNumber"
                            value={formData.registrationNumber}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Identity Number</label>
                        <input
                            type="text"
                            name="identityNumber"
                            value={formData.identityNumber}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded shadow-lg hover:bg-blue-600 transition"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-gray-700">
                        Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
