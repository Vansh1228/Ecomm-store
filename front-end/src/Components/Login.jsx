import { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";
function Login({ setToken }) {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginHandler = () => {
    axios({
      url: "https://fakestoreapi.com/auth/login",
      method: "POST",
      data: {
        username: userName,
        password: userPassword,
      },
    })
      .then((res) => {
        console.log(res.data.token);
        setToken(res.data.token);
        navigate("/shop");
        localStorage.setItem("userToken", res.data.token);
        setError("");
        setUserName("");
        setUserPassword("");
      })
      .catch((err) => {
        console.log(err.response);
        setError(err.response.data);
      });
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
