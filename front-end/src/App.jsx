import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ViewProduct from "./Components/ViewProduct";
import Shop from "./Pages/Shop";

import Login from "./Components/Login";
import Cart from "./Pages/Cart";
function App() {
  const [token, setToken] = useState(localStorage.getItem("userToken"));


  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          {token ? (
            <>
              <Route path="/shop" element={<Shop />} />
              <Route path="/" element={<Navigate to="/shop" />} />
            </>
          ) : (
            <Route path="/" element={<Navigate to="/login" />} />
          )}
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ViewProduct />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
