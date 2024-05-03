/**
 * @file Renders a page with an itinerary component, which displays the details of
 * an itinerary that the user has created. An arbitrary itinerary is passed as a prop
 * to the itinerary component.
 * @module ItineraryPage
 * @returns {JSX.Element} The rendered itinerary page component.
 */
// Package dependencies
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container';
// Redux reducer actions
import { resetTrip } from "../../components/formComponents/tripReducer";
import { updateLoading } from "../../components/itineraryComponents/itineraryReducer";

// Components
import Itinerary from "./Itinerary"

const ItineraryPage = () => {
  const { destination, itinerary, itineraryID } = useSelector(state => state.itinerary);

  const dispatch = useDispatch();

  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    dispatch(resetTrip());
    dispatch(updateLoading(false));
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <p id="itinerary-title">Your trip to {destination}</p>
      <Itinerary itinerary={itinerary} itineraryID={itineraryID}/>
    </div>
  );
};

export default ItineraryPage;
