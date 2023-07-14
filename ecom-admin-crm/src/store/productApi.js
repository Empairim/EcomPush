import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// todo: move this to utils or .env
const API_BASE_URL = 'http://localhost:3001/api/v1';
const JWT = 'jwt';

export const productApi = createApi({
    reducerPath: 'products',
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_BASE_URL}/products/`, prepareHeaders: (headers) => {
            //headers.set('Authorization', `Bearer ${localStorage.getItem(JWT)}`);
            headers.set('token', localStorage.getItem(JWT));

            return headers;
        },
        //credentials: 'include'
    }),
    endpoints: (builder) => ({
        getProductById: builder.query({
            query: (id) => `?id=${id}`,
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `/updateProduct`,
                method: 'PUT',
                body: data
            }),
        }),
        addProduct: builder.mutation({
            query: (data) => ({
                url: `/addProduct`,
                method: 'POST',
                body: data
            }),
        }),
        addProductImage: builder.mutation({
            query: (data) => ({
                url: `/addProductImage`,
                method: 'POST',
                body: data
            }),
        })
    }),
});

export const {
    useGetProductByIdQuery,
    useUpdateProductMutation,
    useAddProductMutation,
    useAddProductImageMutation
} = productApi;
