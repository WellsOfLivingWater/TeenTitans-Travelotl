import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import UpdateModal from './UpdateModal';
import { useState } from 'react';
import image from '../../assets/placeholder-image.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { selectOldActivity, updateLoading, updateSuggestions, setShowModal } from '../../components/itineraryComponents/suggestionsReducer';
import ActivityDetailsModal from './ActivityDetailsModal';

const ActivityCard = ({ itinerary, itineraryID, time, suggestion, toastify }) => {
  const [modalShow, setModalShow] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const dispatch = useDispatch();
  const [detailsModalShow, setDetailModalShow] = React.useState(false);
  const hideModal = async (e) => {
    setModalShow(false);
    setIsFetched(false);
  };

  const openModal = async (e) => {
    dispatch(updateLoading(true));
    dispatch(selectOldActivity({ suggestion, time }));
    setModalShow(true);

    const extractActivities = [];
    Object.entries(itinerary).forEach(([date, timesOfDay]) => {
      Object.entries(timesOfDay).forEach(([timeOfDay, suggestion]) => {
        extractActivities.push({
          activity: suggestion.activity,
          address: suggestion.address,
        });
      });
    });

    const formData = {
      activity: suggestion.activity,
      itinerary: extractActivities,
    };

    fetch('/api/trip/suggest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((response) => {
        // setSuggestions(response.activities);
        dispatch(updateSuggestions({ suggestions: response.activities }));
        // console.log('fetch suggestion response ===>',response);
        // console.log('response.activities ====>',response.activities);
        dispatch(updateLoading(false));
      });
    console.log('suggestion', suggestion);
    // setModalShow(true);
  };

  const photoSrc = suggestion.photo != '' ? suggestion.photo : image;

  return (
    <Card style={{ width: '18rem' }}>
      {/* <Card.Img variant="top" src={image} width="100%"/> */}

      <div id='card-img-container' className='card-img-top'>
        <img src={photoSrc} className='card-img' width='100%' />
        <div id='img-overlay' className='card-img-overlay text-white'>
          {/* <Card.Title>{suggestion.activity}</Card.Title> */}
          <Card.Text>{suggestion.activity}</Card.Text>
        </div>
      </div>
      <Card.Body id='card-description-container'>
        {/* <Card.Title>{suggestion.activity}</Card.Title> */}
        <Card.Text id='card-addr-label'>ADDRESS</Card.Text>
        <Card.Text>{suggestion.address}</Card.Text>
      </Card.Body>
      {/* <ListGroup className="list-group-flush">
        <ListGroup.Item>{suggestion.address}</ListGroup.Item>
      </ListGroup> */}
      <Card.Body id='card-buttons'>
        <div>
          <Button variant='primary' onClick={() => setDetailModalShow(true)}>
            Details
          </Button>

          <ActivityDetailsModal
            details={suggestion}
            show={detailsModalShow}
            onHide={() => setDetailModalShow(false)}
          />
          <Button
            variant='primary'
            onClick={openModal}
            activity={suggestion.activity}
          >
            Change Activity
          </Button>
        </div>
      </Card.Body>
      <>
        {modalShow && (
          <UpdateModal
            show={modalShow}
            onHide={hideModal}
            toastify={toastify}
          />
        )}
      </>
    </Card>
  );
};

export default ActivityCard;
