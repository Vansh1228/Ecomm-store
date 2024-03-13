import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProd = createAsyncThunk("fetchProd", async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  // console.log(response.data);
  return response.data;
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
