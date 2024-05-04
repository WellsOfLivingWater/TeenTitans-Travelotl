/**
 * @file Renders the home page of the application.
 * Allows the user to navigate to the form to plan a trip.
 * 
 * @module Main
 * @returns {JSX.Element} The rendered home page component.
 */
// Package dependencies
import { Link } from "react-router-dom";
import wallpaper from '../assets/wallpaper.jpg'
import { useSelector } from "react-redux";


const Main = () => {
  const { loggedIn } = useSelector(state => state.user);

  return (
    <div id='main'>
      <div className="text-container">
        <h1 className="mainpage-text">Let us plan the trip of your dreams...</h1>
        {/* <button>Click here to get started...</button> */}
        { loggedIn &&  <Link to='/form' id='start'>Click here to get started... </Link> }
      </div>
      <div className="wallpaper">
        <img src={wallpaper} alt="wallpaper" style={{borderRadius:'10px'}}/>
      </div>
    </div>
  );
};

export default Main;

