/**
 * @file Header component for the application.
 * Contains links to the home page, manager page, about page, register page, and login page.
 * 
 * @module Header
 * @returns {JSX.Element} The rendered header component.
 */
// Package dependencies
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';

// Components
import Signin from '../Signin';

// Reducers
import { updateItineraries } from "../../itineraryReducer";
import { logoutUser } from "../../userReducer";

// Assets
import logo from '../../assets/logo.png'

// Stylesheets
import '../../stylesheets/header.css';

const Header = ({ className }) => {
  const { loggedIn, user } = useSelector(state => state.user);
  const [openSignin, setOpenSignin] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = async() => {
    try {
      const res = await fetch('/api/users/logout', {
        method: 'post',
      })
  
      if (res.ok) {
        dispatch(updateItineraries([]));
        dispatch(logoutUser(false));
        navigate('/');
      }
    } catch (err){
      console.log('Error logging out:', err);
    }   
  }

  return (
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
          <div>
            {
              !loggedIn ?
                <button className='login-btn' onClick={() => setOpenSignin(true)}>
                  Sign In
                </button>
                :
                <button className='login-btn' onClick={logOut}>
                  Sign Out
                </button>
            }
            <Signin
              show={openSignin}
              onHide={() => setOpenSignin(false)}
            />
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;