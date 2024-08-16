import LoginForm from '../components/LoginForm';
import React from 'react';
import CustomToastContainer from '../components/CustomToastContainer';

const LoginPage = () => {

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <LoginForm />
            <CustomToastContainer />  
        </div>
    );
};

export default LoginPage;
