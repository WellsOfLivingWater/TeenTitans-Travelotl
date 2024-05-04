/**
 * @file Header component for the application.
 * Contains links to the home page, manager page, about page, register page, and login page.
 * 
 * @module Header
 * @returns {JSX.Element} The rendered header component.
 */
// Package dependencies
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';

// Components
import Signin from '../Signin';

// Reducers
import { updateItineraries } from '../itineraryComponents/itineraryReducer';
import { loginUser, logoutUser } from '../itineraryComponents/userReducer';

// Assets
import logo from '../../assets/logo.png'

// Stylesheets
import '../../stylesheets/header.css';

const Header = () => {
  const { loggedIn } = useSelector(state => state.user);
  const [openSignin, setOpenSignin] = useState(false);
  const [colorScheme, setColorScheme] = useState('light');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setColorScheme('dark');
    }
  }, []);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch('/api/users/isAuthenticated');
        const data = await res.json();
        const user = data.user;
        console.log('user:', user);
        if (user) {
          dispatch(loginUser(user));
        } else {
          dispatch(logoutUser());
        }
      } catch (err) {
        console.log('Error checking login:', err);
      }
    }
    checkLogin();
  }, []);

  const logOut = async() => {
    try {
      const res = await fetch('/api/users/logout', {
        method: 'post',
      })
  
      if (res.ok) {
        dispatch(updateItineraries([]));
        dispatch(logoutUser());
        navigate('/');
      }
    } catch (err){
      console.log('Error logging out:', err);
    }   
  }

  return (
    <Navbar data-bs-theme={colorScheme} bg={colorScheme} expand='sm' sticky='top'>
      <Navbar.Brand as={Link} to='/' className='navbar-brand'>
        <img src={logo} style={{ width: '100px' }} alt='logo' />
      </Navbar.Brand>
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav>
          <Nav.Link as={Link} to='/form' hidden={!loggedIn}>Create</Nav.Link>
          <Nav.Link as={Link} to='/manager' hidden={!loggedIn}>Manager</Nav.Link>
          <Nav.Link as={Link} to='/friends' hidden={!loggedIn}>Friends</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Nav>
        <Nav>
          <Nav.Link as={Link} to='/about'>About</Nav.Link>
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
              show={openSignin && !loggedIn}
              onHide={() => setOpenSignin(false)}
            />
          </div>
        </Nav>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
      </Nav>
    </Navbar>
  );
};

export default Header;