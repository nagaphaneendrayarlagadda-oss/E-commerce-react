import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    // 👑 ADMIN LOGIN (Hardcoded)
    if (username === "Phani123" && password === "Phani123") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", "Phani123");
      localStorage.setItem("role", "admin");

      navigate("/admin-products");
      return;
    }

    // 👤 USER LOGIN (Signup data)
    if (username === storedUsername && password === storedPassword) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);
      localStorage.setItem("role", "user");

      navigate("/products");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <>
      <Header />

      <div style={{ textAlign: "center", padding: "120px" }}>
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button onClick={handleLogin}>Login</button>

        <p>
          New user?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>

      <Footer />
    </>
  );
}

export default Login;
