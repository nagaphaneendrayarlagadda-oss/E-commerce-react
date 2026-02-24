import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";

function Products1() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // ✅ Load products from localStorage (shared with admin)
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");

    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      axios.get("https://dummyjson.com/products")
        .then(res => {
          setProducts(res.data.products);
          localStorage.setItem(
            "products",
            JSON.stringify(res.data.products)
          );
        });
    }
  }, []);

  const handleAddToCart = (p) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    const cartData = JSON.parse(localStorage.getItem("cart")) || [];

    // ✅ Check if product already exists in cart
    const existingProduct = cartData.find(item => item.id === p.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cartData.push({ ...p, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cartData));

    navigate("/cart");
  };

  return (
    <>
      <Header />

      <section className="products">
        {products.map((p) => (
          <div className="product" key={p.id}>
            <img src={p.thumbnail} alt={p.title} />
            <h3>{p.title}</h3>
            <p>Category: {p.category}</p>
            <p>Price: ${p.price}</p>
            <button onClick={() => handleAddToCart(p)}>
              Add to Cart
            </button>
          </div>
        ))}
      </section>

      <Footer />
    </>
  );
}

export default Products1;
