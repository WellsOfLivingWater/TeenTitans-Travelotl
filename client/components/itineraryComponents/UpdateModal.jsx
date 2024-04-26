import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ActivityCard from './ActivityCard';
import SuggestionCard from './SuggestionCard'

const UpdateModal = (props) => {
  const date = new Date;
  console.log(date, props);
  const { suggestions } = props.suggestions;
  console.log("updateModal suggestions ===>", suggestions);
  // const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setLoading] = useState(false);

  // useEffect(() => {
  //   const formData = {
  //     activity: props.activity,
  //     itinerary: props.itinerary,
  //   }

  //   fetch('/api/trip/suggest', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
  //     },
  //     body: JSON.stringify(formData)
  //   })
  //     .then(response => response.json())
  //     .then(response => {
  //       setSuggestions(response.activities);
  //       console.log('fetch suggestion response ===>',response);
  //       console.log('response.activities ====>',response.activities)
  //     });
  // }, []);
      
  
  const suggestActivities = () => {
    // console.log(props.itineraryid);
    // console.log(props.tripActivity);
  }

  // const renderSuggestions = suggestions.map((suggestion, index) => {
  //   return (<SuggestionCard key={index} suggestion={suggestion}/>)
  // });
  const renderSuggestions = [];
  // for (let i = 0; i < 3; i++) {
  //   renderSuggestions.push(<SuggestionCard key={i} itineraryID={'test'} suggestion={'test'}/>)
  // }

  return (
    <Modal
      {...props}
      size="lg"
      // dialogClassName="modal-1000w"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Select a new activity
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {renderSuggestions}
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
        <Button onClick={suggestActivities}>Suggest Activities</Button>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={props.onHide}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateModal;