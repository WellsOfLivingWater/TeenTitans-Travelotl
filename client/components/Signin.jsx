// Package dependencies
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Components
import Login from './Login.jsx';
import Register from './Register.jsx';

// Assets
import email from '../assets/email.png';
import google from '../assets/google.png';

// Stylesheets
import '../stylesheets/signin.css';

export default function Signin(props) {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const { loggedIn } = useSelector(state => state.user);
  // const googleLogin = async () => {
  //   const res = await fetch('/api/auth/google');

  //   console.log('response from google', res)
  // }

  useEffect(() => {
    if (loggedIn) {
      props.onHide();
    }
  }, [loggedIn]);

  return (
    <div className='modal'>
      <Modal
        {...props}
        fullscreen
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className='modal-header'>
          <Modal.Title id="contained-modal-title-vcenter">
            Sign in to unlock the best of Travelotl.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='container-login-modal'>
          <div className='login-container'>
            <button className='img-login-text'>
              <div className='img-email'>
                <img src={google} alt="google-logo" style={{ width:'35px' }} />
              </div>
              <div className='text-email'>
                <Link to="http://localhost:3000/api/auth/google" className="auth-link google">
                  Continue with Google
                </Link>
              </div>
            </button>
          </div>
          <div className='login-container'>
            <button className='img-login-text' onClick={() => setOpenLogin(true)}>
              <div className='img-email'>
                <img src={email} alt="email" style={{width:'30px', marginLeft:'2px'}} />
              </div>
              <div className='text-email'>
                <Link to='/'>Sign in with Email</Link>
              </div>
            </button>
            <Login
              show={openLogin}
              onHide={() => setOpenLogin(false)}
            />
          </div>
          <div className='login-container'>
            <button className='img-login-text' onClick={() => setOpenRegister(true)}>
              <div className='img-email'>
                <img src={email} alt="email" style={{width:'30px', marginLeft:'2px'}} />
              </div>
              <div className='text-email'>
                <Link to='/'>Register with Email</Link>
              </div>
            </button>
            <Register
              show={openRegister}
              onHide={() => setOpenRegister(false)}
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}














