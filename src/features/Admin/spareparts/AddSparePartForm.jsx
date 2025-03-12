// src/features/Admin/Spareparts/AddSparePartForm.jsx
import React, { useState } from 'react';
import { useGetCategoriesQuery } from '../../../api/categoryApi';
import CategorySelect from '../../../components/Admin/CategorySelect';

const AddSparePartForm = ({
  initialData = { sparepartsName: '', categoryId: '' },
  onSubmit,
  onClose,
}) => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  const [formData, setFormData] = useState(initialData);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[100]"
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg"
      >
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          {initialData.sparepartsName ? 'Chỉnh sửa phụ tùng' : 'Thêm phụ tùng'}
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-gray-900 dark:text-white mb-1">
              Tên phụ tùng
            </label>
            <input
              type="text"
              value={formData.sparepartsName}
              onChange={(e) =>
                setFormData({ ...formData, sparepartsName: e.target.value })
              }
              className="input input-bordered w-full"
              placeholder="Nhập tên phụ tùng"
            />
          </div>
          <div>
            <label className="block text-gray-900 dark:text-white mb-1">
              Danh mục
            </label>
            {isLoading ? (
              <p>Loading categories...</p>
            ) : error ? (
              <p>Error loading categories.</p>
            ) : (
              <CategorySelect
                categories={categories}
                selectedCategory={formData.categoryId}
                setSelectedCategory={(value) =>
                  setFormData({ ...formData, categoryId: value })
                }
              />
            )}
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:text-white"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {initialData.sparepartsName ? 'Lưu thay đổi' : 'Thêm'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSparePartForm;
