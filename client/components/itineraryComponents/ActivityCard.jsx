import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import UpdateModal from './UpdateModal';
import { useState } from 'react';
import image from '../../assets/placeholder-image.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { selectOldActivity, updateLoading, updateSuggestions, setShowModal } from '../../reducers/suggestionsReducer';

const ActivityCard = ({ itinerary, itineraryID, time, suggestion }) => {
  // const { showModal } = useSelector(state => state.suggestions);
  const [modalShow, setModalShow] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const dispatch = useDispatch();

  const hideModal = async (e) => {
    // dispatch(setShowModal(false));
    setModalShow(false);
    setIsFetched(false);
  }

  const openModal = async (e) => {
    dispatch(updateLoading(true));
    dispatch(selectOldActivity({suggestion, time }));
    // dispatch(setShowModal(true));
    setModalShow(true);
    const formData = {
      activity: suggestion.activity,
      itinerary: itinerary,
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
        // setSuggestions(response.activities);
        dispatch(updateSuggestions({ suggestions: response.activities }))
        // console.log('fetch suggestion response ===>',response);
        // console.log('response.activities ====>',response.activities);
        dispatch(updateLoading(false));
      });
      // setModalShow(true);
  }
  
  return (
    <Card style={{ width: '18rem' }}>
      {/* <Card.Img variant="top" src={image} width="100%"/> */}
      
      <div id="card-img-container" class="card-img-top">
        <img src={image} class="card-img" width="100%"/>
        <div id="img-overlay" className='card-img-overlay text-white'>
          {/* <Card.Title>{suggestion.activity}</Card.Title> */}
          <Card.Text>
            {suggestion.activity}
          </Card.Text>
        </div>
      </div>
      <Card.Body id="card-description-container">
        {/* <Card.Title>{suggestion.activity}</Card.Title> */}
        <Card.Text id='card-addr-label'>
          ADDRESS
        </Card.Text>
        <Card.Text>
          {suggestion.address}
        </Card.Text>
      </Card.Body>
      {/* <ListGroup className="list-group-flush">
        <ListGroup.Item>{suggestion.address}</ListGroup.Item>
      </ListGroup> */}
      <Card.Body id="card-buttons">
        <div>
          <Button variant="primary">
            Details
          </Button>
          <Button variant="primary" onClick={openModal} activity={suggestion.activity}>
            Change Activity
          </Button>
        </div>
      </Card.Body>
      <>
        { modalShow && <UpdateModal
          show={modalShow}
          onHide={hideModal}
        />}
      </>
    </Card>
  );
}

export default ActivityCard;