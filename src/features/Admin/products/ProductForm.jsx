import React from 'react';
import ImageUpload from '../../../components/common/ImageUpload';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ProductForm = ({ formData, setFormData }) => {
  const handleDescriptionChange = (value) => {
    setFormData({ ...formData, description: value });
  };

  const handleImageChange = (index, newImage) => {
    const newImages = [...formData.images];
    newImages[index] = newImage;
    setFormData({ ...formData, images: newImages });
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-gray-900 dark:text-white">Tên sản phẩm</label>
          <input
            type="text"
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
            value={formData.productName}
            onChange={(e) =>
              setFormData({ ...formData, productName: e.target.value })
            }
          />
        </div>
        <div>
          <label className="text-gray-900 dark:text-white">Mã SP</label>
          <input
            type="text"
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
            value={formData.keyword}
            onChange={(e) =>
              setFormData({ ...formData, keyword: e.target.value })
            }
          />
        </div>
        <div>
          <label className="text-gray-900 dark:text-white">Danh mục</label>
          <input
            type="text"
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
            value={formData.categoryName}
            onChange={(e) =>
              setFormData({ ...formData, categoryName: e.target.value })
            }
          />
        </div>
        <div>
          <label className="text-gray-900 dark:text-white">Thương hiệu</label>
          <input
            type="text"
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
            value={formData.brandName}
            onChange={(e) =>
              setFormData({ ...formData, brandName: e.target.value })
            }
          />
        </div>
      </div>

      <div className="my-6">
        <h4 className="font-bold mb-2 text-gray-900 dark:text-white">
          Thông số kỹ thuật
        </h4>
        <ReactQuill
          value={formData.description || ''}
          onChange={handleDescriptionChange}
          modules={{
            toolbar: [
              [{ header: '1' }, { header: '2' }, { font: [] }],
              [{ size: [] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
              ],
              ['link', 'image', 'video'],
              ['clean'],
            ],
          }}
          style={{ height: '400px' }}
        />
      </div>

      <div className="my-6">
        <h4 className="font-bold mb-2 text-gray-900 dark:text-white">
          Hình ảnh
        </h4>
        <div className="grid grid-cols-2 gap-4">
          {formData.images.map((image, index) => (
            <ImageUpload
              key={index}
              index={index}
              image={image}
              onImageChange={handleImageChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
