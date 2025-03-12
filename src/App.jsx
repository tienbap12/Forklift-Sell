// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminRouter from './routes/AdminRouter';
import UserRouter from './routes/UserRouter';
import AdminAuth from './pages/Admin/AdminAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <Router>
      <Routes>
        {/* Route công khai cho đăng nhập và đăng ký */}
        <Route path="/login" element={<AdminAuth />} />
        <Route path="/register" element={<AdminAuth />} />

        {/* Route cho admin */}
        <Route path="/admin/*" element={<AdminRouter />} />
        {/* Các route user */}
        <Route path="/*" element={<UserRouter />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
