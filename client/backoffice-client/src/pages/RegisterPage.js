import React from 'react';
import RegisterForm from '../components/RegisterForm';
import CustomToastContainer from '../components/CustomToastContainer';

const RegisterPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <RegisterForm />
            <CustomToastContainer />
        </div>
    );
};
export default RegisterPage;
