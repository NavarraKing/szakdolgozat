import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthProvider.jsx";
import { Form, Button, Container, Row, Col, Alert, Card, Modal } from "react-bootstrap";

function UsersManager() {
  const { token, user: currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    id: 0,
    username: "",
    email: "",
    phone_number: "",
    number_countrycode: "",
    given_name: "",
    family_name: "",
    dob: "",
    address: "",
    account_level: 0,
    password: "",
    currentPassword: "",
    profile_picture: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [tempProfilePicture, setTempProfilePicture] = useState("");
  const defaultProfilePicture = "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg";
  const [showPicturePopup, setShowPicturePopup] = useState(false);
  const [maxAccountLevel, setMaxAccountLevel] = useState(0);
  const currentYear = new Date().getFullYear();

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
      setError("Error fetching users.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  useEffect(() => {
    const fetchMaxAccountLevel = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/roles/max", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setMaxAccountLevel(data.maxLevel || 0);
        }
      } catch (err) {
        setError("Error fetching max account level.");
      }
    };

    fetchMaxAccountLevel();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "account_level") {
      const numericValue = Math.max(0, Math.min(maxAccountLevel, parseInt(value, 10) || 0));
      if (user.id === currentUser.id) {
        setError("You cannot change your own account level.");
        return;
      }
      setUser({ ...user, [name]: numericValue });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleDOBChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, dob: value });
    setError("");

    if (value.length > 10) {
      setError("Invalid date format. Ensure it is a valid string.");
      return;
    }

    const [year] = value.split("-");
    if (year < 1925 || year > 2025) {
      setError(`Year must be between 1925 and ${currentYear}.`);
    }
  };

  const handleSelectUser = (e) => {
    const selectedId = parseInt(e.target.value, 10);
    const selectedUser = users.find((u) => u.id === selectedId) || {
      id: 0,
      username: "",
      email: "",
      phone_number: "",
      number_countrycode: "",
      given_name: "",
      family_name: "",
      dob: "", 
      address: "",
      account_level: 0,
      password: "",
      currentPassword: "",
      profile_picture: defaultProfilePicture,
    };
    setUser({
      ...selectedUser,
      dob: selectedUser.dob || "", 
    });
    setError("");
    setSuccess("");
  };

  const handleUpdateUser = async () => {
    if (!user.currentPassword) {
      setError("Current password is required to update user details.");
      return;
    }

    const updatedUser = { ...user };

    updatedUser.dob = user.dob || null;

    try {
      const response = await fetch(`http://localhost:5000/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess("User updated successfully!");
        fetchUsers();
        setUser({
          id: 0,
          username: "",
          email: "",
          phone_number: "",
          number_countrycode: "",
          given_name: "",
          family_name: "",
          dob: "",
          address: "",
          account_level: 0,
          password: "",
          currentPassword: "",
          profile_picture: defaultProfilePicture,
        });
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Error updating user.");
    }
  };

  const handleProfilePictureChange = () => {
    const img = new Image();
    img.src = tempProfilePicture;
    img.onload = () => {
      setUser({ ...user, profile_picture: tempProfilePicture });
      setTempProfilePicture("");
      setShowPicturePopup(false);
      setError("");
    };
    img.onerror = () => {
      setError("Invalid image URL.");
    };
  };

  const resetProfilePicture = () => {
    setUser({ ...user, profile_picture: defaultProfilePicture });
  };

  const isDisabled = user.id === 0;

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Users Manager</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="id">
              <Form.Label>User ID</Form.Label>
              <Form.Control
                as="select"
                name="id"
                value={user.id}
                onChange={handleSelectUser}
              >
                <option value={0}>Select User</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.id} - {u.username}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={8}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={user.username}
                onChange={handleInputChange}
                disabled={isDisabled}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                disabled={isDisabled}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="account_level">
              <Form.Label>Account Level</Form.Label>
              <Form.Control
                type="number"
                name="account_level"
                value={user.account_level}
                onChange={handleInputChange}
                min="0"
                max={maxAccountLevel}
                disabled={isDisabled || user.id === currentUser.id}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="number_countrycode">
              <Form.Label>Country Code</Form.Label>
              <Form.Control
                as="select"
                name="number_countrycode"
                value={user.number_countrycode || ""}
                onChange={handleInputChange}
                disabled={isDisabled}
              >
                <option value="+36">+36 (Hungary)</option>
                <option value="+1">+1 (USA)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+49">+49 (Germany)</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="phone_number">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone_number"
                value={user.phone_number}
                onChange={handleInputChange}
                disabled={isDisabled}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="given_name">
              <Form.Label>Given Name</Form.Label>
              <Form.Control
                type="text"
                name="given_name"
                value={user.given_name}
                onChange={handleInputChange}
                disabled={isDisabled}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="family_name">
              <Form.Label>Family Name</Form.Label>
              <Form.Control
                type="text"
                name="family_name"
                value={user.family_name}
                onChange={handleInputChange}
                disabled={isDisabled}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="dob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={user.dob}
                onChange={handleDOBChange}
                max={`${currentYear}-12-31`}
                disabled={isDisabled}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={user.address}
                onChange={handleInputChange}
                disabled={isDisabled}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="password">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
                disabled={isDisabled}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="currentPassword">
              <Form.Label>Admin's Password</Form.Label>
              <Form.Control
                type="password"
                name="currentPassword"
                value={user.currentPassword}
                onChange={handleInputChange}
                disabled={isDisabled}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="profile_picture">
              <Form.Label>Profile Picture</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  name="profile_picture"
                  value={tempProfilePicture}
                  onChange={(e) => setTempProfilePicture(e.target.value)}
                  disabled={isDisabled}
                />
                <Button
                  variant="primary"
                  onClick={() => setShowPicturePopup(true)}
                  className="ms-2"
                  disabled={isDisabled}
                >
                  Preview
                </Button>
              </div>
              {user.profile_picture && (
                <Card className="mt-3 position-relative">
                  <Card.Img
                    variant="top"
                    src={user.profile_picture}
                    alt="Profile"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      margin: "0 auto",
                    }}
                  />
                  {user.profile_picture !== defaultProfilePicture && (
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
                      onClick={resetProfilePicture}
                    >
                      X
                    </Button>
                  )}
                </Card>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Button
          variant="primary"
          className="w-100"
          onClick={handleUpdateUser}
          disabled={isDisabled}
        >
          Update User
        </Button>
      </Form>

      <Modal show={showPicturePopup} onHide={() => setShowPicturePopup(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="text-center">
            <Card.Img
              variant="top"
              src={user.profile_picture || defaultProfilePicture}
              alt="Current Profile"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "50%",
                margin: "0 auto",
              }}
            />
            <Card.Body>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Paste image URL"
                value={tempProfilePicture}
                onChange={(e) => setTempProfilePicture(e.target.value)}
              />
              <Button variant="primary" onClick={handleProfilePictureChange}>
                Check
              </Button>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default UsersManager;
