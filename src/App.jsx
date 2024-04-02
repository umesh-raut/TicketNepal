import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/login/Login'
import Register from './components/login/Register'
import Home from './components/home/Home'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import BookingCard from './components/bookingCard/BookingCard'
import MyBookings from './components/myBookings/MyBookings'
import AboutUs from './components/about/AboutUs'
import AdminDashboard from './components/dashboard/AdminDashboard'





function App() {
  const user = JSON.parse(localStorage.getItem('currentUser'))
  function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '/login'

  }


  return (
    <>
      <Navbar className="bg-body-tertiary customnav" sticky="top" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              src="/vite.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Company logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav >
              {user ? <>
                <Nav.Link href="/findFlights">Find Flights</Nav.Link>
                <Nav.Link href="/myBookings">My bookings</Nav.Link></> : (<Nav.Link href="/About" >About Us</Nav.Link>)}
              {user ? (<Nav.Link onClick={logout}>{user.data.fullName}</Nav.Link>) : <Nav.Link href="/login">Log Out</Nav.Link>}
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/findFlights' exact element={<BookingCard />} />
          <Route path='/dashboard' exact element={<AdminDashboard />} />
          <Route path='/About' exact element={<AboutUs />} />
          <Route path='/myBookings' exact element={<MyBookings />} />
          <Route path='/login' exact element={<Login />} />
          <Route path='/register' exact element={<Register />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
