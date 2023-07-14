import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// todo: move this to utils or .env
const API_BASE_URL = 'http://localhost:3001/api/v1';
const JWT = 'jwt';

export const typesApi = createApi({
    reducerPath: 'types',
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_BASE_URL}/types/`, prepareHeaders: (headers) => {
            //headers.set('Authorization', `Bearer ${localStorage.getItem(JWT)}`);
            headers.set('token', localStorage.getItem(JWT));

            return headers;
        },
        //credentials: 'include'
    }),
    endpoints: (builder) => ({
        getTypes: builder.query({
            query: () => `/`,
        }),
        addTypes: builder.mutation({
            query: (data) => ({
                url: `/addType`,
                method: 'POST',
                body: data
            }),
        }),
    }),
});

export const {
    useGetTypesQuery,
    useAddTypesMutation,
} = typesApi;
