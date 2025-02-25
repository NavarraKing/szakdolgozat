import React, { useState, useEffect } from "react";

function Products({ token }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products", {
          headers: {
            token,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setProducts(data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Error during fetching products");
      }
    };
    fetchProducts();
  }, [token]);

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Products</h2>
        {error && <p className="text-danger">{error}</p>}
        <ul className="list-group">
          {products.map((product) => (
            <li key={product.id} className="list-group-item">{product.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Products;