import React from 'react'
import '../../assets/assets/styles/custom.css'
import Servecs from'../../component/pages/Servecs'
// import Servixes from './Servixes'
function Home() {
  return (
    <div>
       <section className="video-section">
        <div  className="sec-bg" ></div>
        <div className="auto-container">
            <h5>Working since 2010</h5>
            <h2>We are leader <br/> in Car Mechanical Work</h2>
            <div className="video-box">
                <div className="video-btn"><a href="https://www.youtube.com/watch?v=nfP5N9Yc72A&amp;t=28s" className="overlay-link lightbox-image video-fancybox ripple"><i className="flaticon-play"></i></a></div>
                <div className="text">Watch intro video <br/> about us</div>
            </div>
        </div>
    </section>
    <Servecs/>
    </div>
  )
}

export default Home
