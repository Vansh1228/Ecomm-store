import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import cartSlice from "./Redux/cartSlice.js";
import fetchSlice from "./Redux/FetchProductSlice.js";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    AllProducts: fetchSlice,
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
