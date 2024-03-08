import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const indiProd = createAsyncThunk("indiProd", async (productId) => {
  const response = await axios.get(
    `https://fakestoreapi.com/products/${productId}`
  );

  return response.data;
});

const initialState = [];
const indiSlice = createSlice({
  name: "indiProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(indiProd.fulfilled, (state, action) => {
      return [action.payload];
    });
  },
});

export default indiSlice.reducer;
