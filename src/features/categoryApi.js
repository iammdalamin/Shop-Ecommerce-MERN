import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../helpers/SessionHelper";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
  baseQuery: fetchBaseQuery({ baseUrl: "https://shop-server-ymqb.onrender.com/api/v1" }),
  endpoints: (builder) => ({
    getAllCategories: builder.query({
        query: () => ({
            url: `/categories`,
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              "token": getToken(),
            },
          }),
    }),
 
  }),
});

export const {useGetAllCategoriesQuery} = categoryApi;
