import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../helpers/SessionHelper";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "list",
    }),
    singleProduct: builder.query({
      query: (slug) => `/product/${slug}`,
    }),
    productAdd: builder.mutation({
      query: (body) => ({
        url: `/productAdd`,
        method: "POST",
        body,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          token: getToken(),
        },
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useSingleProductQuery,
  useProductAddMutation,
} = productsApi;
