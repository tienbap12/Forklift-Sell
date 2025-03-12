import { baseApi } from './baseApi';

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => '/Categry', // Gọi API lấy danh sách danh mục
    }),
    getCategoryById: builder.query({
      query: (id) => `/Categry/${id}`, // Gọi API lấy danh mục theo ID
    }),
    createCategory: builder.mutation({
      query: (newCategory) => {
        const token = localStorage.getItem('accessToken');
        return {
          url: '/Categry',
          method: 'POST',
          body: newCategory,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ['Category'],
    }),
    updateCategory: builder.mutation({
      query: (data) => {
        const token = localStorage.getItem('accessToken');
        return {
          url: `/Categry/${data.categoryId}`, // Sửa lại URL cho đúng
          method: 'PUT',
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ['Category'],
    }),
    deleteCategory: builder.mutation({
      query: (id) => {
        const token = localStorage.getItem('accessToken');
        return {
          url: `/Categry/${id}`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ['Category'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
