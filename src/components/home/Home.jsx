import React from 'react'
import Hero from '../heroSec/Hero';
import BookingCard from '../bookingCard/BookingCard'
import AboutUs from '../about/AboutUs'
import '../../App.css'


const Home = () => {

  return (
    <>
       <Hero/>
      <br />
      <div >
    <AboutUs/>
       </div> 
       {/* <div className="container">
    <BookingCard/>
       </div>  */}
       </>
  )
}

export default Home
