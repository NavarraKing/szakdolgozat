import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthProvider.jsx";
import { Card, Button, Modal, DropdownButton, Dropdown } from "react-bootstrap";

function Products() {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false); 
  const [orderBy, setOrderBy] = useState("id");
  const [isDescending, setIsDescending] = useState(false);

  const displayOrderBy = {
    id: "ID",
    displayname: "Name",
    price: "Price",
    stock: "Stock",
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (isDescending) {
      return b[orderBy] > a[orderBy] ? 1 : -1;
    }
    return a[orderBy] > b[orderBy] ? 1 : -1;
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setProducts(data.sort((a, b) => a.id - b.id)); 
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Error during fetching products");
      }
    };
    fetchProducts();
  }, [token]);

  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Products</h1>
      {error && <p className="text-danger text-center">{error}</p>}
      <div className="d-flex align-items-center mb-3">
        <DropdownButton
          title={`Order By: ${displayOrderBy[orderBy]}`}
          onSelect={(e) => setOrderBy(e)}
          className="me-2"
        >
          <Dropdown.Item eventKey="id">ID</Dropdown.Item>
          <Dropdown.Item eventKey="displayname">Name</Dropdown.Item>
          <Dropdown.Item eventKey="price">Price</Dropdown.Item>
          <Dropdown.Item eventKey="stock">Stock</Dropdown.Item>
        </DropdownButton>
        <Button
          variant="light"
          onClick={() => setIsDescending(!isDescending)}
        >
          <img
            src="images/icons/sort/sort-32.png"
            alt="Sort"
            style={{ transform: isDescending ? "rotate(180deg)" : "none" }}
          />
        </Button>
      </div>
      <div className="row">
        {sortedProducts.map((product) => (
          <div className="col-md-4 col-sm-6 mb-4" key={product.id}>
            <Card className="h-100 shadow-sm position-relative">
              <Card.Img
                variant="top"
                src={product.image_url}
                alt={product.displayname}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Button
                variant="link"
                className="position-absolute top-0 end-0 m-2 p-0"
                onClick={() => handleShowModal(product)}
                style={{ zIndex: 1 }}
              >
                <img
                  src="images/icons/expand/expand-32.png"
                  alt="Expand"
                  style={{ width: "24px", height: "24px" }}
                />
              </Button>
              <Card.Body>
                <Card.Title className="text-truncate">{product.displayname}</Card.Title>
                <Card.Text>
                  {product.description.length > 50 ? (
                    <>
                      {product.description.substring(0, 50)}...{" "}
                      <Button
                        variant="link"
                        className="p-0"
                        onClick={() => handleShowModal(product)}
                      >
                        Click to expand
                      </Button>
                    </>
                  ) : (
                    product.description
                  )}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Card.Text className="fw-bold">${product.price}</Card.Text>
                  <Card.Text className="fw-bold text-muted">Stock: {product.stock}</Card.Text>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        {selectedProduct && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedProduct.displayname}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                src={selectedProduct.image_url}
                alt={selectedProduct.displayname}
                className="img-fluid mb-3"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
              <p>{selectedProduct.description}</p>
              <p className="fw-bold">Price: ${selectedProduct.price}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}

export default Products;