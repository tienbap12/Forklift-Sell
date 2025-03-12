import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../api/accountApi';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await login(data).unwrap(); // Giả định bạn có API login
      toast.success(response.message);
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      navigate('/admin'); // Chuyển hướng đến /admin
    } catch (error) {
      toast.error(error?.data || 'Đăng nhập thất bại');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text text-black">Tên đăng nhập</span>
        </label>
        <input
          type="text"
          placeholder="Nhập tên đăng nhập"
          className={`input input-bordered w-full ${
            errors.username && 'input-error'
          }`}
          {...register('username', {
            required: 'Vui lòng nhập tên đăng nhập',
            minLength: {
              value: 3,
              message: 'Tên đăng nhập ít nhất 3 ký tự',
            },
          })}
        />
        {errors.username && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.username.message}
            </span>
          </label>
        )}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text text-black">Mật khẩu</span>
        </label>
        <input
          type="password"
          placeholder="••••••••"
          className={`input input-bordered w-full ${
            errors.password && 'input-error'
          }`}
          {...register('password', {
            required: 'Vui lòng nhập mật khẩu',
            minLength: {
              value: 6,
              message: 'Mật khẩu ít nhất 6 ký tự',
            },
          })}
        />
        {errors.password && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.password.message}
            </span>
          </label>
        )}
      </div>

      <button
        type="submit"
        className={`btn btn-primary w-full ${isLoading && 'loading'}`}
      >
        {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
      </button>
    </form>
  );
};

export default LoginForm;
