import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
// import {PrivateRoute} from "react-router-dom"
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import ThemeConfig from "./ThemeConfig";
import Shop from "./Pages/Shop";
import { ImgMediaCard } from "./Components/Card";
import Login from "./Components/Login";
import Products from "./Pages/Products";
import PrivateRoute from "./PrivateRoute";
function App() {
  const [items, setItems] = useState([]);

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
      </Routes>
      </Router>

      {/* <ThemeConfig/> */}
    </>
  );
}

export default App;
