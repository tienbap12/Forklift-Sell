import { baseApi } from './baseApi';

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ categoryId, brandId } = {}) => {
        const params = new URLSearchParams();
        if (categoryId) params.append('categoryId', categoryId);
        if (brandId) params.append('brandId', brandId);
        
        return params.toString() 
          ? `/Products/category&brand?${params}`
          : '/Products';
      },
      providesTags: ['Product'],
    }),
    getProductById: builder.query({
      query: (id) => `/Products/${id}`,
      transformResponse: (response) => ({
        ...response,
        // Chuyển các trường ảnh riêng thành mảng
        images: [
          response.image1,
          response.image2,
          response.image3,
          response.image4,
        ].filter((img) => img),
      }),
    }),
    createProduct: builder.mutation({
      query: (newProduct) => {
        const token = localStorage.getItem('token');
        return {
          url: '/Products',
          method: 'POST',
          body: newProduct,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      // Nếu bạn sử dụng tag-based invalidation
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: (product) => {
        const token = localStorage.getItem('token');
        return {
          url: `/products/${product.productId}`,
          method: 'PUT',
          body: product,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation({
      query: (id) => {
        const token = localStorage.getItem('token');
        return {
          url: `/products/${id}`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
