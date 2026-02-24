import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const name = localStorage.getItem("username");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("cart");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <header>
      <h1>🛍️ MyShop KL University</h1>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>

        {isLoggedIn === "true" ? (
          <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
            Logout
          </button>
        ) : (
          <Link to="/login" style={{ marginLeft: "10px" }}>
            Login
          </Link>
        )}
      </nav>

      <div id="user-display">
        {name ? `Welcome, ${name}` : ""}
      </div>
    </header>
  );
}

export default Header;
