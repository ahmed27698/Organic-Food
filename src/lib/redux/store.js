import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./addShoppingCart";
import wishListPage from './wishlist'
export const store = configureStore({
    reducer: {
        cart: cartSlice,
        wishList:wishListPage
    },
});
