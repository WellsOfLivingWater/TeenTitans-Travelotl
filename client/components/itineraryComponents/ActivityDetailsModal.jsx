import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ListGroup from 'react-bootstrap/ListGroup';

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
          <Tab
            eventKey='info'
            title='Info'
            style={{ height: '200px', overflowY: 'scroll' }}
          >
            <Container>
              <Row>
                <Col xs={12} md={8}>
                  <ListGroup>
                    <ListGroup.Item>
                      Address:{' '}
                      <p className='sub'>
                        {props.details.details.formattedAddress}
                        {'   '}
                        <a
                          href={props.details.details.googleMapsUri}
                          className='link-primary'
                          target='_blank'
                        >
                          show in maps
                        </a>
                      </p>
                    </ListGroup.Item>
                    {props.details.details.nationalPhoneNumber && (
                      <ListGroup.Item>
                        Phone Number:{' '}
                        <p className='sub'>
                          {props.details.details.nationalPhoneNumber}
                        </p>
                      </ListGroup.Item>
                    )}
                    {props.details.details.websiteUri && (
                      <ListGroup.Item>
                        website:{' '}
                        <a
                          href={props.details.details.websiteUri}
                          className='link-primary'
                          target='_blank'
                        >
                          <p className='sub'>
                            {props.details.details.websiteUri}
                          </p>
                        </a>
                      </ListGroup.Item>
                    )}
                  </ListGroup>

                  {props.details.details.regularOpeningHours && (
                    <div>
                      <ListGroup>
                        <ListGroup.Item>
                          Open Now:{' '}
                          {props.details.details.regularOpeningHours.openNow
                            ? 'Yes'
                            : 'No'}
                        </ListGroup.Item>
                      </ListGroup>
                      <ListGroup>
                        <ListGroup.Item>
                          <h4>Opening Hours</h4>
                          {props.details.details.regularOpeningHours.weekdayDescriptions.map(
                            (description, index) => (
                              <li className='sub' key={index}>
                                {description}
                              </li>
                            )
                          )}
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                  )}
                </Col>
                <Col xs={6} md={4}>
                  <p className='largeFont'>{props.details.details.rating}</p>
                </Col>
              </Row>
            </Container>
          </Tab>
          <Tab
            eventKey='reviews'
            title='Reviews'
            style={{ height: '200px', overflowY: 'scroll' }}
          >
            <ul>
              {props.details.details.reviews?.map((review, index) => (
                <li key={index}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <strong style={{ marginRight: '10px' }}>
                      {review.authorAttribution.displayName}
                    </strong>
                    <div className='float-end'>
                      <p
                        style={{
                          marginRight: '10px',
                          color: 'gray',
                          fontSize: '14px',
                        }}
                      >
                        Rating: {review.rating} - {review.publishTime}
                      </p>
                    </div>
                  </div>
                  <p className='sub'>{review?.text?.text}</p>
                </li>
              ))}
            </ul>
          </Tab>
          <Tab eventKey='photos' title='Photos'></Tab>
          {/* <div>
            <h2>Photos</h2>
            <div className='photo-list'>
              {props.details.details.photos?.map((photo, index) => (
                <div key={index} className='photo-item'>
                  <img
                    src={`https://places.googleapis.com/v1/${photo.name}/media?key=${process.env.GOOGLE_API_KEY}&maxHeightPx=400&maxWidthPx=400`}
                  />
                </div>
              ))}
            </div>
          </div> */}
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ActivityDetailsModal;
