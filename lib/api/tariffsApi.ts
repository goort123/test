import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Tariff } from '../types/tariff';

export const tariffsApi = createApi({
  reducerPath: 'tariffsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://t-core.fit-hub.pro' }),
  endpoints: (builder) => ({
    getTariffs: builder.query<Tariff[], void>({
      query: () => '/Test/GetTariffs',
    }),
  }),
});

export const { useGetTariffsQuery } = tariffsApi;
