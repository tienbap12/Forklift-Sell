// src/features/Admin/SparepartsProduct/AddSparePartProductForm.jsx
import React, { useState } from 'react';
import { useGetSparePartsQuery } from '../../../api/sparepartsApi';
import ImageUpload from '../../../components/common/ImageUpload';

const AddSparePartProductForm = ({
  initialData = {
    sparepartsProductName: '',
    description: '',
    sparepartsName: '',
    images: ['', '', '', ''], // 4 ảnh: images[0] ~ images[3]
    sparepartsId: '',
  },
  onSubmit,
  onClose,
}) => {
  // Lấy danh sách phụ tùng để hiển thị trong select
  const { data: spareParts, isLoading, error } = useGetSparePartsQuery();
  const [formData, setFormData] = useState(initialData);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Nếu cần, chuyển đổi mảng images thành các trường riêng (nếu API yêu cầu)
    const productData = {
      ...formData,
      image1: formData.images[0],
      image2: formData.images[1],
      image3: formData.images[2],
      image4: formData.images[3],
    };
    onSubmit(productData);
  };

  // Cập nhật ảnh theo index
  const handleImageChange = (index, newImage) => {
    setFormData((prevData) => {
      const updatedImages = prevData.images.map((img, idx) =>
        idx === index ? newImage : img
      );
      return { ...prevData, images: updatedImages };
    });
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
          {initialData.sparepartsProductName
            ? 'Chỉnh sửa sản phẩm phụ tùng'
            : 'Thêm sản phẩm phụ tùng'}
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {/* Tên sản phẩm phụ tùng */}
          <div>
            <label className="block text-gray-900 dark:text-white mb-1">
              Tên sản phẩm phụ tùng
            </label>
            <input
              type="text"
              value={formData.sparepartsProductName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sparepartsProductName: e.target.value,
                })
              }
              className="input input-bordered w-full"
              placeholder="Nhập tên sản phẩm phụ tùng"
            />
          </div>
          {/* Mô tả */}
          <div>
            <label className="block text-gray-900 dark:text-white mb-1">
              Mô tả
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="textarea textarea-bordered w-full"
              placeholder="Nhập mô tả sản phẩm phụ tùng"
            ></textarea>
          </div>
          {/* Hệ thống phụ tùng */}
          <div>
            <label className="block text-gray-900 dark:text-white mb-1">
              Hệ thống phụ tùng
            </label>
            <input
              type="text"
              value={formData.sparepartsName}
              onChange={(e) =>
                setFormData({ ...formData, sparepartsName: e.target.value })
              }
              className="input input-bordered w-full"
              placeholder="Nhập hệ thống phụ tùng"
            />
          </div>
          {/* Chọn phụ tùng (select lấy sparepartsId) */}
          <div>
            <label className="block text-gray-900 dark:text-white mb-1">
              Chọn phụ tùng
            </label>
            {isLoading ? (
              <p>Loading spare parts...</p>
            ) : error ? (
              <p>Error loading spare parts.</p>
            ) : (
              <select
                value={formData.sparepartsId}
                onChange={(e) =>
                  setFormData({ ...formData, sparepartsId: e.target.value })
                }
                className="input input-bordered w-full"
              >
                <option value="">-- Chọn phụ tùng --</option>
                {spareParts &&
                  spareParts.map((sp) => (
                    <option key={sp.sparepartsId} value={sp.sparepartsId}>
                      {sp.sparepartsName}
                    </option>
                  ))}
              </select>
            )}
          </div>
          {/* Upload ảnh: Gộp 4 ảnh thành mảng images */}
          <div>
            <label className="block text-gray-900 dark:text-white mb-1">
              Ảnh sản phẩm
            </label>
            <div className="grid grid-cols-2 gap-4">
              {formData.images.map((img, index) => (
                <ImageUpload
                  key={index}
                  index={index}
                  image={img}
                  onImageChange={handleImageChange}
                />
              ))}
            </div>
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
            {initialData.sparepartsProductName ? 'Lưu thay đổi' : 'Thêm'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSparePartProductForm;
