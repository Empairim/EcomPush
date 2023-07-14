import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// todo: move this to utils or .env
const API_BASE_URL = 'http://localhost:3001/api/v1';
const JWT = 'jwt';

export const tagsApi = createApi({
    reducerPath: 'tags',
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_BASE_URL}/tags/`, prepareHeaders: (headers) => {
            //headers.set('Authorization', `Bearer ${localStorage.getItem(JWT)}`);
            headers.set('token', localStorage.getItem(JWT));

            return headers;
        },
        //credentials: 'include'
    }),
    endpoints: (builder) => ({
        getTags: builder.query({
            query: () => `/`,
        }),
        //updateTag: builder.mutation({
        //    query: (data) => ({
        //        url: `/updateProduct`,
        //        method: 'PUT',
        //        body: data
        //    }),
        //}),
        addTag: builder.mutation({
            query: (data) => ({
                url: `/addTag`,
                method: 'POST',
                body: data
            }),
        }),
    }),
});

export const {
    useGetTagsQuery,
    useAddTagMutation,
} = tagsApi;
