/**
 * @file Renders a page with an itinerary component, which displays the details of
 * an itinerary that the user has created. An arbitrary itinerary is passed as a prop
 * to the itinerary component.
 * @module ItineraryPage
 * @returns {JSX.Element} The rendered itinerary page component.
 */
// Package dependencies
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux reducer actions
import { updateStep } from "../../reducers/tripReducer";
import { updateLoading } from "../../reducers/itineraryReducer";

// Components
import Header from "../Header";
import Itinerary from "./Itinerary"

const ItineraryPage = () => {
  const { itinerary, itineraryID } = useSelector(state => state.itinerary);

  const dispatch = useDispatch();

  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    dispatch(updateStep(0));
    dispatch(updateLoading(false));
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header />
      <h2>Your Itinerary</h2>
      <Itinerary itinerary={itinerary} itineraryID={itineraryID}/>
    </div>
  );
};

export default ItineraryPage;