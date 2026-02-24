import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, [navigate]);

  const increaseQty = (index) => {
    const temp = [...cartItems];
    temp[index].quantity += 1;
    setCartItems(temp);
    localStorage.setItem("cart", JSON.stringify(temp));
  };

  const decreaseQty = (index) => {
    const temp = [...cartItems];
    if (temp[index].quantity > 1) {
      temp[index].quantity -= 1;
      setCartItems(temp);
      localStorage.setItem("cart", JSON.stringify(temp));
    }
  };

  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Header />

      <div style={{ paddingTop: "120px", textAlign: "center" }}>
        <h1>Your Cart</h1>

        {cartItems.length === 0 ? (
          <h3>No items in cart</h3>
        ) : (
          <div className="products">
            {cartItems.map((item, index) => (
              <div className="product" key={item.id}>
                <img src={item.thumbnail} alt={item.title} />
                <h3>{item.title}</h3>
                <p>Price: ${item.price}</p>

                <button onClick={() => decreaseQty(index)}>-</button>
                <span style={{ margin: "0 10px" }}>
                  Qty: {item.quantity}
                </span>
                <button onClick={() => increaseQty(index)}>+</button>

                <br /><br />
                <button onClick={() => removeItem(index)}>Delete</button>
              </div>
            ))}

            <h2>Total: ${totalPrice}</h2>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Cart;
