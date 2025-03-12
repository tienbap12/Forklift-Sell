import React from 'react';
import { useGetProductsQuery } from '../../../api/productApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules'; // Add this import
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';

const FeaturedProducts = ({ title, categoryId }) => {
  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsQuery({ categoryId });

  if (isLoading) return <div>Đang tải sản phẩm...</div>;
  if (error) return <div>Lỗi tải sản phẩm: {error.message}</div>;
  if (!products || products.length === 0)
    return <div>Không có sản phẩm nào cho {title}</div>;

  return (
    <section className="mt-12">
      <h2 className="text-3xl font-bold text-center text-yellow-500 mb-6">
        {title}
      </h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={4}
        navigation
        loop={true}
        autoplay={{
          delay: 3000, // Thời gian delay giữa các slide (ms)
          disableOnInteraction: false, // Không dừng autoplay khi người dùng tương tác
          pauseOnMouseEnter: true, // Tạm dừng khi chuột hover
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.productId}>
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <Link to={`/san-pham/${product.productId}`} className="block">
                <div className="aspect-square bg-gray-100 relative">
                  {product.image1 ? (
                    <img
                      src={`data:image/png;base64,${product.image1}`}
                      alt={product.productName}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-800 mb-2 truncate">
                    {product.productName}
                  </h3>
                  <div className="text-sm text-gray-600">
                    <p className="truncate">Model: {product.keyword}</p>
                    <p className="mt-1">Hãng: {product.brandName}</p>
                  </div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FeaturedProducts;
