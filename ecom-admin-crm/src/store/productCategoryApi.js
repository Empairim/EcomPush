import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// todo: move this to utils or .env
const API_BASE_URL = 'http://localhost:3001/api/v1';
const JWT = 'jwt';

export const categoryApi = createApi({
    reducerPath: 'categories',
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_BASE_URL}/categories/`, prepareHeaders: (headers) => {
            //headers.set('Authorization', `Bearer ${localStorage.getItem(JWT)}`);
            headers.set('token', localStorage.getItem(JWT));

            return headers;
        },
        //credentials: 'include'
    }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => `/`,
        }),
        addCategory: builder.mutation({
            query: (data) => ({
                url: `/addCategory`,
                method: 'POST',
                body: data
            }),
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useAddCategoryMutation,
} = categoryApi;
