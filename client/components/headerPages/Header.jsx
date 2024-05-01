/**
 * @file Header component for the application.
 * Contains links to the home page, manager page, about page, register page, and login page.
 * 
 * @module Header
 * @returns {JSX.Element} The rendered header component.
 */
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const Header = ({ className }) => {

  return (
    <Navbar bg="light" expand="lg" className={className}>
      <Navbar.Brand as={Link} to="/" className="text-blue-600 text-3xl font-bold font-serif text-center">Travelotl</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/about">About</Nav.Link>
          <Nav.Link as={Link} to="/manager">Manager</Nav.Link>
          <Nav.Link as={Link} to="/friends">Friends</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
          <Nav.Link as={Link} to="/register">Register</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;