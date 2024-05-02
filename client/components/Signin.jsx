

import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import  email from '../assets/email.png';
import google from '../assets/google.png';
import '../stylesheets/signin.css';
import Login from './Login.jsx';

export default function Signin(props) {
  const [openLogin, setOpenLogin] = useState(false);
  const googleLogin = async () => {
    const res = await fetch('/api/auth/google');

    console.log('response from google', res)
  }

  return (
    <div className='modal'>
      <Modal
      {...props}
      size="lg"
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
              <img src={google} alt="google-logo" style={{width:'35px'}} />
            </div>
            <div className='text-email'>
              <Link to="http://localhost:3000/api/auth/google" className="auth-link google">Continue with Google</Link>
            </div>
          </button>
        </div>
        <div className='login-container'>
          <button className='img-login-text' onClick={() => setOpenLogin(true)}>
            <div className='img-email'>
              <img src={email} alt="email" style={{width:'30px', marginLeft:'2px'}} />
            </div>
            <div className='text-email'>
              <Link to='/'>Continue with email</Link>
            </div>
          </button>
          <Login
              show={openLogin}
              onHide={() => setOpenLogin(false)}
            />
        </div>
      </Modal.Body>
    </Modal>
    </div>
  );
}














