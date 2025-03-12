import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.jpg';

const NavbarAdmin = () => {
  const navigate = useNavigate();

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    // Xóa thông tin đăng nhập từ localStorage
    localStorage.removeItem('accessToken'); // Xóa token (tên key tùy ứng dụng của bạn)
    localStorage.removeItem('refreshToken'); // Xóa refresh token nếu có
    // Bạn có thể xóa thêm các key khác nếu cần

    // Chuyển hướng đến trang đăng nhập
    navigate('/login');
  };

  return (
    <nav className="navbar bg-base-100 fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl" href="/admin">
          <img src={Logo} alt="Admin Logo" className="h-10 mr-2" />
          Admin Dashboard
        </a>
      </div>
      <div className="flex-none gap-2">
        <button onClick={handleLogout} className="btn btn-error">
          Đăng xuất
        </button>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
