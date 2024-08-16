import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import './style/index.css'; 
import ProfilePage from './pages/ProfilePage';
import MyStaffPage from './pages/MyStaffPage';
import ApplicationsPage from './pages/ApplicationsPage';
import { AuthProvider } from './contexts/AuthContext';
import CustomToastContainer from './components/CustomToastContainer';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">   
            <Routes> 
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/main" element={<MainPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/mystaff" element={<MyStaffPage />} />
              <Route path="/applications/:advertisementId" element={<ApplicationsPage />} />
              <Route path="/" element={<Navigate to="/login" />} /> 
            </Routes> 
            <CustomToastContainer /> 
        </div>
      </AuthProvider> 
    </Router>
  );
}

export default App;
