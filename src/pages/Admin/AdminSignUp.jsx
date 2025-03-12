import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRegisterMutation } from '../../api/accountApi';
import { toast } from 'react-toastify';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data).unwrap();
      toast.success(response.message);
      // Xử lý sau khi đăng ký thành công
    } catch (error) {
      toast.error(error.data?.message || 'Đăng ký thất bại');
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

      <div className="form-control">
        <label className="label">
          <span className="label-text text-black">Nhập lại mật khẩu</span>
        </label>
        <input
          type="password"
          placeholder="••••••••"
          className={`input input-bordered w-full ${
            errors.confirmPassword && 'input-error'
          }`}
          {...register('confirmPassword', {
            required: 'Vui lòng nhập lại mật khẩu',
            validate: (value) =>
              value === watch('password') || 'Mật khẩu không khớp',
          })}
        />
        {errors.confirmPassword && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.confirmPassword.message}
            </span>
          </label>
        )}
      </div>

      <button
        type="submit"
        className={`btn btn-primary w-full ${isLoading && 'loading'}`}
      >
        {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
      </button>
    </form>
  );
};

export default RegisterForm;
