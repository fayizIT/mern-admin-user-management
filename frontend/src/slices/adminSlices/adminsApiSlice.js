import { apiSlice } from "../apiSlice";
const ADMIN_URL = '/api/admin';

export const adminsApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
      adminLogin:builder.mutation({
          query:(data)=>({
              url:`${ADMIN_URL}/login`,
              method:'POST',
              body:data
          })
      }),
      adminLogout:builder.mutation({
          query:()=>({
              url:`${ADMIN_URL}/logout`,
              method:'POST'
          })
      }),
      deleteUser:builder.mutation({
        query:(data)=>({
            url:`${ADMIN_URL}/delete-user`,
            method:'POST',
            body:data
        })
      }),
      updateUser: builder.mutation({
            
        query: (data) => ({
            url: `${ADMIN_URL}/update-user`,
            method: 'PUT',
            body: data
        })

    })
      
    })
})

export const { useAdminLoginMutation,
    useAdminLogoutMutation,
    useDeleteUserMutation,
} = adminsApiSlice;