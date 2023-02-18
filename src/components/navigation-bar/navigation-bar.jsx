import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

export const NavigationBar = ({ user, onLoggedOut, onSearch }) => {
  const handleSearch = (searchString) => {
    onSearch(searchString);
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          myFlix App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
                <>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/users">Signup</Nav.Link>
                </>
            )}
            {user && (
                <>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/users/:Username">Profile</Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                </>
            )}
          </Nav>
          <Nav className="mx-auto">
            <Form className="d-flex">
              <Form.Control
              id="searchbar"
              type="search"
              placeholder="Search"
              className=""
              aria-label="Search"
              onChange={(event) => handleSearch(event.target.value)}
              />
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};