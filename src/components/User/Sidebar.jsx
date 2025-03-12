import React, { useState } from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import { useGetCategoriesQuery } from '../../api/categoryApi';
import { useGetSparePartsQuery } from '../../api/sparePartsApi';
import { useGetBrandsQuery } from '../../api/brandApi';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const {
    data: categories,
    error: categoryError,
    isLoading: isCategoryLoading,
  } = useGetCategoriesQuery();
  const {
    data: brands,
    error: brandError,
    isLoading: isBrandLoading,
  } = useGetBrandsQuery();
  const {
    data: spareParts,
    error: sparePartError,
    isLoading: isSparePartLoading,
  } = useGetSparePartsQuery();

  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  if (isCategoryLoading || isBrandLoading) return <Loader />;
  if (categoryError || brandError) {
    return <ErrorMessage message="Lỗi tải dữ liệu" />;
  }

  return (
    <div className=" bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
        Bộ lọc sản phẩm
      </h2>
      <div className="space-y-4">
        {categories?.map((category, index) => (
          <div key={category.categoryId} className="group">
            <button
              onClick={() => toggleCategory(index)}
              className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200"
            >
              <span className="font-medium text-gray-700 group-hover:text-blue-600">
                {category.categoryName}
              </span>
              <AiOutlineDown
                className={`w-4 h-4 text-gray-500 transform transition-transform ${
                  openCategory === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openCategory === index && (
              <div className="pl-4 mt-2 space-y-3">
                {category.categoryId === 'd46f1849-5095-4b4e-be4f-7e2fc3a68ce4' ? (
                  isSparePartLoading ? (
                    <Loader />
                  ) : sparePartError ? (
                    <ErrorMessage message="Lỗi tải phụ tùng" />
                  ) : (
                    spareParts?.map((part) => (
                      <Link
                      key={part.sparepartsId}
                      to={{
                        pathname: '/san-pham',
                        search: `?sparepart=${part.sparepartsId}`
                      }}
                        className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                      >
                        <span className="text-gray-600 hover:text-blue-600">
                          {part.sparepartsName}
                        </span>
                      </Link>
                    ))
                  )
                ) : (
                  brands?.map((brand) => (
                    <Link
                      key={brand.brandId}
                      to={`/san-pham?category=${category.categoryId}&brand=${brand.brandId}`}
                      className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                    >
                      <span className="text-gray-600 hover:text-blue-600">
                        {category.categoryName} {brand.brandName}
                      </span>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;