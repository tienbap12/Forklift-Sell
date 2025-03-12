import React from 'react';
import bannerAbout from '../../assets/xe-nang-3-chieu-12.jpg';
export default function AboutPage() {
  return (
    <div className="bg-gray-50">
      {/* Main Banner */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">
            GIỚI THIỆU XE NÂNG ĐỨC HÒA
          </h1>
          <p className="text-xl text-gray-300">
            Hơn 15 năm kinh nghiệm trong lĩnh vực sản xuất và phân phối xe nâng
            hàng đầu Việt Nam
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Công ty Xe nâng Đức Hòa
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Tự hào là đơn vị tiên phong trong lĩnh vực sản xuất và phân
                  phối xe nâng công nghiệp tại Việt Nam, Xe nâng Đức Hòa mang
                  đến những giải pháp tối ưu cho hoạt động logistics và kho vận.
                </p>
                <p>
                  Với hệ thống nhà xưởng hiện đại đạt chuẩn ISO 9001:2015 cùng
                  đội ngũ kỹ sư giàu kinh nghiệm, chúng tôi cam kết cung cấp
                  những sản phẩm chất lượng cao với giá thành cạnh tranh nhất
                  thị trường.
                </p>
              </div>
            </div>
            <img
              src={bannerAbout}
              alt="Nhà máy Xe nâng Đức Hòa"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-700">
            GIÁ TRỊ CỐT LÕI
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Chất lượng vượt trội',
                content: 'Sản phẩm đạt tiêu chuẩn quốc tế với độ bền cao',
                icon: '✅',
              },
              {
                title: 'Công nghệ tiên tiến',
                content: 'Ứng dụng công nghệ Nhật Bản trong sản xuất',
                icon: '⚙️',
              },
              {
                title: 'Dịch vụ 24/7',
                content: 'Hỗ trợ kỹ thuật toàn quốc 24 giờ/ngày',
                icon: '🛠️',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md text-center"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-gray-700">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Journey */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-700">
            CHẶNG ĐƯỜNG PHÁT TRIỂN
          </h2>
          <div className="relative pl-8 border-l-4 border-yellow-500">
            {[
              {
                year: '2008',
                title: 'Thành lập công ty',
                content: 'Bắt đầu với dịch vụ bảo trì xe nâng',
              },
              {
                year: '2012',
                title: 'Sản xuất thế hệ đầu tiên',
                content: 'Ra mắt dòng xe nâng điện 1-3 tấn',
              },
              {
                year: '2020',
                title: 'Mở rộng quy mô',
                content: 'Xây dựng nhà máy 5ha tại Bình Dương',
              },
            ].map((item, index) => (
              <div key={index} className="mb-12 relative">
                <div className="absolute w-4 h-4 bg-yellow-500 rounded-full -left-9 top-2" />
                <h3 className="text-xl font-bold mb-2 text-gray-700">
                  <span className="text-yellow-600">{item.year} - </span>
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
