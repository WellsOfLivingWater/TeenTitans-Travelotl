/**
 * @file Renders the home page of the application.
 * Allows the user to navigate to the form to plan a trip.
 * 
 * @module Main
 * @returns {JSX.Element} The rendered home page component.
 */
// Package dependencies
import { Link } from "react-router-dom";
import { useState } from "react";
import wallpaper from '../assets/wallpaper.jpg'

// Components
import Header from "./Header";

const Main = ({}) => {

  return (
    <div>
      <Header />
      <div className="text-container">
        <h1 className="mainpage-text">Let us plan the trip of your dreams...</h1>
        <Link to='/form' id='start'>Click here to get started... </Link>
      </div>
      <div className="wallpaper">
        <img src={wallpaper} alt="wallpaper" style={{borderRadius:'10px'}}/>
      </div>
    </div>
  );
};

export default Main;

