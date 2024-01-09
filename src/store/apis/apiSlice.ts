import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CoffeeDataType } from "../coffeeSlice";

export const coffeeApi = createApi({
  reducerPath: "coffeeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/cafes" }),
  endpoints: (builder) => ({
    getAllCoffee: builder.query<CoffeeDataType[], void>({
      query: () => "",
    }),
  }),
});

export const { useGetAllCoffeeQuery } = coffeeApi;
