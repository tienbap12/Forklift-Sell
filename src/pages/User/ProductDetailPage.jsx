// pages/ProductDetailPage.js
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../api/productApi';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';
import { FaFacebookMessenger } from 'react-icons/fa';
const ProductDetailPage = () => {
  const { productId } = useParams();
  const { data: product, isLoading, error } = useGetProductByIdQuery(productId);
  const [selectedImage, setSelectedImage] = useState(0);

  const images = [
    product?.image1,
    product?.image2,
    product?.image3,
    product?.image4,
  ].filter((img) => img); // Lọc bỏ các ảnh null/undefined
  const keyword = product?.keyword || product?.productName;

  const handleContact = useCallback(() => {
    // Lấy productId, mặc định 'unknown' nếu không có
    const productId = product?.productId || 'unknown';

    // Tạo nội dung tin nhắn
    const message = encodeURIComponent(
      `Mã sản phẩm: ${keyword}\nTôi muốn tư vấn sản phẩm này`
    );

    // Tạo URL Messenger
    const messengerUrl = `https://m.me/1299635723447089?text=${message}`;

    // Kiểm tra thiết bị di động
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    try {
      if (isMobile) {
        // Trên mobile, vẫn chuyển hướng vì không có khái niệm mở tab mới như desktop
        window.location.href = `fb-messenger://user-thread/1299635723447089?text=${message}`;
      } else {
        // Trên desktop: cố gắng mở tab mới
        const newWindow = window.open(
          messengerUrl,
          '_blank',
          'noopener,noreferrer'
        );
        if (!newWindow) {
          // Nếu popup bị chặn, thông báo cho người dùng
          alert(
            'Popup bị chặn. Vui lòng cho phép pop-up để liên hệ tư vấn qua Messenger.'
          );
        }
      }
      // Tracking sự kiện
      trackEvent('ContactButtonClicked', { productId });
    } catch (error) {
      console.error('Lỗi khi mở Messenger:', error);
      window.open(messengerUrl, '_blank', 'noopener,noreferrer');
    }
  }, [product?.productId, keyword]);
  const parseDescription = (desc) => {
    return desc
      .split('\n')
      .filter((line) => line.trim())
      .map((line) => {
        const pairs = line.split('\t').filter(Boolean);
        return pairs.reduce((acc, curr, index) => {
          if (index % 2 === 0) {
            acc.push({
              key: curr.replace(':', '').trim(),
              value: pairs[index + 1]?.trim(),
            });
          }
          return acc;
        }, []);
      })
      .flat()
      .filter((item) => item.key && item.value);
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message="Lỗi tải chi tiết sản phẩm" />;

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
                alt={product.productName}
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
              {product.productName}
            </h1>

            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold mb-4 text-yellow-500">
                Thông số kỹ thuật
              </h2>
              <dl className="grid grid-cols-2 gap-4">
                {parseDescription(product.description).map((item, index) => (
                  <div key={index} className="border-b pb-2">
                    <dt className="font-medium text-gray-600">{item.key}</dt>
                    <dd className="text-gray-800">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <button
            onClick={handleContact}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <FaFacebookMessenger />
            Liên hệ tư vấn
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
