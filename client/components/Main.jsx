/**
 * @file Renders the home page of the application.
 * Allows the user to navigate to the form to plan a trip.
 * 
 * @module Main
 * @returns {JSX.Element} The rendered home page component.
 */
// Package dependencies
import { Link } from "react-router-dom";

// Components
import Header from "./Header";

const Main = () => {
  return (
    <div>
      <Header />
      <p>Let us plan the trip of your dreams...</p>
      <Link to='/form' id='start'>Click here to get started... </Link>
    </div>
  );
};

export default Main;