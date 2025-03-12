import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import banner1 from '../../assets/banner-xe-nang-ig-1.png';
import banner2 from '../../assets/banner-xe-nang-ig-2.png';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="w-full"
      >
        <SwiperSlide>
          <Link to="/san-pham/">
            <img src={banner1} alt="Banner 1" className="w-full h-auto" />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/san-pham/">
            <img src={banner2} alt="Banner 2" className="w-full h-auto" />
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
