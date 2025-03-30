import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthProvider.jsx";
import { Form, Button, Container, Row, Col, Table, Alert, Modal, Card } from "react-bootstrap";

function Seller() {
  const { token, user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setProducts(data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Error fetching products.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [token]);

  const getRemainingStock = (productId) => {
    const cartItem = cart.find((item) => item.id === productId);
    const product = products.find((p) => p.id === productId);
    return product ? product.stock - (cartItem?.quantity || 0) : 0;
  };

  const handleAddToCart = () => {
    if (!selectedProduct || quantity <= 0) {
      setError("Please select a product and enter a valid quantity.");
      return;
    }
    const remainingStock = getRemainingStock(selectedProduct.id);
    if (quantity > remainingStock) {
      setError("Cannot add more than available stock.");
      return;
    }
    const existingItem = cart.find((item) => item.id === selectedProduct.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === selectedProduct.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { ...selectedProduct, quantity }]);
    }
    setError("");
    setSelectedProduct(null);
    setQuantity(1);
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const handleCheckout = async () => {
    if (cart.length === 0 || !paymentMethod) {
      setError("Cart is empty or payment method is not selected.");
      return;
    }
    setShowCheckoutModal(true);
  };

  const confirmCheckout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/receipts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart.map(({ id, quantity }) => ({ id, quantity })),
          payment_method: paymentMethod,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setReceiptData({
          transactionId: data.transactionId,
          cashierId: user.id,
          date: new Date().toLocaleString(),
          items: cart,
          total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
          paymentMethod: paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1),
        });
        setCart([]);
        setPaymentMethod("");
        setShowCheckoutModal(false);
        setShowReceiptModal(true);
        fetchProducts();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Error completing transaction.");
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Sales Terminal</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Row>
        <Col md={6}>
          <h3>Add Items</h3>
          <Form.Group className="mb-3">
            <Form.Label>Select Product</Form.Label>
            <Form.Control
              as="select"
              value={selectedProduct?.id || ""}
              onChange={(e) => {
                const product = products.find((p) => p.id === parseInt(e.target.value, 10));
                if (product) {
                  const remainingStock = getRemainingStock(product.id);
                  if (remainingStock === 0) {
                    setError("This item is out of stock.");
                    setSelectedProduct(null);
                  } else {
                    setError("");
                    setSelectedProduct(product);
                  }
                }
              }}
            >
              <option value="">Select a product</option>
              {products.map((product) => {
                const remainingStock = getRemainingStock(product.id);
                return (
                  <option
                    key={product.id}
                    value={product.id}
                    disabled={remainingStock === 0}
                    style={{
                      backgroundColor: remainingStock === 0 ? "#eaeaea" : "white",
                    }}
                  >
                    {product.displayname} - ${product.price}{" "}
                    <span style={{ float: "right" }}>Stock: {remainingStock}</span>
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          {selectedProduct?.price === 0 && (
            <Alert variant="warning" style={{ backgroundColor: "#fff3cd" }}>
              Warning: This product is free.
            </Alert>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max={getRemainingStock(selectedProduct?.id) || 1}
              value={quantity}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10) || 1;
                const maxStock = getRemainingStock(selectedProduct?.id);
                setQuantity(value > maxStock ? maxStock : value);
              }}
              disabled={!selectedProduct}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </Col>

        <Col md={6}>
          <h3>Cart</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price/pcs</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.displayname}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                  <td>${item.price * item.quantity}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <hr />
          <h5>Total: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</h5>
          <Form.Group className="mb-3">
            <Form.Label>Payment Method</Form.Label>
            <Form.Control
              as="select"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">Select Payment Method</option>
              <option value="cash">Cash</option>
              <option value="card">Card</option>
            </Form.Control>
          </Form.Group>
          <div className="d-flex justify-content-between">
            <Button variant="danger" onClick={() => setCart([])}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        </Col>
      </Row>

      <Modal show={showCheckoutModal} onHide={() => setShowCheckoutModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Has the buyer paid for the items?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCheckoutModal(false)}>
            No
          </Button>
          <Button variant="success" onClick={confirmCheckout}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showReceiptModal} onHide={() => setShowReceiptModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Receipt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {receiptData && (
            <Card>
              <Card.Body>
                <h5>Receipt</h5>
                <p>Transaction ID: {receiptData.transactionId}</p>
                <p>Cashier ID: {receiptData.cashierId}</p>
                <p>Date: {receiptData.date}</p>
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {receiptData.items.map((item) => (
                      <tr key={item.id}>
                        <td>{item.displayname}</td>
                        <td>{item.quantity}</td>
                        <td>${item.price}</td>
                        <td>${item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <h5>Total: ${receiptData.total}</h5>
                <p>Payment Method: {receiptData.paymentMethod}</p>
              </Card.Body>
            </Card>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowReceiptModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Seller;
