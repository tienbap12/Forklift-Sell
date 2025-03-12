// pages/SparePartDetailPage.js
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';
import { useGetSparePartsProductByIdQuery } from '../../api/sparePartsProductApi';

const SparePartProductDetailPage = () => {
  const { sparePartId } = useParams();
  const { data, isLoading, error } =
    useGetSparePartsProductByIdQuery(sparePartId);
  const [selectedImage, setSelectedImage] = useState(0);

  // Tạo mảng hình ảnh từ các trường image1-image4
  const images = [
    data?.image1,
    data?.image2,
    data?.image3,
    data?.image4,
  ].filter((img) => img);

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message="Lỗi tải chi tiết phụ tùng" />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gallery Ảnh */}
        <div className="space-y-6">
          {/* Ảnh lớn */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            {images[selectedImage] && (
              <img
                src={`${images[selectedImage]}`}
                alt={data?.productName || data?.sparepartsProductName}
                className="w-full h-96 object-contain object-center"
              />
            )}
          </div>

          {/* Danh sách ảnh nhỏ */}
          <div className="grid grid-cols-4 gap-4">
            {images.map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`cursor-pointer p-2 border-2 rounded-lg transition-all ${
                  selectedImage === index
                    ? 'border-blue-500 scale-105'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <img
                  src={`${img}`}
                  alt={`Ảnh ${index + 1}`}
                  className="w-full h-20 object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Thông tin chi tiết */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
              {data?.productName || data?.sparepartsProductName}
            </h1>

            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold mb-4 text-yellow-500">Mô tả</h2>
              <p className="text-gray-700">{data?.description}</p>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Liên hệ tư vấn
          </button>
        </div>
      </div>
    </div>
  );
};

export default SparePartProductDetailPage;
