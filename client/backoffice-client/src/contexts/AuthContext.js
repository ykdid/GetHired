import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode }  from 'jwt-decode';  

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ token: null, employerId: null });
    
    const navigate = useNavigate();

    useEffect(() => {
        const checkTokenExpiry = () => {
            const token = sessionStorage.getItem('token');
            const currentPath = window.location.pathname;
            if (token) {
                const decodedToken = jwtDecode(token);
                const expiryTime = decodedToken.exp * 1000; 
                if (Date.now() >= expiryTime) {
                    sessionStorage.removeItem('token');
                    localStorage.removeItem('employerId');
                    if(currentPath !== '/register'){
                        alert('Session has expired. You are directed to the login page.');
                        navigate('/login');
                    }
                   
                } else {
                    setAuth({ token, employerId: decodedToken.employerId }); 
                }
            } else {
                if(currentPath !== '/register'){
                    navigate('/login');
                }              
            }
        };

        checkTokenExpiry();
        const interval = setInterval(checkTokenExpiry, 60000); 

        return () => clearInterval(interval); 
    }, [navigate]); 

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
