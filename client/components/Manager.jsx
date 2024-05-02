/**
 * @file Renders the itinerary manager component.
 * Allows the user to view, delete, and navigate to the details of their itineraries.
 *
 * @module Manager
 * @returns {JSX.Element} The rendered itinerary manager component.
 */
// Package dependencies
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateItineraries,
  updateItinerary,
} from '../reducers/itineraryReducer';
import { useNavigate } from 'react-router-dom';
import React from 'react';

import Container from 'react-bootstrap/Container';
// Components
import Header from './Header';

const Manager = () => {
  const { itineraries } = useSelector((state) => state.itinerary);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Retrieve all itineraries associated with the user and update state
  useEffect(() => {
    try {
      const getItineraries = async () => {
        dispatch(
          updateItineraries(
            await fetch('api/trip/retrieve', {
              method: 'GET',
            }).then((res) => res.json())
          )
        );
      };
      getItineraries();
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
  const deleteItinerary = async (e) => {
    const tripId = e.target.parentNode.parentNode.id;

    try {
      await fetch('api/trip/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
        body: JSON.stringify({ tripId: tripId }),
      });
      let remainingTrips = itineraries.filter((trip) => trip._id !== tripId);
      dispatch(updateItineraries(remainingTrips));
    } catch (err) {
      console.error('Error with request:', err);
    }
  };

  /**
   * Navigates to the details of the selected itinerary.
   *
   * @param {Event} e The event object.
   */
  const seeDetails = (e) => {
    const tripId = e.target.parentNode.parentNode.id;
    console.log(tripId);

    try {
      let foundTrip;
      for (const trip of itineraries) {
        if (trip._id === tripId) {
          // foundTrip = JSON.parse(trip.trip);
          foundTrip = trip;
          break;
        }
      }

      const parsedTrip = JSON.parse(foundTrip.trip);
      const payload = {
        destination: foundTrip.destination,
        itinerary: parsedTrip.itinerary,
        itineraryID: tripId,
      };
      console.log('See details ===>', payload.itinerary);

      if (foundTrip) {
        dispatch(updateItinerary(payload));
        navigate('/itinerary');
      }
    } catch (error) {
      console.error('Error with request:', error);
    }
  };

  const renderList = [];
  itineraries.forEach((itinerary) => {
    renderList.unshift(
      <div className='trip-tile' key={itinerary._id} id={itinerary._id}>
        <h3>{itinerary.destination}</h3>
        <p>
          From: <b>{itinerary.startDate}</b>
        </p>
        <p>
          To: <b>{itinerary.endDate}</b>
        </p>
        <p>
          Created on: <b>{new Date(itinerary.createdAt).toLocaleString()}</b>
        </p>
        <div className='tile-buttons'>
          <button onClick={seeDetails}>See Details</button>
          <button onClick={deleteItinerary}>Delete</button>
        </div>
      </div>
    );
  });

  return (
    <div>
      <Container>
        <Header />
        <p id='itinerary-title'>Itinerary Manager</p>
        <div id='itinerary-grid'>{renderList}</div>
      </Container>
    </div>
  );
};

export default Manager;
