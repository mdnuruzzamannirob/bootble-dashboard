import { baseApi } from "../../baseApi";

export const cmsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET TERMS & CONDITIONS
    getTerms: builder.query({
      query: () => `/public/terms`,
      providesTags: ["Terms"],
    }),

    // UPDATE TERMS & CONDITIONS
    updateTerms: builder.mutation({
      query: (data) => ({
        url: `/admin/terms`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Terms"],
    }),

    // GET PRIVACY POLICY
    getPrivacyPolicy: builder.query({
      query: () => `/public/privacy`,
      providesTags: ["PrivacyPolicy"],
    }),

    // UPDATE PRIVACY POLICY
    updatePrivacyPolicy: builder.mutation({
      query: (data) => ({
        url: `/admin/privacy`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PrivacyPolicy"],
    }),

    // GET ALL FAQs
    getFaq: builder.query({
      query: () => `/public/faqs`,
      providesTags: ["FAQ"],
    }),

    // CREATE FAQ
    createFaq: builder.mutation({
      query: (data) => ({
        url: `/admin/faqs`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["FAQ"],
    }),

    // UPDATE FAQ
    updateFaq: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/faqs/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["FAQ"],
    }),

    // DELETE FAQ
    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `/admin/faqs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FAQ"],
    }),
  }),
});

export const {
  useGetTermsQuery,
  useUpdateTermsMutation,
  useGetPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
  useGetFaqQuery,
  useUpdateFaqMutation,
  useCreateFaqMutation,
  useDeleteFaqMutation,
} = cmsApi;
