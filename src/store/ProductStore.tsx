import axios from "axios";
import { create } from "zustand";

export const useProductStore = create((set)=>({
    products:[],
    loading:false,
    error:null,

    fetchProducts:async()=>{
        try {
            set({loading:true, error:null});

            const res = await axios.get('https://fakestoreapi.com/products');
            set({
                products:res.data,
                loading:false
            })
        } catch (error) {
            set({
                error: 'Failed to Fetch Products!',
                loading:false
            })
        }
    }
}))