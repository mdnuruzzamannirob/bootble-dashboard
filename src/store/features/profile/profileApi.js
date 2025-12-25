import { baseApi } from "../../baseApi";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // UPDATE PROFILE
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/users/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    // CHANGE PASSWORD
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/users/change-password",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useUpdateProfileMutation, useChangePasswordMutation } =
  profileApi;
