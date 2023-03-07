import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query:()=>"list",
        }),
        singleProduct: builder.query({
            query:(slug)=> `/product/${slug}`
        })
    })
})

export const { useGetAllProductsQuery, useSingleProductQuery } = productsApi;
