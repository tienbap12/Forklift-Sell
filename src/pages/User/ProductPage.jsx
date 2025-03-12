import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../../features/User/products/ProductList'; // Đường dẫn có thể thay đổi tùy cấu trúc thư mục
import Sidebar from '../../components/User/Sidebar';

const ProductPage = () => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Danh sách sản phẩm
      </h1>

      <div className="flex min-h-screen gap-4 w-full">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="flex-1 min-h-screen w-4/5">
          <ProductList />
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link to="/" className="bg-gray-500 text-white px-4 py-2 rounded">
          Quay về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default ProductPage;