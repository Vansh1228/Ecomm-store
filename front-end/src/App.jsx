import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import ViewProduct from "./Components/ViewProduct";
import Shop from "./Pages/Shop";
import Orders from "./Pages/Orders";
import Login from "./Components/Login";
import Cart from "./Pages/Cart";
import { useState, useEffect } from "react";
function App() {
  const [token, setToken] = useState(localStorage.getItem("userToken"))
  const [userId, setUserId] = useState()
console.log('USER ID', userId);

useEffect(() => {
  if (token) {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    setUserId(decodedToken.id);
  }
}, [token]);
  return (
    
    <Router>
      <Routes>
        <Route path="/login" element={<Login setToken = {setToken}/>} />

        <Route path="/" element={token ? <Shop userId = {userId} /> : <Navigate to="/login" />} />
        <Route
          path="/shop"
          element={token ? <Navigate to="/" /> : <div>USER NOT LOGGED IN</div>}
        />
        <Route
          path={`/cartitems/${userId}`}
          element={token ? <Cart userId = {userId} /> : <Navigate to="/login" />}
        />
        <Route
          path="/view/:id"
          element={token ? <ViewProduct /> : <Navigate to="/login" />}
        />
        <Route
          path={`/orders/${userId}`}
          element={token ? <Orders userId = {userId} /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
