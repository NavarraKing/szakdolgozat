import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthProvider.jsx";
import { Card, Button, Modal } from "react-bootstrap";

function Users() {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUsers(data.sort((a, b) => a.id - b.id));
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Error during fetching users");
      }
    };
    fetchUsers();
  }, [token]);

  const handleShowModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Users</h1>
      {error && <p className="text-danger text-center">{error}</p>}
      <div className="row">
        {users.map((user) => (
          <div className="col-md-4 col-sm-6 mb-4" key={user.id}>
            <Card className="h-100 shadow-sm text-center d-flex flex-column justify-content-center" style={{ width: "100%", minHeight: "300px" }}>
              <div
                className="mx-auto mt-3"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  position: "relative",
                  zIndex: 1,
                  backgroundColor: "#fff",
                  marginTop: "-40px",
                }}
              >
                <Card.Img
                  src={user.profile_picture}
                  alt={user.username}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <Card.Body className="d-flex flex-column justify-content-center">
                <Card.Title className="text-truncate">
                  {user.username}, {user.account_level === 1 ? "Admin" : user.role || "User"}
                </Card.Title>
                <Card.Text>Account Level: {user.account_level}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleShowModal(user)}
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        {selectedUser && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedUser.username}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="text-center mb-3">
                <div
                  className="mx-auto"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={selectedUser.profile_picture}
                    alt={selectedUser.username}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              </div>
              <div>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Phone Number:</strong> {selectedUser.phone_number}</p>
                <p><strong>Given Name:</strong> {selectedUser.given_name}</p>
                <p><strong>Family Name:</strong> {selectedUser.family_name}</p>
                <p><strong>Date of Birth:</strong> {selectedUser.dob ? selectedUser.dob.split("T")[0] : "N/A"}</p>
                <p><strong>Address:</strong> {selectedUser.address}</p>
                <p><strong>Account Level:</strong> {selectedUser.account_level}</p>
              </div>
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

export default Users;
