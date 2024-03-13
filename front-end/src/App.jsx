import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ViewProduct from "./Components/ViewProduct";
import Shop from "./Pages/Shop";

import Login from "./Components/Login";
import Cart from "./Pages/Cart";
function App() {
  const token = localStorage.getItem("userToken");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={token ? <Shop /> : <Navigate to="/login" />} />
        <Route
          path="/shop"
          element={token ? <Navigate to="/" /> : <div>USER NOT LOGGED IN</div>}
        />
        <Route
          path="/cart"
          element={token ? <Cart /> : <Navigate to="/login" />}
        />
        <Route
          path="/product/:id"
          element={token ? <ViewProduct /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
