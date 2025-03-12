import { baseApi } from './baseApi';

export const sparePartsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSpareParts: builder.query({
      query: () => '/SpareParts',
    }),
    getSparePartById: builder.query({
      query: (id) => `/SpareParts/${id}`,
    }),
    createSparePart: builder.mutation({
      query: (newSparePart) => {
        const token = localStorage.getItem('accessToken');
        return {
          url: '/SpareParts',
          method: 'POST',
          body: newSparePart,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ['SparePart'],
    }),
    updateSparePart: builder.mutation({
      query: (updatedSparePart) => {
        const token = localStorage.getItem('accessToken');
        return {
          url: `/SpareParts/${updatedSparePart.sparePartId}`,
          method: 'PUT',
          body: updatedSparePart,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ['SparePart'],
    }),
    deleteSparePart: builder.mutation({
      query: (id) => {
        const token = localStorage.getItem('accessToken');
        return {
          url: `/SpareParts/${id}`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ['SparePart'],
    }),
  }),
});

export const {
  useGetSparePartsQuery,
  useGetSparePartByIdQuery,
  useCreateSparePartMutation,
  useUpdateSparePartMutation,
  useDeleteSparePartMutation,
} = sparePartsApi;
