import { Link, useLocation } from 'react-router-dom';
import LoginForm from '../../pages/Admin/AdminSignIn';
import RegisterForm from '../../pages/Admin/AdminSignUp';

const AuthPage = () => {
  const location = useLocation();
  // Kiểm tra đường dẫn '/admin/login' thay vì '/login'
  const isLoginPage = location.pathname === '/login'; // Thay '/admin/login' bằng '/login'

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            {isLoginPage ? 'Đăng nhập' : 'Đăng ký'}
          </h1>

          {/* Form */}
          {isLoginPage ? <LoginForm /> : <RegisterForm />}

          {/* Chuyển đổi form */}
          <p className="text-center text-sm text-gray-600 mt-6">
            {isLoginPage ? (
              <>
                Chưa có tài khoản?{' '}
                <Link
                  to="/register"
                  className="link link-primary font-semibold"
                >
                  Đăng ký ngay
                </Link>
              </>
            ) : (
              <>
                Đã có tài khoản?{' '}
                <Link to="/login" className="link link-primary font-semibold">
                  Đăng nhập
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
