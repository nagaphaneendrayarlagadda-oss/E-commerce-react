import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function AdminProducts() {

  // ✅ Protect Admin Page
  if (localStorage.getItem("role") !== "admin") {
    return <Navigate to="/admin-login" />;
  }

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    category: "",
    thumbnail: ""
  });

  // ✅ Load products (shared system)
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");

    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  // ✅ Delete product
  const handleDelete = (id) => {
    const updatedProducts = products.filter((p) => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  // ✅ Add product
  const handleAddProduct = () => {
    if (!newProduct.title || !newProduct.price) {
      alert("Please fill required fields");
      return;
    }

    const productToAdd = {
      ...newProduct,
      id: Date.now(),
      price: Number(newProduct.price)
    };

    const updatedProducts = [...products, productToAdd];

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    setNewProduct({
      title: "",
      price: "",
      category: "",
      thumbnail: ""
    });
  };

  return (
    <div className="container">
      <h1>👑 Admin Product Management</h1>

      {/* Add Product Form */}
      <div className="admin-form">
        <input
          type="text"
          placeholder="Title"
          value={newProduct.title}
          onChange={(e) =>
            setNewProduct({ ...newProduct, title: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.thumbnail}
          onChange={(e) =>
            setNewProduct({ ...newProduct, thumbnail: e.target.value })
          }
        />

        <button onClick={handleAddProduct}>
          Add Product
        </button>
      </div>

      {/* Product List */}
      <section className="products">
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map((p) => (
            <div className="product" key={p.id}>
              <img src={p.thumbnail} alt={p.title} width="120" />
              <h3>{p.title}</h3>
              <p>Category: {p.category}</p>
              <p>Price: ${p.price}</p>

              <button
                style={{ backgroundColor: "red" }}
                onClick={() => handleDelete(p.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default AdminProducts;
