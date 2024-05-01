/**
 * @file Header component for the application.
 * Contains links to the home page, manager page, about page, register page, and login page.
 * 
 * @module Header
 * @returns {JSX.Element} The rendered header component.
 */
import { Link } from 'react-router-dom';

const Header = () => {

  return (
    <div className="header-container">
      <div>
        <Link to='/' className='text-blue-600 text-3xl font-bold font-serif text-center'>Travelotl</Link>
      </div>
      <div className='text-right m-2'>
        <Link to='/manager'>Manager</Link>
      </div>
      <div className='text-right m-2'>
        <Link to='/about'>About</Link>
      </div>
      <div className='text-center m-2'>
        <Link to='/register'>Register</Link>
      </div>
      <div className='text-center m-2'>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
};

export default Header;