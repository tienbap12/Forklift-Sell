// src/admin/pages/Profile/AdminProfile.jsx
import { useState } from 'react';

const AdminProfile = () => {
  const [profile, setProfile] = useState({
    name: 'Admin Name',
    email: 'admin@example.com',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update profile logic
    console.log(profile);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Thông tin tài khoản</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Họ tên</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block mb-1">Mật khẩu mới</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              placeholder="Để trống nếu không đổi"
              value={profile.password}
              onChange={(e) =>
                setProfile({ ...profile, password: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Cập nhật thông tin
          </button>
        </div>
      </form>
    </div>
  );
};
