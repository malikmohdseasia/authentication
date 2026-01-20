import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts:any = createAsyncThunk('fetch/products', 
    async()=>{
        const res = await axios.get('https://fakestoreapi.com/products');
        return res.data
    }
);

const productSlice = createSlice({
    name:'products',
    initialState:{
        data:[],
        loading:false,
        isError:null,
    },

    reducers:{},

    extraReducers:(builder)=>{
        builder
        .addCase(fetchProducts.pending, (state)=>{
            state.loading = true;
        })
        .addCase(fetchProducts.fulfilled, (state, action)=>{
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(fetchProducts.rejected, (state:any)=>{
            state.loading = false;
            state.isError = 'failed to fetech data'
        });
    }
})

export default productSlice.reducer