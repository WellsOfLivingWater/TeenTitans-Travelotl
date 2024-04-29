/**
 * @file Renders the itinerary details for the user's trip.
 * 
 * @module Itinerary
 * @returns {JSX.Element} The rendered itinerary component.
 */
// Package dependencies
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Components
import UpdateModal from './UpdateModal';
import ActivityCard from './ActivityCard';

// Assets
import image from '../../assets/placeholder-image.jpeg';




/**
 * Renders the itinerary details for the user's trip.
 * 
 * @param {Object} itinerary The itinerary object containing OpenAI API's response.
 * @param {Number} itineraryID The itinerary ID.
 * @returns {JSX.Element} The rendered itinerary component.
 */
const Itinerary = ({ itinerary, itineraryID }) => {
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  const convertDate = (date) => {
    const newDate = new Date(date);
    const day = weekday[newDate.getDay()].toString();
    const fullDate = newDate.toLocaleString('default', {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }).toString();
    return `${day} ${fullDate}`;
  };

  const showToastMessage = () => {
    toast.success("Woohoo your new itinerary looks good!");
  };

  if (itinerary) return (
    <div id='itinerary-details'>
      {Object.entries(itinerary).map(([date, timesOfDay]) => (
        <div className="day-entry" key={date}>
          <div>
            <p className='date'>{convertDate(date)}</p>
          </div>
          <div className="day-details">
            {Object.entries(timesOfDay).map(([timeOfDay, suggestion]) => (
              <ActivityCard 
                key={timeOfDay} 
                time={{date, timeOfDay}} 
                itinerary={itinerary} 
                itineraryID={itineraryID} 
                suggestion={suggestion}
                toastify={showToastMessage}
              />
            ))}
          </div>
        </div>
      ))}
      <ToastContainer/>
    </div>
  );  
};

export default Itinerary;
