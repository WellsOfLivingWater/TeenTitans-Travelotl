/**
 * @file Renders a page with an itinerary component, which displays the details of
 * an itinerary that the user has created. An arbitrary itinerary is passed as a prop
 * to the itinerary component.
 * @module ItineraryPage
 * @returns {JSX.Element} The rendered itinerary page component.
 */
// Package dependencies
import { useSelector } from "react-redux";

// Components
import Header from "../Header";
import Itinerary from "./Itinerary"


const ItineraryPage = () => {
  const { itinerary, itineraryID } = useSelector(state => state.itinerary);
  // console.log('itineraryPage itinerary ===>', itinerary);
  // console.log('state itineraryID ===>', itineraryID)
  // console.log('Itinerary Page state selector ===>', itinerary);
  return (
    <div>
      <Header />
      <h2>Your Itinerary</h2>
      <Itinerary itinerary={itinerary} itineraryID={itineraryID}/>
    </div>
  );
};

export default ItineraryPage;