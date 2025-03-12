// components/ContactPage.js
import { useState } from 'react';
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý submit form ở đây
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Thông tin công ty và Form */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Thông tin công ty */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Liên hệ với chúng tôi
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPinIcon className="w-6 h-6 text-yellow-600 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Trụ sở chính
                  </h3>
                  <p className="text-gray-600">
                    Số 502 TL824, Ấp Mới 2,
                    <br />
                    Xã Mỹ Hạnh Nam, Huyện Đức Hoà, <br />
                    Tỉnh Long An, Việt Nam
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <PhoneIcon className="w-6 h-6 text-yellow-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Điện thoại
                  </h3>
                  <p className="text-gray-600">
                    Hotline:{' '}
                    <a href="tel:0372660597" className="hover:text-yellow-600">
                      0372 660 597
                    </a>{' '}
                    <br />
                    Văn phòng:{' '}
                    <a href="tel:0336624671" className="hover:text-yellow-600">
                      0336 624 671
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <EnvelopeIcon className="w-6 h-6 text-yellow-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Email</h3>
                  <p className="text-gray-600">
                    <a
                      href="mailto:ctyxenanght@gmail.com"
                      className="hover:text-yellow-600"
                    >
                      ctyxenanght@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <ClockIcon className="w-6 h-6 text-yellow-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Giờ làm việc
                  </h3>
                  <p className="text-gray-600">
                    Thứ 2 - Thứ 7: 7:30 - 17:00 <br />
                    Chủ nhật: Nghỉ
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form liên hệ */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg text-gray-700 border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 placeholder-yellow-300"
                  placeholder="Vui lòng nhập họ và tên..."
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm  font-medium text-gray-700 mb-1">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 rounded-lg text-gray-700 border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 placeholder-yellow-300"
                    placeholder="Vui lòng nhập số điện thoại..."
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg text-gray-700 border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 placeholder-yellow-300"
                    value={formData.email}
                    placeholder="Vui lòng nhập email..."
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nội dung yêu cầu *
                </label>
                <textarea
                  rows="4"
                  required
                  className="w-full px-4 py-3 rounded-lg text-gray-700 border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Gửi yêu cầu
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Bản đồ Google Maps */}
      <div className="h-96 w-full">
        <iframe
          title="Bản đồ Đức Hòa"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src="https://maps.google.com/maps?q=10.8701023,106.4978577&z=15&output=embed"
          className="filter grayscale-20 contrast-110"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;
