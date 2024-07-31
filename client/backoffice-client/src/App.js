import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import './index.css'; 
import ProfilePage from './pages/ProfilePage';
import MyStaffPage from './pages/MyStaffPage';
import ApplicationsPage from './pages/ApplicationsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>  
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/mystaff" element={<MyStaffPage />} />
          <Route path="/applications/:advertisementId" element={<ApplicationsPage />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
