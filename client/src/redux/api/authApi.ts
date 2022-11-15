import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SuccessResponse, RegisterRes, RegisterReq, LoginReq, LoginRes, LogoutRes } from './types';
import { setUser } from '../features';

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT || 'http://localhost:8080';

const transformResponse = <Data>(baseQueryReturnValue: SuccessResponse<Data>) => {
  return baseQueryReturnValue.data;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/auth/`,
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<RegisterRes, RegisterReq>({
      transformResponse,
      query(data) {
        return {
          url: 'register',
          method: 'POST',
          body: data,
        };
      },
    }),
    loginUser: builder.mutation<LoginRes, LoginReq>({
      transformResponse,
      query(data) {
        return {
          url: 'login',
          method: 'POST',
          body: data,
          credentials: 'include',
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
    }),
    logoutUser: builder.mutation<LogoutRes, void>({
      transformResponse,
      query() {
        return {
          url: 'logout',
          credentials: 'include',
        };
      },
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation, useLogoutUserMutation } = authApi;
