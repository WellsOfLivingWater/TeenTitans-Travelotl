import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SuggestionCard from './SuggestionCard'
import Loader from './Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { updateItinerary } from '../../components/itineraryComponents/itineraryReducer';

const UpdateModal = (props) => {
  // console.log(props);
  const dispatch = useDispatch();
  const { loading, suggestions } = useSelector(state => state.suggestions);
  const { itinerary, itineraryID } = useSelector(state => state.itinerary);
  const { newActivity, selectedTime } = useSelector(state => state.suggestions);

  // console.log("Update Modal Activity:", selectedTime);
  
  const saveUpdate = () => {
    // console.log("before:", itinerary);
    const copyItinerary = JSON.parse(JSON.stringify(itinerary));
    const copyActivity = JSON.parse(JSON.stringify(newActivity));
    copyItinerary[selectedTime.date][selectedTime.timeOfDay] = copyActivity;
    // console.log(copyItinerary);
          
    const formData = {
      newActivity: copyActivity,
      selectedDay: selectedTime.date,
      selectedTime: selectedTime.timeOfDay,
      itineraryID,
      // itinerary: copyItinerary,
    };

    fetch('/api/trip/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(response => {
        const parsedTrip = JSON.parse(response.trip);
        const payload = {
          itinerary: parsedTrip.itinerary,
          itineraryID: response._id,
        }
        dispatch(updateItinerary(payload));
        props.toastify();
        props.onHide();

      })
      .catch(err => {
        console.log('error updating itinerary details in database ===>', err);
      });
  }

  let renderSuggestions;
  if (Array.isArray(suggestions)){
    renderSuggestions = suggestions.map((suggestion, index) => {
      return (<SuggestionCard className='suggestion-card' key={index} suggestion={suggestion}/>)
    });
  } else {
    renderSuggestions = [];
  }

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        // dialogClassName="modal-90vw"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Select a new activity
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-">
          {loading ? <div id='suggestion-card-spinner'><Loader /><p>Fetching your suggestions..</p></div> :
            renderSuggestions
          }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button onClick={saveUpdate}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UpdateModal;