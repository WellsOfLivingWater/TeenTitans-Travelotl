/**
 * @file Renders a login component, which displays a form for users to enter their
 * email and password to log in to the application.
 *
 * @module Login
 * @returns {JSX.Element} The rendered login component.
 */
// Package dependencies
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';

// Components
import Register from './Register';

// Reducers
import { loginUser } from './itineraryComponents/userReducer';

// Stylesheets
import '../stylesheets/login.css';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openRegister, setRegister] = useState(false);
  const [validInput, setValidInput] = useState(true);
  const [invalidLogin, setInvalidLogin] = useState(false);
  const { loggedIn } = useSelector(state => state.user);
  
  const dispatch = useDispatch();
  
  const navigate = useNavigate();

  // Close the modal if the user is logged in
  useEffect(() => {
    if (loggedIn) {
      props.onHide();
    }
  }, [loggedIn]);

  /**
   * Handles the form submission for the login form.
   * 
   * @async
   * @param {Event} e The event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setValidInput(false);
      return;
    }

    setValidInput(true);
    const res = await fetch('/api/users/login', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      if (invalidLogin) setInvalidLogin(false);
      const user = await res.json();
      console.log('LOGIN SUCCESS user==>', user);
      dispatch(loginUser(user));
      navigate('/manager');
    } else {
      setInvalidLogin(true);
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
          Welcome back.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='login-form'>
          <form onSubmit={handleSubmit}>
            <div className='input-form-login'>
              <div className='input-login'>
                <label>Email address:
                  <input
                    type='email'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>
              <div className='input-login'>
                <label>Password:
                  <input
                    type='password'
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
              </div>
              <p hidden={!invalidLogin} className='fields-required'>Invalid email or password</p>
              <p hidden={validInput} className='fields-required'>Please fill out all fields</p>
              <button className='login-btn' type='submit'>
                {/* <Link to='/manager'>Login</Link> */}
                Login
              </button>
            </div>
            <button className='register-link'onClick={() => setRegister(true)}>
              <p>Not a member?</p>
              <Link to='/'>Register</Link>
            </button>
          </form>
          <Register
            show={openRegister}
            onHide={() => setRegister(false)}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};