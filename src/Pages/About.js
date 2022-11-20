import { React, useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';

function About() {
  let navigate = useNavigate();




  useEffect(() => {
    if (sessionStorage.getItem("user") == null) {
      navigate("/login");
    }
  })

  return (


    <div id="container">



      <div className="cardContainer">
        <Card style={{ backgroundColor: 'yellow', color: 'black' }}>
          <Card.Body>
            <Card.Title style={{ color: 'cyan' }}>About Us</Card.Title>
            <Card.Subtitle style={{ color: 'black' }} className="mb-2">You need a job. We have it.</Card.Subtitle>
            <Card.Text>
              We are a 15 year-old company that works on making the youth generation work in <b>the best jobs</b> possible. We have successfully placed over <b>10,000 candidates</b> in seveeral <b>Fortune 500 companies.</b>
            </Card.Text>

          </Card.Body>
        </Card>

      </div>

    </div >

  )
}

export default About
