import { createSlice } from '@reduxjs/toolkit';

// const initialCart = typeof window !== 'undefined' && localStorage.getItem("cartData")
//   ? JSON.parse(localStorage.getItem("cartData"))
//   : [];

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    items: [], cart :[]
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
      console.log(action.payload);
    },
    addTocart:(state,action)=>{
      state.cart = [...state.cart,action.payload]
      console.log(state.cart);
      localStorage.setItem("cartData",JSON.stringify(state.cart))
    }
  },
});

// Action creators are generated for each case reducer function
export const { setItems ,addTocart} = counterSlice.actions;

export default counterSlice.reducer;
