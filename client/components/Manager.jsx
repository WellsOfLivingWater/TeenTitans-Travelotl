/**
 * @file Renders the itinerary manager component.
 * Allows the user to view, delete, and navigate to the details of their itineraries.
 * 
 * @todo Eliminate redundant DB query.
 * 
 * @module Manager
 * @returns {JSX.Element} The rendered itinerary manager component.
 */
// Package dependencies
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateItineraries, updateItinerary } from "../reducers/itineraryReducer";
import { useNavigate } from 'react-router-dom';

// Components
import Header from "./Header";

const Manager = () => {
  const { itineraries } = useSelector(state => state.itinerary);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Retrieve all itineraries associated with the user and update state
  useEffect(() => {
    try {
      const getItineraryList = async () => {
        let itineraryList = await fetch('api/trip/retrieve', {
          method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
            },
        });
  
        itineraryList = await itineraryList.json();
  
        console.log(itineraryList);
        dispatch(updateItineraries(itineraryList));
      }
      getItineraryList();   
    } catch (error) {
      console.error('Error with request:', error);
    }
    
  }, []);

  /**
   * Deletes the selected itinerary from the database.
   * 
   * @async
   * @param {Event} e The event object.
   */
  const deleteItinerary = async e => {
    const tripId = e.target.parentNode.parentNode.id;
    
    try {
      let remainingTrips = await fetch('api/trip/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
        },
        body: JSON.stringify({ tripId: tripId }),
      });

      remainingTrips = await remainingTrips.json();
      dispatch(updateItineraries(remainingTrips));
    } catch (err) {
      console.error('Error with request:', err);
    }
  }

  /**
   * Navigates to the details of the selected itinerary.
   * 
   * @async
   * @param {Event} e The event object.
   */
  const seeDetails = async e => {
    const tripId = e.target.parentNode.parentNode.id;
    console.log(tripId);

    try {
      let itineraryList = await fetch('api/trip/retrieve', {
        method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
          },
      });

      itineraryList = await itineraryList.json();

      // console.log(itineraryList);

      let foundTrip;
      for (const trip of itineraryList) {
        // console.log(trip);
        // console.log("Parse ID:", trip.tripId, "| Target ID:", tripId)
        if (trip._id === tripId) {
          foundTrip = JSON.parse(trip.trip);
          break;
        }
      }
      // console.log("See Details of:", foundTrip);
      const payload = {
        itinerary: foundTrip.itinerary,
        itineraryID: tripId,
      };
      console.log('See details ===>', payload.itinerary);

      if (foundTrip) {
        // dispatch(updateItinerary(foundTrip.itinerary));
        dispatch(updateItinerary(payload));
        navigate('/itinerary');
      }
      
    } catch (error) {
      console.error('Error with request:', error);
    }
  };

  const itineraryList = [...itineraries];
  const renderList = itineraryList.map((itinerary) => {
    return (<div className='trip-tile' key={itinerary._id} id={itinerary._id}>
      <h3>{itinerary.destination}</h3>
      <p>From: <b>{itinerary.startDate}</b></p>
      <p>To: <b>{itinerary.endDate}</b></p>
      <p>Created on: <b>{new Date(itinerary.createdAt).toLocaleString()}</b></p>
      <div className="tile-buttons"><button onClick={ seeDetails }>See Details</button><button onClick={ deleteItinerary }>Delete</button></div>
    </div>)
  })
  // state: { itinerary: { itinerary: itinerary.trip }}
  // to={{ pathname: '/other', state: dataToPass }}
  

  return (<div>
    <Header />
    <h2>Itinerary Manager</h2>
    <div id='itinerary-grid'>{renderList}</div>
  </div>)
}

export default Manager;