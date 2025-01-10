// import { createSlice } from "@reduxjs/toolkit";

// const initialState = JSON.parse(localStorage.getItem("MyCart")) || [];

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     removeFromCart(state, action) {
//       const id = action.payload;

//       const updatedState = { ...state };

//       if (updatedState.hasOwnProperty(id)) {
//         // If the item exists in the cart, decrease its quantity
//         updatedState[id] -= 1; // Decrease quantity
      
//         // If quantity reaches 0, remove the item from the cart
//         if (updatedState[id] === 0) {
//           delete updatedState[id]; // Remove item from cart
//         }
//       }
//       localStorage.setItem("MyCart", JSON.stringify(updatedState));
//       return updatedState;
//     },

//     addToCart(state, action) {
//       const id = action.payload;

//       const updatedState = { ...state };

//       if (updatedState.hasOwnProperty(id)) {
//         // If the item already exists in the cart, update its quantity
//         updatedState[id] += 1; // Increment quantity
//       } else {
//         // If the item does not exist in the cart, add it with quantity 1
//         updatedState[id] = 1;
//       }
//       localStorage.setItem("MyCart", JSON.stringify(updatedState));
//       return updatedState;
//     },
//   },
// });

// export const { addToCart, removeFromCart } = cartSlice.actions;
// export default cartSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch cart items for a user
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId) => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/cartitems/${userId}`);
    return response.data;
  }
);

// Add item to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, userId }) => {
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/cartitems/add_to_cart`, {
      product_id: productId,
      user_id: userId,
    });
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/cartitems/${userId}`);
    return response.data;
  }
);

// Remove item from cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, userId }) => {
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/cartitems/remove_from_cart`, {
      product_id: productId,
      user_id: userId,
    });
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/cartitems/${userId}`);
    return response.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
     
      .addCase(fetchCartItems.fulfilled, (state, action) => {
       
          state.items = action.payload.reduce((acc, item) => {
        acc[item.product_id] = item.quantity;
        return acc;
      }, {});
        
      })
     
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.reduce((acc, item) => {
          acc[item.product_id] = item.quantity;
          return acc;
        }, {});
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items= action.payload.reduce((acc, item) => {
          acc[item.product_id] = item.quantity;
          return acc;
        }, {});
      });
     
  },
});

export default cartSlice.reducer;
