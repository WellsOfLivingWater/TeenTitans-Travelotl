import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import UpdateModal from './UpdateModal';
import { useState } from 'react';
import image from '../../assets/placeholder-image.jpeg';

const ActivityCard = ({ itinerary, itineraryID, suggestion }) => {
  const [modalShow, setModalShow] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  const openModal = async (e) => {
    // console.log('modal click ===>', suggestion.activity);
    const formData = {
      activity: props.activity,
      itinerary: props.itinerary,
    }

    fetch('/api/trip/suggest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(response => {
        setSuggestions(response.activities);
        console.log('fetch suggestion response ===>',response);
        console.log('response.activities ====>',response.activities)
      });
    setModalShow(true);
  }
  
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{suggestion.activity}</Card.Title>
        <Card.Text>
          {suggestion.description}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{suggestion.address}</ListGroup.Item>
        {/* <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item> */}
      </ListGroup>
      <Card.Body>
        <Button variant="primary">
          Details
        </Button>
        {" "}
        <Button variant="primary" onClick={openModal} activity={suggestion.activity}>
          Change Activity
        </Button>
      </Card.Body>
      <>
        <UpdateModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          // itinerary={itinerary}
          // itineraryid={itineraryID}
          // activity={suggestion.activity}
          suggestions={suggestions}
        />
      </>
    </Card>
  );
}

export default ActivityCard;