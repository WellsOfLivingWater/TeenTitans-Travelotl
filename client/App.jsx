/**
 * The main component for the application.
 *
 * @module App
 * @returns {JSX.Element} The rendered component.
 */
// Package dependencies
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Application component
export default function App() {
  return (
    <div>
      <Outlet />
    </div>
  );
};