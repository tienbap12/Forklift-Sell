import React from 'react';
import ProductList from '../../features/User/products/ProductList';

const ProductSection = ({ title }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-center text-red-500">{title}</h2>
      <ProductList />
    </div>
  );
};

export default ProductSection;
