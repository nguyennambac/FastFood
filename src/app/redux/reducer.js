import { createSlice } from "@reduxjs/toolkit";
import { login } from "./UserAPI";

const initialState = {
    user: null,
    cart: [], // {_id, name, price, quantity, images}
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            const index = state.cart
                .findIndex(item => item._id.toString() ==
                    action.payload._id.toString());
            if (index >= 0) {
                state.cart[index].quantity += action.payload.quantity;
            } else {
                state.cart = [...state.cart, action.payload];
            }
        },
        changeQuantity: (state, action) => {
            const { productId, newQuantity } = action.payload;
            const index = state.cart.findIndex(item => item._id === productId);
            if (index !== -1) {
                state.cart[index].quantity = newQuantity;
            }
        },

        clearCart: (state, action) => {
            state.cart = [];
        },

        removeItemFromCart: (state, action) => {
            const productId = action.payload.productId;
            state.cart = state.cart.filter(item => item._id !== productId);
        },

        logout: (state, action) => {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            console.log("...Pending");
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload;
        });
        builder.addCase(login.rejected, (state, action) => {
            console.log("...Rejected");
        });
    }
});

export const { addItemToCart, logout, changeQuantity, removeItemFromCart, clearCart} = appSlice.actions;
export default appSlice.reducer;