import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthProvider.jsx";
import { Form, Button, Container, Row, Col, Alert, Modal, Card, Table, DropdownButton, Dropdown } from "react-bootstrap";

function ProductsManager() {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    id: 0,
    itemname: "",
    displayname: "",
    price: "",
    stock: "",
    image_url: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [productIds, setProductIds] = useState([]);
  const [maxProductId, setMaxProductId] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState("");
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [restockAmount, setRestockAmount] = useState(0);
  const [applySameAmount, setApplySameAmount] = useState(false);
  const [restockMode, setRestockMode] = useState("ADD");
  const [individualAmounts, setIndividualAmounts] = useState({});
  const [individualModes, setIndividualModes] = useState({});

  const defaultImageUrl = "https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png";

  const handleResetImageUrl = () => {
    setProduct({ ...product, image_url: defaultImageUrl });
  };

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
        setProductIds(data.map((p) => ({ id: p.id, name: p.itemname })));
        setMaxProductId(data.length);
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

  const resetProductFields = () => {
    setProduct({
      id: 0,
      itemname: "",
      displayname: "",
      price: "",
      stock: "",
      image_url: "",
      description: "",
    });
    setTempImageUrl("");
    setError("");
    setSuccess("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "price" || name === "stock") {
      const numericValue = Math.max(0, parseInt(value, 10) || 0);
      setProduct({ ...product, [name]: numericValue });
    } else if (name === "id" && parseInt(value, 10) === 0) {
      setProduct({
        id: 0,
        itemname: "",
        displayname: "",
        price: "",
        stock: "",
        image_url: "",
        description: "",
      });
      setError("");
      setSuccess("");
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSelectProduct = (e) => {
    const selectedId = parseInt(e.target.value, 10);
    if (selectedId === 0) {
      setProduct({
        id: 0,
        itemname: "",
        displayname: "",
        price: "",
        stock: "",
        image_url: "",
        description: "",
      });
      setError("");
      setSuccess("");
    } else {
      setProduct({ ...product, id: selectedId });
    }
  };

  const fetchProductDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setProduct({
          id: data.id,
          itemname: data.itemname,
          displayname: data.displayname,
          price: data.price,
          stock: data.stock,
          image_url: data.image_url,
          description: data.description,
        });
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Error fetching product details.");
    }
  };

  useEffect(() => {
    if (product.id && product.id !== 0) {
      fetchProductDetails(product.id);
    }
  }, [product.id]);

  const handleAddProduct = async () => {
    setError("");
    setSuccess("");

    const productToSend = {
      ...product,
      price: product.price || 0,
      stock: product.stock || 0,
      image_url: product.image_url || "https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png",
    };

    if (!productToSend.itemname || !productToSend.displayname || productToSend.description.trim() === "") {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productToSend),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess("Product added successfully!");
        resetProductFields();
        fetchProducts();
        setShowAddModal(false);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Error adding product.");
    }
  };

  const handleUpdateProduct = async () => {
    if (window.confirm("Are you sure you want to update this product?")) {
      const productToSend = {
        ...product,
        price: product.price || 0,
        stock: product.stock || 0,
      };

      if (!productToSend.itemname || !productToSend.displayname || productToSend.description.trim() === "") {
        setError("All fields are required.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/products/${product.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(productToSend),
        });
        const data = await response.json();
        if (response.ok) {
          setSuccess("Product updated successfully!");
          fetchProducts();
          resetProductFields();
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Error updating product.");
      }
    }
  };

  const handleDeleteProduct = async () => {
    if (!product.id) {
      setError("No product selected to delete.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${product.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setSuccess("Product deleted successfully!");
          setProduct({ id: 0, itemname: "", displayname: "", price: "", stock: "", image_url: "", description: "" });
          fetchProducts();
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Error deleting product.");
      }
    }
  };

  const handleImageUpload = () => {
    const img = new Image();
    img.src = tempImageUrl;
    img.onload = () => {
      setProduct({ ...product, image_url: tempImageUrl });
      setTempImageUrl("");
      setError("");
    };
    img.onerror = () => {
      setError("Invalid image URL.");
    };
  };

  const handleImagePreview = () => {
    const img = new Image();
    img.src = tempImageUrl;
    img.onload = () => {
      setProduct({ ...product, image_url: tempImageUrl });
      setTempImageUrl("");
      setError("");
    };
    img.onerror = () => {
      setError("Invalid image URL.");
    };
  };

  const handleAddProductClick = () => {
    resetProductFields();
    setShowAddModal(true);
  };

  const handleRestock = async () => {
    if (selectedProducts.length === 0) {
      setError("No products selected for restocking.");
      return;
    }

    const restockData = selectedProducts.map((productId) => ({
      id: productId,
      amount: applySameAmount ? restockAmount : individualAmounts[productId] || 0,
    }));

    try {
      const response = await fetch("http://localhost:5000/api/products/restock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ restockData, mode: restockMode }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess("Products restocked successfully!");
        fetchProducts();
        setShowRestockModal(false);
        setSelectedProducts([]);
        setRestockAmount(0);
        setApplySameAmount(false);
        setIndividualAmounts({});
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Error restocking products.");
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Products Manager</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="id">
              <Form.Label>Product ID</Form.Label>
              <Form.Control
                as="select"
                name="id"
                value={product.id}
                onChange={handleSelectProduct}
              >
                <option value={0}>Select Product</option>
                {productIds.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.id} - {p.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={8}>
            <Form.Group controlId="itemname">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                name="itemname"
                value={product.itemname}
                onChange={handleInputChange}
                disabled={product.id === 0}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="displayname">
              <Form.Label>Display Name</Form.Label>
              <Form.Control
                type="text"
                name="displayname"
                value={product.displayname}
                onChange={handleInputChange}
                disabled={product.id === 0}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                min="0"
                disabled={product.id === 0}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="stock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleInputChange}
                min="0"
                disabled={product.id === 0}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="image_url">
              <Form.Label>Image URL</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  name="image_url"
                  value={tempImageUrl}
                  onChange={(e) => setTempImageUrl(e.target.value)}
                  disabled={product.id === 0}
                />
                <Button
                  variant="primary"
                  onClick={handleImagePreview}
                  className="ms-2"
                  disabled={product.id === 0}
                >
                  Preview
                </Button>
              </div>
              {product.image_url && (
                <Card className="mt-3 position-relative">
                  <Card.Img
                    variant="top"
                    src={product.image_url}
                    alt="Product"
                    style={{ maxHeight: "200px", objectFit: "cover" }}
                  />
                  {product.image_url !== defaultImageUrl && (
                    <Button
                      variant="danger"
                      size="sm"
                      className="position-absolute top-0 end-0 m-2"
                      style={{
                        borderRadius: "50%",
                        width: "24px",
                        height: "24px",
                        padding: "0",
                        lineHeight: "1",
                      }}
                      onClick={handleResetImageUrl}
                    >
                      X
                    </Button>
                  )}
                </Card>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={product.description}
                onChange={handleInputChange}
                disabled={product.id === 0}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={3}>
            <Button variant="primary" className="w-100" onClick={handleAddProductClick}>
              Add Product
            </Button>
          </Col>
          <Col md={3}>
            <Button
              variant="info"
              className="w-100"
              onClick={() => setShowRestockModal(true)}
            >
              Restock Products
            </Button>
          </Col>
          <Col md={3}>
            <Button
              variant="success"
              className="w-100"
              onClick={handleUpdateProduct}
              disabled={product.id === 0}
            >
              Update Product
            </Button>
          </Col>
          <Col md={3}>
            <Button
              variant="danger"
              className="w-100"
              onClick={handleDeleteProduct}
              disabled={product.id === 0}
            >
              Delete Product
            </Button>
          </Col>
        </Row>
      </Form>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newItemName" className="mb-3">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                name="itemname"
                value={product.itemname}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="newDisplayName" className="mb-3">
              <Form.Label>Display Name</Form.Label>
              <Form.Control
                type="text"
                name="displayname"
                value={product.displayname}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group controlId="newPrice" className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleInputChange}
                    min="0"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="newStock" className="mb-3">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    name="stock"
                    value={product.stock}
                    onChange={handleInputChange}
                    min="0"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="newImageUrl" className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image_url"
                value={tempImageUrl}
                onChange={(e) => setTempImageUrl(e.target.value)}
              />
              <Button variant="primary" onClick={handleImageUpload} className="mt-2">
                Upload
              </Button>
            </Form.Group>
            <Form.Group controlId="newDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={product.description}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddProduct}>
            Add Product
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showRestockModal}
        onHide={() => setShowRestockModal(false)}
        centered
        dialogClassName="restock-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Restock Products</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "600px", overflowY: "auto", minHeight: "600px" }}> 
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select Products</Form.Label>
              <DropdownButton
                title="Select Products"
                className="w-100"
                variant="secondary"
                autoClose={false} 
              >
                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                  <Dropdown.Item as="div">
                    <Form.Check
                      type="checkbox"
                      label="Select All"
                      checked={selectedProducts.length === products.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedProducts(products.map((product) => product.id));
                        } else {
                          setSelectedProducts([]);
                        }
                      }}
                    />
                  </Dropdown.Item>
                  {products.map((product) => (
                    <Dropdown.Item key={product.id} as="div">
                      <Form.Check
                        type="checkbox"
                        label={`${product.itemname} (Stock: ${product.stock})`}
                        checked={selectedProducts.includes(product.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProducts([...selectedProducts, product.id]);
                          } else {
                            setSelectedProducts(
                              selectedProducts.filter((id) => id !== product.id)
                            );
                          }
                        }}
                      />
                    </Dropdown.Item>
                  ))}
                </div>
              </DropdownButton>
            </Form.Group>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Global Restock Mode</Form.Label>
                  <div style={{ width: "100%" }}>
                    <Form.Control
                      as="select"
                      value={restockMode.global || "ADD"}
                      onChange={(e) => {
                        const globalMode = e.target.value;
                        setRestockMode((prev) => {
                          const updatedModes = { ...prev, global: globalMode };
                          selectedProducts.forEach((id) => {
                            updatedModes[id] = globalMode;
                          });
                          return updatedModes;
                        });
                      }}
                    >
                      <option value="ADD">Add</option>
                      <option value="SET">Set</option>
                    </Form.Control>
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>
                    Global Restock Value
                    <Form.Check
                      inline
                      type="checkbox"
                      className="ms-2"
                      checked={selectedProducts.length > 0 && selectedProducts.every((id) => individualModes[id]?.GRV)}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setIndividualModes((prev) => {
                          const updatedModes = { ...prev };
                          selectedProducts.forEach((id) => {
                            updatedModes[id] = {
                              ...updatedModes[id],
                              GRV: isChecked,
                            };
                          });
                          return updatedModes;
                        });
                      }}
                      disabled={selectedProducts.length === 0}
                    />
                  </Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    value={restockAmount}
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10) || 0;
                      setRestockAmount(value);
                      setIndividualAmounts((prev) => {
                        const updatedAmounts = { ...prev };
                        selectedProducts.forEach((id) => {
                          if (individualModes[id]?.GRV === true) {
                            updatedAmounts[id] = value;
                          }
                        });
                        return updatedAmounts;
                      });
                    }}
                    disabled={!selectedProducts.some((id) => individualModes[id]?.GRV)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Table striped bordered>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Stock</th>
                  <th>GRV</th>
                  <th>Restock Amount</th>
                  <th>Restock Mode</th>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.length > 0 ? (
                  selectedProducts.map((productId) => {
                    const product = products.find((p) => p.id === productId);
                    return (
                      <tr key={productId}>
                        <td>{product.itemname}</td>
                        <td>{product.stock}</td>
                        <td>
                          <Form.Check
                            type="checkbox"
                            checked={individualModes[productId]?.GRV || false}
                            onChange={(e) => {
                              const isChecked = e.target.checked;
                              setIndividualModes((prev) => ({
                                ...prev,
                                [productId]: {
                                  ...prev[productId],
                                  GRV: isChecked,
                                },
                              }));
                              if (isChecked) {
                                setIndividualAmounts((prev) => ({
                                  ...prev,
                                  [productId]: restockAmount,
                                }));
                              }
                            }}
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="number"
                            min="0"
                            value={individualAmounts[productId] || 0}
                            onChange={(e) =>
                              setIndividualAmounts({
                                ...individualAmounts,
                                [productId]: parseInt(e.target.value, 10) || 0,
                              })
                            }
                            disabled={individualModes[productId]?.GRV || false}
                          />
                        </td>
                        <td>
                          <Form.Control
                            as="select"
                            value={restockMode[productId] || restockMode.global || "ADD"}
                            onChange={(e) =>
                              setRestockMode({
                                ...restockMode,
                                [productId]: e.target.value,
                              })
                            }
                          >
                            <option value="ADD">Add</option>
                            <option value="SET">Set</option>
                          </Form.Control>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No products selected
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRestockModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleRestock}>
            Restock
          </Button>
        </Modal.Footer>
      </Modal>

      <style>
        {`
          .restock-modal .modal-dialog {
            max-width: 1000px; /* Increase width */
          }
        `}
      </style>
    </Container>
  );
}

export default ProductsManager;
