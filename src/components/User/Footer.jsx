const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8">
          {/* Cột 1 - Giới thiệu */}
          <div className="space-y-4">
            <h3 className="text-white text-xl font-bold mb-4">
              XE NÂNG ĐỨC HÒA
            </h3>
            <p className="text-sm leading-relaxed">
              Với kinh nghiệm hơn 10 năm kinh doanh xe nâng, chúng tôi chuyên tư
              vấn giải pháp nâng hàng, tư vấn đầu tư xe nâng. Chuyên mua bán xe
              nâng động cơ dầu, xăng gas, xe nâng điện nhập khẩu Nhật Bản.
            </p>
          </div>

          {/* Cột 2 - Chính sách */}
          <div className="space-y-2">
            <h4 className="text-white text-lg font-semibold mb-3">
              Chính sách
            </h4>
            <ul className="space-y-2 text-sm">
              <li>Chính sách thanh toán</li>
              <li>Chính sách bảo hành</li>
              <li>Chính sách vận chuyển</li>
              <li>Chính sách bảo mật thông tin</li>
            </ul>
          </div>

          {/* Cột 3 - Thông tin liên hệ */}
          <div className="space-y-2">
            <h4 className="text-white text-lg font-semibold mb-3">
              CÔNG TY TNHH SX TM XE NÂNG ĐỨC HÒA
            </h4>
            <div className="text-sm space-y-2">
              <p>
                Số 502 TL824, Ấp Mới 2, Xã Mỹ Hạnh Nam, Huyện Đức Hoà, Tỉnh Long
                An, Việt Nam
              </p>
              <div className="mt-2">
                <p>Điện Thoại:</p>
                <p>0372 660 597</p>
                <p>0336 624 671</p>
              </div>
            </div>
          </div>

          {/* Cột 4 - Bản đồ/Dịch vụ */}
          <div className="space-y-2">
            <h4 className="text-white text-lg font-semibold mb-3">Dịch vụ</h4>
            <ul className="text-sm space-y-2">
              <li>Cung cấp phụ tùng xe nâng</li>
              <li>Bình điện (ắc quy) xe nâng</li>
              <li>Cho thuê xe nâng</li>
              <li>Sửa chữa & bảo dưỡng</li>
            </ul>
          </div>
        </div>

        {/* Phần copyright */}
        <div className="pt-4 text-center text-sm mt-4">
          <p className="mb-2">Copyright ©</p>
          <div className="flex justify-center space-x-4">
            <span>Chính sách thanh toán</span>
            <span>Chính sách bảo hành</span>
            <span>Chính sách vận chuyển</span>
            <span>Chính sách bảo mật</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
