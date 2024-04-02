import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './ticket.css'


const BookedTicket = ({ summary, ddate, airports, origin, destination, ticketType }) => {
  const p = summary.p;
  const [passengerName, setPassengerName] = useState('');
  const [passengerAge, setPassengerAge] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const userId = user.data._id;
    const URI = "http://localhost:3000/myBookings";
    //redirect to payment first
    // const payload = {
    //   "return_url": "http://localhost:5173/myBookings",
    //   "website_url": "http://localhost:5173/",
    //   "amount": Number(p.slice(1)) * 130,
    //   "purchase_order_id": "test12",
    //   "purchase_order_name": "test",
    //   "customer_info": {
    //     "name": `${user.data.fullName}`,
    //     "email": `${user.data.email}`,
    //     "phone": `9810000001`
    //   },

    // try {
    //   const response = await axios.post('http://localhost:3000/khaltiApi', payload);
    //   console.log(response);
    //   if (response) {
    //     window.location.href = `${response.data.data.payment_url}`;

    //   }

    // } catch (error) {
    //   console.error(error);
    // }

    const dataToBeSent = {
      passengerName,
      passengerAge,
      userId,
      ticketType,
      summary,
      origin,
      destination,
      ddate,
      airports
    };

    try {
      const response = await axios.post(URI, dataToBeSent);
      console.log(response);
      window.location.href = '/myBookings'
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card className='booking-item'>
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
            <Card.Subtitle>{summary.t},{summary.k}</Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted"> Depart-Date :{ddate}</Card.Subtitle>
            <Row>
              <Col>
                <input
                  type="text"
                  placeholder="Passenger Name"
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                />
              </Col>
              <Col>
                <input
                  type="number"
                  placeholder="Passenger Age"
                  value={passengerAge}
                  onChange={(e) => setPassengerAge(e.target.value)}
                /></Col>
            </Row>
            <Card.Title >
              {airports.map((airport, idx) => {
                return (
                  <div key={idx}>{airport.c}-</div>
                )
              })},layover--- Ticket Type: {ticketType}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">origin-{origin}-destination-{destination}</Card.Subtitle>
          </Col>
          <Col>
            <Card.Title>RS.{Number(p.slice(1)) * 130}</Card.Title>
            <Button variant="outline-success" onClick={handleSave} >Confirm Booking</Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );

};

export default BookedTicket;