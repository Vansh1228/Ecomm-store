import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("MyCart")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeFromCart(state, action) {
      const id = action.payload;

      const updatedState = { ...state };

      if (updatedState.hasOwnProperty(id)) {
        // If the item exists in the cart, decrease its quantity
        updatedState[id] -= 1; // Decrease quantity
      
        // If quantity reaches 0, remove the item from the cart
        if (updatedState[id] === 0) {
          delete updatedState[id]; // Remove item from cart
        }
      }
      localStorage.setItem("MyCart", JSON.stringify(updatedState));
      return updatedState;
    },

    addToCart(state, action) {
      const id = action.payload;

      const updatedState = { ...state };

      if (updatedState.hasOwnProperty(id)) {
        // If the item already exists in the cart, update its quantity
        updatedState[id] += 1; // Increment quantity
      } else {
        // If the item does not exist in the cart, add it with quantity 1
        updatedState[id] = 1;
      }
      localStorage.setItem("MyCart", JSON.stringify(updatedState));
      return updatedState;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
