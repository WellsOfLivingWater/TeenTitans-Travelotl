/**
 * @file Renders a registration component, which displays a form for users to enter their
 * first name, last name, email, and password to register for the application.
 *
 * @module Register
 * @returns {JSX.Element} The rendered registration component.
 */
// Package dependencies
import { useState } from 'react';
import { Modal } from 'react-bootstrap';

// Stylesheets
import '../stylesheets/login.css';

const Register = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validInput, setValidInput] = useState(true);

  /**
   * Handles the form submission event.
   * Sends a POST request to the server to register the user.
   * If the request is successful, the user is redirected to the login page.
   *
   * @param {Event} e - The form submission event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (firstName && lastName && email && password) {
      if (!validInput) setValidInput(true);
      const res = await fetch('/api/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      
      if (res.ok) {
        const user = await res.json();
        console.log(user);
        props.onHide(); // Close the modal
      }
    } else {
      if (validInput) setValidInput(false);
    }
  };
  
  return (
    <Modal
      {...props}
      fullscreen
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
                <label> First Name:
                  <input
                    type='text'
                    placeholder='Enter your first name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
              </div>
            <div className='input-login'>
              <label> Last Name:
                <input
                  type='text'
                  placeholder='Enter your last name'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </div>
              <div className='input-login'>
                <label> Email:
                  <input
                    type='text'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>
              <div className='input-login'>
                <label> Password:
                  <input
                    type='password'
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
              </div>
              <p hidden={validInput} className='fields-required'>All fields required.</p>
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