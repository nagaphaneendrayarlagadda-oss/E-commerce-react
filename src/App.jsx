import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Products1 from "./components/Products1";
import Login from "./components/Login";
import Cart from "./components/Cart";
import SignUp from "./components/Signup";
import AdminProducts from "./components/AdminProducts";
import AdminLogin from "./components/AdminLogin";
import "./components/styles.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🌐 Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products1 />} />
        <Route path="/cart" element={<Cart />} />

        {/* 👤 User Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* 👑 Admin Section (Separate) */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-products" element={<AdminProducts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
