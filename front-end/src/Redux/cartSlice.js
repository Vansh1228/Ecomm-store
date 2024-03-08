import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeFromCart(state, action) {
      const { id } = action.payload.data;

      // Check if the item's cartQuantity is 1
      if (action.payload.cartQuantity === 1) {
        // Filter out the item from the cartItems array
        const updateCartItems = state.filter((item) => item.data.id !== id);
        return updateCartItems;
      } else {
        // Decrease the cartQuantity of the item
        const updateCartItems = state.map((item) =>
          item.data.id === id
            ? { ...item, cartQuantity: item.cartQuantity - 1 }
            : item
        );
        return updateCartItems;
      }
    },
    addToCart(state, action) {
      console.log(action);
      const existingItem = state.find(
        (item) => item.data.id === action.payload.data.id
      );

      if (existingItem) {
        // If the item already exists in the cart, update its quantity
        return state.map((item) =>
          item.data.id === action.payload.data.id
            ? { ...item, cartQuantity: item.cartQuantity + 1 }
            : item
        );
      } else {
        // If the item does not exist in the cart, add it with quantity 1
        return [...state, { data: action.payload.data, cartQuantity: 1 }]; //We return an array because the initial state of the cart is an array
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
