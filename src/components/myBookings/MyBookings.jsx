import React, { useEffect, useState} from 'react'
import axios, { Axios } from 'axios';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import './mybookings.css'


const MyBookings = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'))
  const [myTickets, setmyTickets] = useState([])

  useEffect(() => {
    const userId = user.data._id;
    const fetchTickets = async () => {
      const response = await axios.get(`http://localhost:3000/getUserTicket/${userId}`);
      console.log(response)
      setmyTickets(response.data)
    };

    fetchTickets();
  }, []);
  const handleCancel = async(ticketId)=>{
    const confirmDelete = window.confirm('Are you sure you want to Cancel this ticket?Cancelation will cost you 20% of the price.');
   if (confirmDelete) {
    try {
      await axios.delete(`http://localhost:3000/deleteTicket/${ticketId}`);
      const updatedTickets = myTickets.filter(ticket=> ticket._id !== ticketId);
      setmyTickets(updatedTickets);
      
    } catch (error) {
      console.error(error);
      
    }
    
   }

  }
  return (
    <>
    <h2> <i>MY BOOKINGS</i> </h2>
    { myTickets && myTickets.map((myTicket)=>{
      return (
        <Card className='mb-2 mt-3 booking-item'  style={{width: '70%'}} key={myTicket._id}>
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
              <Card.Subtitle className='mb-2'>{myTicket.summary.t},{myTicket.summary.k}</Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">Ticket ID #{myTicket._id}</Card.Subtitle>
              <Row>
                <Col>
                  <h5>Name :  {myTicket.passengerName}</h5>
                </Col>
                <Col>
                  <h5>Passanger Age : {myTicket.passengerAge}</h5>
                </Col>
              </Row>
              <Card.Subtitle className="mb-2 text-muted"> Depart-Date :{myTicket.ddate}</Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">origin-{myTicket.origin}-destination-{myTicket.destination}</Card.Subtitle>
              <Card.Subtitle className="mb-2  mt-4"> Ticket Type :   {myTicket.ticketType}</Card.Subtitle>
            </Col>
            <Col>
              <Card.Title>RS.{Number(myTicket.summary.p.slice(1))*130}</Card.Title>
              <Button variant="outline-danger" onClick={() => handleCancel(myTicket._id)} >Cancel</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      )
    })}
     
    </>
  )
}

export default MyBookings
