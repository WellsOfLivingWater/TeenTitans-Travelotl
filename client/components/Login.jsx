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
// Components
import Header from './Header';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  /**
   * Handles the form submission event.
   * Sends a POST request to the server to log in the user.
   * If the request is successful, the user is redirected to the home page.
   *
   * @async
   * @param {Event} e - The form submission event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/users/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const user = await res.json();
      localStorage.setItem('userToken', user.token);
      console.log(user);
      navigate('/');
    }
  };



  return (
    <div>
      <Header />
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type='submit'>Login</button>
      </form>
      <div>
        <button style={{backgroundColor:'pink'}}>
          <Link to="http://localhost:3000/api/users/auth/google" className="auth-link google">Authenticate with Google</Link>
        </button>
      </div>
    </div>
  );
};

export default Login;
