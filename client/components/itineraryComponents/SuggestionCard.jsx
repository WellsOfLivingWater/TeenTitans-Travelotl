import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import UpdateModal from './UpdateModal';
import { useState } from 'react';
import image from '../../assets/placeholder-image.jpeg';

const ActivityCard = ({ itineraryID, suggestion }) => {
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const openModal = (e) => {
  //   console.log('modal click ===>', suggestion.activity);
  //   // console.log()
  //   setModalShow(true);
  // }

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
        <Button variant="primary" activity={suggestion.activity}>
          Select Activity
        </Button>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
      <>
        <UpdateModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          itineraryID={itineraryID}
          activity={suggestion.activity}
        />
      </>
    </Card>
  );
}

export default ActivityCard;