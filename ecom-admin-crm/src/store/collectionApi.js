import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// todo: move this to utils or .env
const API_BASE_URL = 'http://localhost:3001/api/v1';
const JWT = 'jwt';

export const collectionApi = createApi({
    reducerPath: 'collections',
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_BASE_URL}/collections/`, prepareHeaders: (headers) => {
            //headers.set('Authorization', `Bearer ${localStorage.getItem(JWT)}`);
            headers.set('token', localStorage.getItem(JWT));

            return headers;
        },
        //credentials: 'include'
    }),
    endpoints: (builder) => ({
        getCollections: builder.query({
            query: () => `/`,
        }),
        addCollection: builder.mutation({
            query: (data) => ({
                url: `/addCollection`,
                method: 'POST',
                body: data
            }),
        }),
    }),
});

export const {
    useGetCollectionsQuery,
    useAddCollectionMutation,
} = collectionApi;

