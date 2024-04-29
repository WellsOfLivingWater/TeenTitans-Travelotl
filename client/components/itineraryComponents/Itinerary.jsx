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
import { ToastContainer } from 'react-bootstrap';

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
const convertDate = (date) => {
  const newDate = new Date(date);
  return newDate;
}

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const Itinerary = ({ itinerary, itineraryID }) => {
  if (itinerary) return (
    <div id='itinerary-details'>
      {Object.entries(itinerary).map(([date, timesOfDay]) => (
        <div className="day-entry" key={date}>
          <p className='date'>{weekday[convertDate(date).getDay()].toString()} {convertDate(date).toLocaleString('default', {
            day: "2-digit",
            month: "long",
            year: "numeric"
          }).toString()}</p>
          <div className="day-details">
            {Object.entries(timesOfDay).map(([timeOfDay, suggestion]) => (
              <ActivityCard 
                key={timeOfDay} 
                time={{date, timeOfDay}} 
                itinerary={itinerary} 
                itineraryID={itineraryID} 
                suggestion={suggestion}
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
