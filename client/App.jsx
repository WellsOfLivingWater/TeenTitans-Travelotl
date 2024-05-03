/**
 * The main component for the application.
 *
 * @module App
 * @returns {JSX.Element} The rendered component.
 */
// Package dependencies
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/headerPages/Header';

import '../styles.css';

// Application component
export default function App() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};