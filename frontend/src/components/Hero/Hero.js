import React from 'react'
import hero from "../../videos/hero-video2.mp4";
import "./Hero.css"

const Hero = () => {
  return (
    <div>
      <div className="ero-container">
        <video src={hero} autoPlay loop muted />
        <div className="ero-content">
          <h1>Unlock the Power of Imagination with Reading</h1>
          <p>
            The more that you read, the more things you will know. The more that
            you learn, the more places you'll go - Dr.Seuss
          </p>
        </div>
      </div>
    </div>
  )
}

export default Hero
