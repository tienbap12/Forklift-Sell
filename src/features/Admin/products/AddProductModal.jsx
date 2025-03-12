import React from 'react';
import ProductForm from './ProductForm';

const AddProductModal = ({ formData, setFormData, onClose, onSubmit }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[100]"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Thêm sản phẩm mới
        </h3>
        <ProductForm formData={formData} setFormData={setFormData} />
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-600 dark:text-white rounded hover:bg-gray-300"
          >
            Hủy
          </button>
          <button
            onClick={() => onSubmit(formData)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Thêm sản phẩm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
