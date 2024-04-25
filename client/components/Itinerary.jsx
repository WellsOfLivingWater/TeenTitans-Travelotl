import { useState } from 'react';
import image from '../assets/placeholder-image.jpeg';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UpdateModal from './UpdateModal';

const Itinerary = ({ itinerary, itineraryID }) => {
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  
  const suggestActivities = () => {
    console.log(itineraryID);
  }

  if (itinerary) return (
    <div id='itinerary-details'>
      {Object.entries(itinerary).map(([date, timesOfDay]) => (
        <div className="day-entry" key={date}>
          <p className='date'>{date}</p>
          <div className="day-details">
            {Object.entries(timesOfDay).map(([timeOfDay, suggestion]) => (
              <div className='activity-details' key={timeOfDay}>
                <div>
                  <div className='activity-img-container'>
                    <img id="activity-image" src={image} height="300" width="300"/>
                    <div className='image-header'><b>{suggestion.activity}</b></div>
                  </div>
                  <h5 className="time-of-day">{timeOfDay}</h5>
                  {/* <p><b>{suggestion.activity}</b></p> */}
                  <p>{suggestion.description}</p>
                  <p>{suggestion.address}</p>
                  <button className='tile-buttons'>Navigate</button>
                </div>
                <div className='activity-button-container'>
                  <button className='activity-buttons'>Details</button>
                  <Button variant="primary" onClick={() => setModalShow(true)}>
                    Change Activity
                  </Button>
                  <button className='activity-buttons'>Remove</button></div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <>
        <UpdateModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          itineraryID={itineraryID}
        />
      </>
    </div>
  );
};

export default Itinerary;
