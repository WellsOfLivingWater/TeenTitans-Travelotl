import { useSelector } from "react-redux";

import Header from "./Header";
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