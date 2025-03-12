// src/layouts/UserLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/User/Header';
import Footer from '../components/User/Footer';

const UserLayout = () => {
  return (
    <div>
      <Header />
      <main className="my-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
