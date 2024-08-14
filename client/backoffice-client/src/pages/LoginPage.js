import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import Loading from '../components/Loading';


const LoginPage = () => {

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <LoginForm />
        </div>
    );
};

export default LoginPage;
