import { PRODUCTS_URL,UPLOAD_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const productsApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getProducts: builder.query({
            query: (budget) => {
                let queryParams = '';
                if (budget) {
                    queryParams = `?budget=${budget}`;
                }
                return {
                    url: `${PRODUCTS_URL}${queryParams}`,
                };
            },
            providesTags: ['Product'],
            keepUnusedDataFor: 5
        }),
        getProductsDetails:builder.query({
            query:(productId)=>({
                url:`${PRODUCTS_URL}/${productId}`,
            }),
                keepUnusedDataFor:5,
        }),
        createProduct:builder.mutation({
            query:()=>({
                url:PRODUCTS_URL,
                method:'POST',
            }),
            invalidatesTags:['Product'],
        }),
        updateProduct:builder.mutation({
            query:(data)=>({
                url:`${PRODUCTS_URL}/${data.productId}`,
                method:'PUT',
                body:data,    
            }),
            invalidatesTags:['Product'],
        }),
        deleteProduct: builder.mutation({
            query:(productId)=>({
                url:`${PRODUCTS_URL}/${productId}`,
                method:'DELETE',  
            }),
        }),
        uploadProductImage:builder.mutation({
            query:(data)=>({
                url:`${UPLOAD_URL}`,
                method:'POST',
                body:data,
            })
        })
    }),
});

export const {useGetProductsQuery, useGetProductsDetailsQuery,
    useCreateProductMutation,useUpdateProductMutation,
    useDeleteProductMutation,useUploadProductImageMutation}=productsApiSlice;