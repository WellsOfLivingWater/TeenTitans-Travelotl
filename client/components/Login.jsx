/**
 * @file Renders a login component, which displays a form for users to enter their
 * email and password to log in to the application.
 *
 * @module Login
 * @returns {JSX.Element} The rendered login component.
 */
// Package dependencies
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Register from './Register';
import '../stylesheets/login.css';

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openRegister, setRegister] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const res = await fetch('/api/users/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        });
    
        if (res.ok) {
        // const user = await res.json();
        // localStorage.setItem('userToken', user.token);
        // console.log(user);
        navigate('/manager');
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
          Welcome back.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='login-form'>
            <form onSubmit={handleSubmit}>
                <div className='input-form-login'>
                    <div className='input-login'>
                        <label> Email address:</label>
                            <input
                                type='email'
                                placeholder='Enter your email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                    </div>
                    <div className='input-login'>
                    <label>Password:</label>
                        <input
                            type='password'
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
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
}
