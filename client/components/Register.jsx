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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Header from "./Header";

const Register = () => {
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
  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch ('/api/users/', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({firstName, lastName, email, password}),
    })

    if(res.ok){
        const user = await res.json();
        console.log(user)
        navigate('/login');
    }
  };

  return (
    <div>
        <Header />
      <h2>Register</h2>
      <form onSubmit={handleSubmit} method='post' action='submit' id='registerForm'>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;