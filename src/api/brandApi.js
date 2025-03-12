import { baseApi } from './baseApi';

export const BrandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: () => '/Brands', // Gọi API lấy danh sách thương hiệu
    }),
    getBrandById: builder.query({
      query: (id) => `/Brands/${id}`, // Gọi API lấy thương hiệu theo ID
    }),
    createBrand: builder.mutation({
      query: (newBrand) => {
        const token = localStorage.getItem('accessToken');
        return {
          url: '/Brands',
          method: 'POST',
          body: newBrand,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ['Brand'],
    }),
    updateBrand: builder.mutation({
      query: (data) => {
        const token = localStorage.getItem('accessToken');
        return {
          url: `/Brands/${data.brandId}`, // Sửa lại URL cho đúng với Brand
          method: 'PUT',
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ['Brand'],
    }),
    deleteBrand: builder.mutation({
      query: (id) => {
        const token = localStorage.getItem('accessToken');
        return {
          url: `/Brands/${id}`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ['Brand'],
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useGetBrandByIdQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = BrandApi;
