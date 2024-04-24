import image from '../assets/placeholder-image.jpeg';

const Itinerary = ({ itinerary }) => {
  // console.log("Itinerary Component:", itinerary.itinerary.itinerary);
  if (itinerary) return (
    <div id='itinerary-details'>
      {Object.entries(itinerary.itinerary).map(([date, timesOfDay]) => (
        <div className="day-entry" key={date}>
          <h2 className='date'>{date}</h2>
          <div className="day-details">
            {Object.entries(timesOfDay).map(([timeOfDay, suggestion]) => (
              <div className='activity-details' key={timeOfDay}>
                <div>
                  <div class='activity-img-container'>
                    <img id="activity-image" src={image} height="300" width="300"/>
                    <div className='image-header'>{suggestion.activity}</div>
                  </div>
                  <p className="time-of-day">{timeOfDay}</p>
                  {/* <p><b>{suggestion.activity}</b></p> */}
                  <p>{suggestion.description}</p>
                  <p>{suggestion.address}</p>
                </div>
                <div className='activity-button-container'>
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
