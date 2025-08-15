import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wishListItems: [],
};

const wishListPage = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addWhish: (state, action) => {
            const item = action.payload;
            const existingItem = state.wishListItems.find((i) => i.id === item.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.wishListItems.push({ ...item, quantity: 1 });
            }
        },
        clearWhishes: (state) => {
            state.wishListItems = [];
        },
    },
});

export const { addWhish,clearWhishes} = wishListPage.actions;
export default wishListPage.reducer;
