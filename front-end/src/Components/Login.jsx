import { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";
function Login() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      const response = await axios.post("https://fakestoreapi.com/auth/login", {
        username: userName,
        password: userPassword,
      });

      localStorage.setItem("userToken", response.data.token);
      setError("");
      setUserName("");
      setUserPassword("");
      navigate("/shop");
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <>
      <div className="container">
        <div className="login">
          <input
            value={userName}
            type="text"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
          />{" "}
          <input
            value={userPassword}
            type="password"
            placeholder="Password"
            onChange={(e) => setUserPassword(e.target.value)}
          />
          {error && <small>{error}</small>}
          <button onClick={loginHandler}>Login</button>
        </div>
      </div>
    </>
  );
}

export default Login;
