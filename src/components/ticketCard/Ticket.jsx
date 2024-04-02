import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import BookedTicket from './BookedTicket';
import './ticket.css'





const Ticket = ({ data, sdate, originCode, destiCode, ticketType }) => {
  const summaries = data.summary.cp;
  const airports = data.airports;
  const ddate = sdate;
  const origin = originCode;
  const destination = destiCode;
  const ticketClass = ticketType;
  const [showBookedTicket, setShowBookedTicket] = useState(false);
  const [selectedSummary, setSelectedSummary] = useState(null);

  const handleBook = (summary) => {
    setSelectedSummary(summary);
    setShowBookedTicket(true);

  };



  return (
    <div>
      {showBookedTicket ?

        <BookedTicket summary={selectedSummary} ddate={ddate} airports={airports} origin={origin} destination={destination} ticketType={ticketClass} /> :

        summaries.map((summary, index) => (
          <Card key={index} className='mb-2 booking-item'>
            <Card.Body>
              <Row>
                <Col>
                  <img
                    src="/vite.svg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top mb-2"
                    alt="Company logo"
                  />
                  <Card.Title>{summary.t},{summary.k}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Departure-Date:{ddate}</Card.Subtitle>
                  <Card.Title >{airports.map((airport, idx) => {
                    return (
                      <div key={idx}>{airport.c}-</div>
                    )

                  })},layovers,--- Ticket Type: {ticketClass}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">origin-{origin}-destination-{destination}</Card.Subtitle>
                </Col>
                <Col>
                  <Card.Title>RS.{Number(summary.p.slice(1)) * 130}</Card.Title>
                  <Button variant="outline-success" onClick={() => handleBook(summary)} >Book Now</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      }
    </div>
  );
};

export default Ticket;