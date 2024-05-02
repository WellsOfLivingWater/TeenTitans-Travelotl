/**
 * @file Header component for the application.
 * Contains links to the home page, manager page, about page, register page, and login page.
 * 
 * @module Header
 * @returns {JSX.Element} The rendered header component.
 */
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Signin from './Signin';
import logo from '../assets/logo.png'
import '../stylesheets/header.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateItineraries } from "../reducers/itineraryReducer";
import { logoutUser } from "../reducers/userReducer";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.user.loggedIn);
  const [openSignin, setOpenSignin] = useState(false);

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
    <div className="header-container">
      <div className='logo'>
        <Link to='/'> 
          <img src={logo} style={{width:'100px'}}alt="logo" />
        </Link>
      </div>

      <div className='text-right m-2'>
        <Link to='/manager'>Manager</Link>
      </div>
      <div className='text-right m-2'>
        <Link to='/about'>About</Link>
      </div>
      <div>
        {
          !isLoggedIn ? <button className='login-btn' onClick={() => setOpenSignin(true)}>
            Sign In
          </button> :
          <button className='login-btn' onClick={logOut}>
            Sign Out
          </button>
        }
      
      <Signin
        show={openSignin}
        onHide={() => setOpenSignin(false)}
      />
      </div>
    </div>
  );
};

export default Header;