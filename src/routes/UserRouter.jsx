// src/routes/UserRouter.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserLayout from '../layouts/UserLayout';
import Homepage from '../pages/User/Homepage';
import ProductPage from '../pages/User/ProductPage';
import AboutPage from '../pages/User/AboutPage';
import ContactPage from '../pages/User/ContactPage';
import ProductDetailPage from '../pages/User/ProductDetailPage';
import SparePartProductDetailPage from '../pages/User/SparePartProductDetailPage';

const UserRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Homepage />} />
        <Route path="san-pham" element={<ProductPage />} />
        <Route path="gioi-thieu" element={<AboutPage />} />
        <Route path="lien-he" element={<ContactPage />} />
        <Route path="san-pham/:productId" element={<ProductDetailPage />} />
        <Route
          path="phu-tung/:sparePartId"
          element={<SparePartProductDetailPage />}
        />
      </Route>
    </Routes>
  );
};

export default UserRouter;
