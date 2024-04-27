/**
 * @file Renders the itinerary details for the user's trip.
 * 
 * @module Itinerary
 * @returns {JSX.Element} The rendered itinerary component.
 */
// Assets
import image from '../../assets/placeholder-image.jpeg';

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UpdateModal from './UpdateModal';
import ActivityCard from './ActivityCard';

/**
 * Renders the itinerary details for the user's trip.
 * 
 * @param {Object} itinerary The itinerary object containing OpenAI API's response. 
 * @returns {JSX.Element} The rendered itinerary component.
 */
const Itinerary = ({ itinerary, itineraryID }) => {
  // const [show, setShow] = useState(false);
  // const [modalShow, setModalShow] = useState(false);

  // // const handleClose = () => setShow(false);
  // const openModal = (e) => {
  //   console.log('modal click ===>', e);
  //   // console.log()
  //   setModalShow(true);
  // }

  if (itinerary) return (
    <div id='itinerary-details'>
      {Object.entries(itinerary).map(([date, timesOfDay]) => (
        <div className="day-entry" key={date}>
          <p className='date'>{date}</p>
          <div className="day-details">
            {Object.entries(timesOfDay).map(([timeOfDay, suggestion]) => (
              <ActivityCard key={timeOfDay} itinerary={itinerary} itineraryID={itineraryID} suggestion={suggestion}/>
            ))}
          </div>
        </div>
      ))}
      
    </div>
  );  
};

export default Itinerary;
