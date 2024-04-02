import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';


const AdminDashboard = () => {
  return (
    <Tabs
      defaultActiveKey="profile"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="bookings" title="bookings">
        <Bookings />
      </Tab>
      <Tab eventKey="user" title="user">
        <User />
      </Tab>
    </Tabs>
  )
}

export default AdminDashboard

export function Bookings() {
  const [tickets, settickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const response = await axios.get('http://localhost:3000/getTickets');
      settickets(response.data);
    };

    fetchTickets();
  }, []);

  return (
    <Table striped bordered hover variant="dark" className='mt-4'>
    <thead>
      <tr>
        <th>Ticket-Id</th>
        <th>Passanger Name</th>
        <th>Passenger Age</th>
        <th>Ticket Type</th>
        <th>Origin & Destination</th>
        <th>Airline Name</th>
        <th>Departure Date</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      {tickets.map(ticket => (
        <tr key={ticket._id}>
          <td>{ticket._id}</td>
          <td>{ticket.passengerName}</td>
          <td>{ticket.passengerAge}</td>
          <td>{ticket.ticketType}</td>
          <td>{ticket.origin}--{ticket.destination}</td>
          <td>{ticket.summary.t}</td>
          <td> <td>{ticket.ddate}</td></td>
          <td>{ticket.summary.p}</td>
        </tr>))}
    </tbody>
  </Table>
  )
}

export function User() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:3000/getUser');
      setUsers(response.data);
    };

    fetchUsers();
  }, []);
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user. All data will be lost permanently');
    if (confirmDelete) {
      await axios.delete(`http://localhost:3000/getUser/${id}`);
    setUsers(users.filter(user => user._id !== id));
    }
  };

  return (
      <Table striped bordered hover variant="dark" className='mt-4'>
        <thead>
          <tr>
            <th>User-Id</th>
            <th>Full Name</th>
            <th>email</th>
            <th>Number</th>
            <th>edit</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.number}</td>
              <td><button onClick={() => deleteUser(user._id)}>Delete</button></td>
            </tr>))}
        </tbody>
      </Table>

  )
}