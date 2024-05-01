/**
 * @file Renders a registration component, which displays a form for users to enter their
 * first name, last name, email, and password to register for the application.
 *
 * @todo Add form validation.
 * @todo Redirect to the home page (logged in) after registration.
 *
 * @module Register
 * @returns {JSX.Element} The rendered registration component.
 */
// Package dependencies
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import '../stylesheets/login.css';

const Register = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  /**
   * Handles the form submission event.
   * Sends a POST request to the server to register the user.
   * If the request is successful, the user is redirected to the login page.
   *
   * @param {Event} e - The form submission event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/users/', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    if (res.ok) {
      const user = await res.json();
      console.log(user);
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Join to unlock the best of Travelotl.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className='login-form-register'>
       <form onSubmit={handleSubmit} method='post' action='submit' id='registerForm'>
       <div className='input-form-login'>
          <div className='input-login'>
            <label> First Name:</label>
              <input
                type='text'
                placeholder='Enter your first name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          <div className='input-login'>
          <label> Last Name:</label>
              <input
                type='text'
                placeholder='Enter your last name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
          </div>
          <div className='input-login'>
          <label> Email:</label>
              <input
                type='text'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
          </div>
          <div className='input-login'>
          <label> Password:</label>
              <input
                type='password'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
          </div>
          <button className='login-btn' type='submit'>
            Sign up
          </button>
       </div>
       
      </form>
    </div>
      </Modal.Body>
    </Modal>
  );
};

export default Register;
