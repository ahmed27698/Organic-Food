import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.cartItems.find((i) => i.id === item.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push({ ...item, quantity: 1 });
            }
        },
        increaseQuantity:(state,action)=>{
            const id = action.payload;
            const item = state.cartItems.find((i) => i.id === id)
            item.quantity +=1;
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== id);
        },

        decreaseQuantity: (state, action) => {
            const id = action.payload;
            const item = state.cartItems.find((i) => i.id === id);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else {
                state.cartItems = state.cartItems.filter((i) => i.id !== id);
            }
        },

        clearCart: (state) => {
            state.cartItems = [];
        },
    },
});

export const { addToCart, removeFromCart, decreaseQuantity, clearCart ,increaseQuantity} = cartSlice.actions;
export default cartSlice.reducer;
