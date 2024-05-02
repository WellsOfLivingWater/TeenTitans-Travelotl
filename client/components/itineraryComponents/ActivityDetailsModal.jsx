import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function ActivityDetailsModal(props) {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          {props.details.activity}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          defaultActiveKey='info'
          id='uncontrolled-tab-example'
          className='mb-3'
        >
          <Tab eventKey='info' title='Info'>
            <Container>
              <Row>
                <Col xs={12} md={8}>
                  <p>Address: {props.details.details.formattedAddress}</p>
                  <a
                    href={props.details.details.googleMapsUri}
                    className='link-primary'
                    target='_blank'
                  >
                    show in maps
                  </a>
                  <p>
                    Phone Number: {props.details.details.nationalPhoneNumber}
                  </p>
                </Col>
                <Col xs={6} md={4}>
                  <p className='largeFont'>{props.details.details.rating}</p>
                </Col>
              </Row>
            </Container>
          </Tab>
          <Tab eventKey='reviews' title='Reviews'>
            <ul>
              {props.details.details.reviews?.map((review, index) => (
                <li key={index}>
                  <strong>{review.authorAttribution.displayName}</strong>
                  <p>{review?.text?.text}</p>
                  <p>Rating: {review.rating}</p>
                </li>
              ))}
            </ul>
          </Tab>
          <Tab eventKey='photos' title='Photos'>
            more photos here
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ActivityDetailsModal;
// function App() {
//   const [modalShow, setModalShow] = React.useState(false);

//   return (
//     <>
//       <Button variant='primary' onClick={() => setModalShow(true)}>
//         Launch vertically centered modal
//       </Button>

//       <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//     </>
//   );
// }

// render(<App />);
