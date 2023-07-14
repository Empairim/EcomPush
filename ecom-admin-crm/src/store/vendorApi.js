import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// todo: move this to utils or .env
const API_BASE_URL = 'http://localhost:3001/api/v1';
const JWT = 'jwt';

export const vendorsApi = createApi({
    reducerPath: 'vendors',
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_BASE_URL}/vendors/`, prepareHeaders: (headers) => {
            //headers.set('Authorization', `Bearer ${localStorage.getItem(JWT)}`);
            headers.set('token', localStorage.getItem(JWT));

            return headers;
        },
        //credentials: 'include'
    }),
    endpoints: (builder) => ({
        getVendors: builder.query({
            query: () => `/`,
        }),
        addVendor: builder.mutation({
            query: (data) => ({
                url: `/addVendor`,
                method: 'POST',
                body: data
            }),
        }),
    }),
});

export const {
    useGetVendorsQuery,
    useAddVendorMutation,
} = vendorsApi;
