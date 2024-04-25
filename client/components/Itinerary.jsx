/**
 * @file Renders the itinerary details for the user's trip.
 * 
 * @module Itinerary
 * @returns {JSX.Element} The rendered itinerary component.
 */
// Assets
import image from '../assets/placeholder-image.jpeg';

/**
 * Renders the itinerary details for the user's trip.
 * 
 * @param {Object} itinerary The itinerary object containing OpenAI API's response. 
 * @returns {JSX.Element} The rendered itinerary component.
 */
const Itinerary = ({ itinerary }) => {
  // console.log("Itinerary Component:", itinerary.itinerary.itinerary);
  if (itinerary) return (
    <div id='itinerary-details'>
      {Object.entries(itinerary.itinerary).map(([date, timesOfDay]) => (
        <div className="day-entry" key={date}>
          <p className='date'>{date}</p>
          <div className="day-details">
            {Object.entries(timesOfDay).map(([timeOfDay, suggestion]) => (
              <div className='activity-details' key={timeOfDay}>
                <div>
                  <div class='activity-img-container'>
                    <img id="activity-image" src={image} height="300" width="300"/>
                    <div className='image-header'><b>{suggestion.activity}</b></div>
                  </div>
                  <p className="time-of-day">{timeOfDay}</p>
                  {/* <p><b>{suggestion.activity}</b></p> */}
                  <p>{suggestion.description}</p>
                  <p>{suggestion.address}</p>
                  <button className='tile-buttons'>Navigate</button>
                </div>
                <div className='activity-button-container'>
                  <button className='activity-buttons'>Details</button>
                  <button className='activity-buttons'>Change Activity</button>
                  <button className='activity-buttons'>Remove</button></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Itinerary;
