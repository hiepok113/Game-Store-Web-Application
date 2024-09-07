import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        getCart: (state, action) => {
            state.cart = action.payload;
        },

        removeCart: (state, action) => {
            state.cart = [];
        },

        addCart: (state, action) => {
            state.cart.push(action.payload)
        },

        deleteCart: (state, action) => {
            state.cart.filter(cart => cart.id !== action.payload)
        }

    }
})

export const { getCart, addCart, deleteCart, removeCart } = cartSlice.actions;

export const selectCart = (state) => state.cart.cart;

export default cartSlice.reducer;