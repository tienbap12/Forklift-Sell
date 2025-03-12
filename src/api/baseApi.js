// src/api/baseApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://xenangduchoa.com/api',
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Nếu request trả về lỗi 401, cố gắng refresh token
  if (result.error && result.error.status === 401) {
    const refreshResponse = await fetch(
      'https://xenangduchoa.com/api/Login/refresh-token',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          refreshToken: localStorage.getItem('refreshToken'),
        }),
      }
    );

    if (refreshResponse.ok) {
      const data = await refreshResponse.json();
      // Lưu accessToken và refreshToken mới vào localStorage
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      // Retry lại request ban đầu với token mới
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Nếu refresh token thất bại: xóa localStorage và chuyển hướng về trang login
      localStorage.clear();
      window.location.href = '/login';
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
