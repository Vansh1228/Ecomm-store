import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProd = createAsyncThunk("fetchProd", async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; 
  }
});
const initialState = [];
const fetchSlice = createSlice({
  name: "AllProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProd.fulfilled, (state = initialState, action) => {
      return action.payload;
    });
  },
});

export default fetchSlice.reducer;
