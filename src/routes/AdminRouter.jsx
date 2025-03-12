// src/routes/AdminRouter.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import AdminProducts from '../pages/Admin/AdminProductPage';
import Dashboard from '../pages/Admin/AdminDashboardPage';
import AdminCategoryPage from '../pages/Admin/AdminCategoryPage';
import AdminBrandPage from '../pages/Admin/AdminBrandPage';
import AdminSparepartsPage from '../pages/Admin/AdminSparepartsPage';
import AdminSparepartsProductPage from '../pages/Admin/AdminSparepartsProductPage';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = Boolean(localStorage.getItem('accessToken'));
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AdminRouter = () => {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />{' '}
        {/* Trang chính khi vào /admin */}
        {/* Thêm các route admin khác nếu cần */}
        <Route path="san-pham" element={<AdminProducts />} />
        <Route path="danh-muc" element={<AdminCategoryPage />} />
        <Route path="thuong-hieu" element={<AdminBrandPage />} />
        <Route path="phu-tung" element={<AdminSparepartsPage />} />
        <Route path="phu-tung-sp" element={<AdminSparepartsProductPage />} />
      </Route>
    </Routes>
  );
};

export default AdminRouter;
