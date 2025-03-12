import { baseApi } from './baseApi';

export const sparePartsProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSparePartsProducts: builder.query({
      query: () => '/SparepartsProduct',
    }),
    getSparepartsProductsByCategory: builder.query({
      query: (sparepartId) => `/SparepartsProduct/category?id=${sparepartId}`,
    }),
    getSparePartsProductById: builder.query({
      query: (id) => `/SparepartsProduct/${id}`,
      transformResponse: (response) => ({
        ...response,
        images: [
          response.image1,
          response.image2,
          response.image3,
          response.image4,
        ].filter((img) => img),
      }),
    }),
    createSparePartProduct: builder.mutation({
      query: (newProduct) => {
        const token = localStorage.getItem('accessToken');
        return {
          url: '/SparepartsProduct',
          method: 'POST',
          body: newProduct,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ['SparePartsProduct'],
    }),
    updateSparePartProduct: builder.mutation({
      query: (SparePartsProductUpdated) => {
        const token = localStorage.getItem('accessToken');
        return {
          url: `/SparepartsProduct/${SparePartsProductUpdated.sparePartProductId}`, // Sửa lại ID trường
          method: 'PUT',
          body: SparePartsProductUpdated,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ['SparePartsProduct'],
    }),
    deleteSparePartProduct: builder.mutation({
      query: (id) => {
        const token = localStorage.getItem('accessToken');
        return {
          url: `/SparepartsProduct/${id}`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ['SparePartsProduct'],
    }),
  }),
});

export const {
  useGetSparePartsProductsQuery,
  useGetSparepartsProductsByCategoryQuery,
  useGetSparePartsProductByIdQuery,
  useCreateSparePartProductMutation,
  useUpdateSparePartProductMutation,
  useDeleteSparePartProductMutation,
} = sparePartsProductApi;
