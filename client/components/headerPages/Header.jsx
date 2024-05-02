/**
 * @file Header component for the application.
 * Contains links to the home page, manager page, about page, register page, and login page.
 * 
 * @module Header
 * @returns {JSX.Element} The rendered header component.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

import Signin from '../Signin';

import logo from '../../assets/logo.png'

import '../../stylesheets/header.css';

const Header = ({ className }) => {
  const [openSignin, setOpenSignin] = useState(false);

  return (
    // <div className="header-container">
    //   <div className='logo'>
    //     <Link to='/'>
    //       <img src={logo} style={{width:'100px'}}alt="logo" />
    //     </Link>
    //   </div>

    //   <div className='text-right m-2'>
    //     <Link to='/manager'>Manager</Link>
    //   </div>
    //   <div className='text-right m-2'>
    //     <Link to='/about'>About</Link>
    //   </div>
    //   <div>
    //     <Link to='/friends'>Friends</Link>
    //   </div>
    //   <div>
    //   <button className='login-btn' onClick={() => setOpenSignin(true)}>
    //     Sign in
    //   </button>
    //   <Signin
    //     show={openSignin}
    //     onHide={() => setOpenSignin(false)}
    //   />
    //   </div>
    // </div>
    <Navbar bg="light" expand="lg" className={className}>
      <Navbar.Brand as={Link} to="/" className="text-blue-600 text-3xl font-bold font-serif text-center"><img src={logo} style={{width:'100px'}}alt="logo" /></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/about">About</Nav.Link>
          <Nav.Link as={Link} to="/manager">Manager</Nav.Link>
          <Nav.Link as={Link} to="/friends">Friends</Nav.Link>
        </Nav>
        <Nav>
          <button className='login-btn' onClick={() => setOpenSignin(true)}>
            Sign in
          </button>
          <Signin
            show={openSignin}
            onHide={() => setOpenSignin(false)}
          />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;