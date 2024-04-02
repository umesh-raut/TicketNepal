import React from 'react'
import './hero.css'
import { Link } from 'react-router-dom';

const Hero = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'))
  return (
    <main className="hero container">
      <div className="hero-content">
        <h2>FLY WITH THE BEST</h2>
        <p>
          YOU DESERVE THE BEST FLIGHT AND WE’RE HERE TO HELP YOU FIND CHEAP AND BEST FLYING
          SERVICES.
        </p>
        <div className="hero-btn">
          {user ?
            <Link to='/findFlights'>
              <button>Find Flights</button>
            </Link>
            :
            <Link to='/login'>
              <button>Find Flights</button>
            </Link>
          }
        </div>
      </div>
      <div className="hero-image">
        <img src="/plane.gif" alt="hero-image" />
      </div>
    </main>
  )
}

export default Hero;
