// import { useState } from "react";
// import axios from "axios";
// import "./Login.css";
// import { useNavigate } from "react-router-dom";
// function Login({setToken}) {
//   const [userName, setUserName] = useState("");
//   const [userPassword, setUserPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const loginHandler = async () => {
//     try {
//       const response = await axios.post("https://fakestoreapi.com/auth/login", {
//         username: userName,
//         password: userPassword,
//       });

//       localStorage.setItem("userToken", response.data.token);
//       setToken(response.data.token)
//       setError("");
//       setUserName("");
//       setUserPassword("");
//       navigate("/shop");
//     } catch (error) {
//       setError(error.response.data);
//     }
//   };

//   return (
//     <>
//       <div className="container">
//         <div className="login">
//           <input
//             value={userName}
//             type="text"
//             placeholder="Username"
//             onChange={(e) => setUserName(e.target.value)}
//           />{" "}
//           <input
//             value={userPassword}
//             type="password"
//             placeholder="Password"
//             onChange={(e) => setUserPassword(e.target.value)}
//           />
//           {error && <small>{error}</small>}
//           <button onClick={loginHandler}>Login</button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;

import { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
function Login({ setToken}) {
  const [userName, setUserName] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isSignInMode, setIsSignInMode] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const response = await axios.post(
      `http://localhost:4000/api/accounts/sign_in`,
      {
        email: userName,
        password_hash: userPassword,
      }
    );

    const { account, token } = response.data;
    console.log(account);
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    // Save user data and token to localStorage or sessionStorage
    // localStorage.setItem("userData", JSON.stringify(account));
    localStorage.setItem("userToken", token);
    // Update token state in parent component
    setToken(token);

    // Clear form fields and error message
    setError("");
    setUserName("");
    setUserPassword("");

    // Redirect to the desired page
    navigate("/shop");
  };
  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/accounts/create`,
        {
          account: {
            email: userName,
            full_name: userFullName,
            password_hash: userPassword,
          },
        }
      );

      const { account, token } = response.data;
      // Save user data and token to localStorage or sessionStorage
      // localStorage.setItem("userData", JSON.stringify(account));
      localStorage.setItem("userToken", token);

      // Update token state in parent component
      setToken(token);

      // Clear form fields and error message
      setError("");
      setUserName("");
      setUserFullName("");
      setUserPassword("");

      // Redirect to the desired page
      navigate("/shop");
    } catch (error) {
      // Display error message
      setError(error.response.data.message || "An error occurred");
    }
  };

  const handleSubmit = () => {
    if (isSignInMode) {
      handleSignIn();
    } else {
      handleSignUp();
    }
  };

  return (
    <div className="container">
      <div className="login">
        {isSignInMode ? (
          <>
            <input
              value={userName}
              type="text"
              placeholder="Email"
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              value={userPassword}
              type="password"
              placeholder="Password"
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </>
        ) : (
          <>
            <input
              value={userFullName}
              type="text"
              placeholder="Full Name"
              onChange={(e) => setUserFullName(e.target.value)}
            />
            <input
              value={userName}
              type="text"
              placeholder="Email"
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              value={userPassword}
              type="password"
              placeholder="Password"
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </>
        )}
        {error && <small>{error}</small>}
        <button onClick={handleSubmit}>
          {isSignInMode ? "Sign In" : "Create Account"}
        </button>
        <button onClick={() => setIsSignInMode(!isSignInMode)}>
          {isSignInMode ? "Create Account" : "Sign In"}
        </button>
      </div>
    </div>
  );
}

export default Login;
