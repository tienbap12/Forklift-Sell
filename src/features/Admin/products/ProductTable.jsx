import React from 'react';
import { HiPencil, HiTrash } from 'react-icons/hi';

const ProductTable = ({ products, onEditClick, onDeleteClick }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium dark:text-white">
              Mã SP
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium dark:text-white">
              Tên sản phẩm
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium dark:text-white">
              Loại
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium dark:text-white">
              Thương hiệu
            </th>
            <th className="px-4 py-3 text-center text-sm font-medium dark:text-white">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {products.map((product, index) => (
            <tr
              key={product.productId}
              className={`${
                index % 2 === 0
                  ? 'bg-white dark:bg-gray-900'
                  : 'bg-gray-50 dark:bg-gray-800'
              } hover:bg-blue-50 dark:hover:bg-blue-900`}
            >
              <td className="px-4 py-3 text-gray-900 dark:text-white">
                {product.keyword}
              </td>
              <td className="px-4 py-3 text-gray-900 dark:text-white">
                {product.productName}
              </td>
              <td className="px-4 py-3 text-gray-900 dark:text-white">
                {product.categoryName}
              </td>
              <td className="px-4 py-3 text-gray-900 dark:text-white">
                {product.brandName}
              </td>
              <td className="px-4 py-3 text-center">
                <div className="flex justify-center space-x-2">
                  <button
                    className="text-blue-500 hover:text-blue-600 p-1 rounded"
                    onClick={() =>
                      onEditClick(product, {
                        productName: product.productName,
                        keyword: product.keyword,
                        categoryName: product.categoryName,
                        brandName: product.brandName,
                        descriptionFields: [], // Bạn có thể bổ sung hàm parse description nếu cần
                        images: [
                          product.image1 || '',
                          product.image2 || '',
                          product.image3 || '',
                          product.image4 || '',
                        ],
                      })
                    }
                  >
                    <HiPencil className="w-5 h-5" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-600 p-1 rounded"
                    onClick={() => onDeleteClick(product)}
                  >
                    <HiTrash className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
