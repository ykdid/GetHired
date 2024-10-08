import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode }  from 'jwt-decode';
import CustomToastContainer from '../components/CustomToastContainer';
import { toast } from 'react-toastify';
  

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ token: null, employerId: null });
    const [sessionExpired, setSessionExpired] = useState(false);
    
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
                    setSessionExpired(true); 
                    if(currentPath !== '/register'){
                        toast.error(
                            <div>
                                <p>Session has expired. You are directed to the login page.</p>
                                <button
                                      onClick={() => {
                                        setSessionExpired(false); 
                                        navigate('/login');
                                    }}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                >
                                    OK
                                </button>
                            </div>,
                            {
                                autoClose: false,
                                closeButton: false,
                                position:"top-center"
                            }
                        );
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

    const currentPath = window.location.pathname;
    const showSessionExpired = sessionExpired && currentPath !== '/login' && currentPath !== '/' && currentPath!== '/register' ;

    return (
        <AuthContext.Provider value={auth}>
            {showSessionExpired && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex justify-center items-center">
                    <p className="text-white">Session expired. Click OK to login again.</p>
                </div>
            )}
            <div className={`${showSessionExpired ? 'pointer-events-none' : ''}`}>
                {children}
            </div>
            <CustomToastContainer />    
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
