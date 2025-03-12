import React from 'react';
import Sidebar from '../../components/User/Sidebar';
import Banner from '../../components/User/Banner';
import { useGetCategoriesQuery } from '../../api/categoryApi';
import ProductItemLoader from '../../components/common/ProductItemLoader';
import ErrorMessage from '../../components/common/ErrorMessage';
import FeaturedProducts from '../../features/User/products/FeaturedProducts';

const Homepage = () => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  if (isLoading)
    return (
      <div className="grid grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <ProductItemLoader key={index} />
        ))}
      </div>
    );

  if (error) return <ErrorMessage message="Lỗi tải dữ liệu" />;
  console.log(categories);

  // Lọc các danh mục cụ thể để hiển thị (ví dụ: "Xe nâng xăng ga", "Xe điện ngồi", "Xe điện đứng")
  const selectedCategories = categories.filter((category) =>
    ['Xe nâng dầu', 'Xe nâng điện ngồi', 'Xe nâng điện đứng lái'].includes(
      category.categoryName
    )
  );
  console.log(selectedCategories);

  return (
    <div className="container mx-auto px-4">
      {/* Danh mục sản phẩm & Banner */}
      <div className="flex gap-4 mt-6">
        {/* Ẩn Sidebar khi màn hình nhỏ hơn 1024px */}
        <div className="w-1/4 lg:block hidden">
          <Sidebar />
        </div>
        <div className="w-full lg:w-3/4">
          <Banner />
        </div>
      </div>

      {selectedCategories.map((category) => (
        <FeaturedProducts
          key={category.categoryId}
          title={category.categoryName}
          categoryId={category.categoryId}
        />
      ))}
    </div>
  );
};
export default Homepage;
