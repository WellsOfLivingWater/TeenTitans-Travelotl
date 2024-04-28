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
import '../stylesheets/login.css';

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

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
                        <Link to='/manager'>Login</Link>
                    </button>
                </div>
            </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}


// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   /**
//    * Handles the form submission event.
//    * Sends a POST request to the server to log in the user.
//    * If the request is successful, the user is redirected to the home page.
//    *
//    * @async
//    * @param {Event} e - The form submission event object.
//    */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await fetch('/api/users/login', {
//       method: 'post',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });

//     if (res.ok) {
//       const user = await res.json();
//       localStorage.setItem('userToken', user.token);
//       console.log(user);
//       navigate('/');
//     }
//   };



//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Email:
//           <input
//             type='text'
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </label>
//         <br />
//         <label>
//           Password:
//           <input
//             type='password'
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </label>
//         <br />
//         <button type='submit'>Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;
