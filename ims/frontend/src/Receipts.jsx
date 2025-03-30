import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthProvider.jsx";
import { Card, Button, Dropdown, DropdownButton, Container, Row, Col, Modal, Table } from "react-bootstrap";

function Receipts() {
  const { token } = useContext(AuthContext);
  const [receipts, setReceipts] = useState([]);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [orderBy, setOrderBy] = useState("id");
  const [isDescending, setIsDescending] = useState(false);
  const [filterBySeller, setFilterBySeller] = useState("");
  const [sellers, setSellers] = useState([]);

  const displayOrderBy = {
    id: "ID",
    total_price: "Total Price",
    seller_id: "Seller ID",
  };

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/receipts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setReceipts(data.map((receipt) => ({
            ...receipt,
            items: receipt.items.map((item) => ({
              ...item,
              total: item.price * item.quantity,
            })),
          })));
        }
      } catch (err) {
        console.error("Error fetching receipts:", err);
      }
    };
    fetchReceipts();
  }, [token]);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setSellers(data);
        }
      } catch (err) {
        console.error("Error fetching sellers:", err);
      }
    };
    fetchSellers();
  }, [token]);

  const sortedAndFilteredReceipts = [...receipts]
    .filter((receipt) => !filterBySeller || receipt.seller_id === parseInt(filterBySeller, 10))
    .sort((a, b) => {
      if (isDescending) {
        return b[orderBy] > a[orderBy] ? 1 : -1;
      }
      return a[orderBy] > b[orderBy] ? 1 : -1;
    });

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleString(undefined, options);
  }

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Receipts</h1>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center">
          <DropdownButton
            title={`Order By: ${displayOrderBy[orderBy]}`}
            onSelect={(e) => setOrderBy(e)}
            className="me-2"
          >
            <Dropdown.Item eventKey="id">ID</Dropdown.Item>
            <Dropdown.Item eventKey="total_price">Total Price</Dropdown.Item>
            <Dropdown.Item eventKey="seller_id">Seller ID</Dropdown.Item>
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
        <DropdownButton
          title={`Filter By Seller: ${filterBySeller || "All"}`}
          onSelect={(e) => setFilterBySeller(e)}
        >
          <Dropdown.Item eventKey="">All</Dropdown.Item>
          {sellers.map((seller) => (
            <Dropdown.Item key={seller.id} eventKey={seller.id}>
              {seller.username}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
      {sortedAndFilteredReceipts.length === 0 ? (
        <p className="text-center text-muted">
          {filterBySeller
            ? "No receipts found for the selected seller."
            : "No receipts available."}
        </p>
      ) : (
        <Row>
          {sortedAndFilteredReceipts.map((receipt) => (
            <Col md={4} key={receipt.id} className="mb-4">
              <Card className="position-relative">
                <Button
                  variant="link"
                  className="position-absolute top-0 end-0 m-2 p-0"
                  onClick={() => setSelectedReceipt(receipt)}
                  style={{ zIndex: 1 }}
                >
                  <img
                    src="images/icons/expand/expand-32.png"
                    alt="Expand"
                    style={{ width: "24px", height: "24px" }}
                  />
                </Button>
                <Card.Body>
                  <Card.Title>Receipt #{receipt.id}</Card.Title>
                  <Card.Text>
                    <strong>Total:</strong> ${receipt.total_price}
                    <br />
                    <strong>Seller ID:</strong> {receipt.seller_id}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <Modal show={!!selectedReceipt} onHide={() => setSelectedReceipt(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Receipt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReceipt && (
            <Card>
              <Card.Body>
                <h5>Receipt</h5>
                <p>Transaction ID: {selectedReceipt.id}</p>
                <p>Seller ID: {selectedReceipt.seller_id}</p>
                <p>Date: {formatDate(selectedReceipt.created_at)}</p> 
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
                    {selectedReceipt.items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>${item.price}</td>
                        <td>${item.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <h5>Total: ${selectedReceipt.total_price}</h5>
              </Card.Body>
            </Card>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setSelectedReceipt(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Receipts;
