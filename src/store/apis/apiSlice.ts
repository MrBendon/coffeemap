import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CoffeeDataType } from "../coffeeSlice";

export const coffeeApi = createApi({
  reducerPath: "coffeeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/cafes" }),
  // baseQuery: fetchBaseQuery({ baseUrl: "https://cafenomad.tw/api/v1.2/" }),
  endpoints: (builder) => ({
    getAllCoffee: builder.query<CoffeeDataType[], void>({
      query: () => "",
    }),
  }),
});

export const { useGetAllCoffeeQuery } = coffeeApi;
