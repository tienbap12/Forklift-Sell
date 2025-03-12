import React from 'react';
import { HiPencil, HiTrash } from 'react-icons/hi';

const SparepartsProductTable = ({ products, onEditClick, onDeleteClick }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium dark:text-white">
              Mã SP
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium dark:text-white">
              Tên SP
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium dark:text-white">
              Mô tả
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium dark:text-white">
              Hệ thống phụ tùng
            </th>
            <th className="px-4 py-3 text-center text-sm font-medium dark:text-white">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {products.map((prod, index) => (
            <tr
              key={prod.sparepartsProductId}
              className={`${
                index % 2 === 0
                  ? 'bg-white dark:bg-gray-900'
                  : 'bg-gray-50 dark:bg-gray-800'
              } hover:bg-blue-50 dark:hover:bg-blue-900`}
            >
              <td className="px-4 py-3 text-gray-900 dark:text-white">
                {prod.sparepartsProductId}
              </td>
              <td className="px-4 py-3 text-gray-900 dark:text-white">
                {prod.sparepartsProductName}
              </td>
              <td className="px-4 py-3 text-gray-900 dark:text-white">
                {prod.description}
              </td>
              <td className="px-4 py-3 text-gray-900 dark:text-white">
                {prod.sparepartsName}
              </td>
              <td className="px-4 py-3 text-center">
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => onEditClick(prod)}
                    className="text-blue-500 hover:text-blue-600 p-1 rounded"
                  >
                    <HiPencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDeleteClick(prod)}
                    className="text-red-500 hover:text-red-600 p-1 rounded"
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

export default SparepartsProductTable;
