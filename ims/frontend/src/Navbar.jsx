import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { AuthContext } from './AuthProvider.jsx';

function CustomNavbar() {
  const { user, handleLogout } = useContext(AuthContext);

  return (
    <Navbar className="navbar-custom" expand="lg" style={{ width: '100%' }}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="navbar-brand text-light">
          IMS
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="text-light ms-3">
              Home
            </Nav.Link>
            {user && user?.account_level !== 1 && (
              <>
                <Nav.Link as={Link} to="/products" className="text-light">
                  Products
                </Nav.Link>
                <Nav.Link as={Link} to="/seller" className="text-light">
                  Seller
                </Nav.Link>
              </>
            )}
            {user?.account_level === 1 && (
              <>
                <Nav.Link as={Link} to="/products" className="text-light">
                  Products
                </Nav.Link>
                <Nav.Link as={Link} to="/products-manager" className="text-light">
                  Products Manager
                </Nav.Link>
                <Nav.Link as={Link} to="/users" className="text-light">
                  Users
                </Nav.Link>
                <Nav.Link as={Link} to="/users-manager" className="text-light">
                  Users Manager
                </Nav.Link>
                <Nav.Link as={Link} to="/seller" className="text-light">
                  Seller
                </Nav.Link>
                <Nav.Link as={Link} to="/receipts" className="text-light">
                  Receipts
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav className="ms-auto">
            {!user && (
              <Nav.Link as={Link} to="/auth" className="icon-btn">
                <img
                  src="images/icons/loginregister/loginregister-32.png"
                  alt="Login/Register"
                  className="icon-img"
                />
              </Nav.Link>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/profile" className="text-light">
                  Profile
                </Nav.Link>
                <Nav.Link
                  onClick={handleLogout}
                  className="text-light"
                  style={{ cursor: 'pointer' }}
                >
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;