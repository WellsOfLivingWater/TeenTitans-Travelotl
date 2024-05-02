/**
 * @file Header component for the application.
 * Contains links to the home page, manager page, about page, register page, and login page.
 * 
 * @module Header
 * @returns {JSX.Element} The rendered header component.
 */
import { Link } from 'react-router-dom';
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Signin from './Signin';
import logo from '../assets/logo.png'
import '../stylesheets/header.css';

const Header = () => {
  const [openSignin, setOpenSignin] = useState(false);



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
      <button className='login-btn' onClick={() => setOpenSignin(true)}>
        Sign in
      </button>
      <Signin
        show={openSignin}
        onHide={() => setOpenSignin(false)}
      />
      </div>
    </div>
  );
};

export default Header;