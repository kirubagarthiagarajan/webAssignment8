import { React, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Card } from 'react-bootstrap';
function Contact() {
  let navigate = useNavigate();


  useEffect(() => {
    if (sessionStorage.getItem("user") == null) {

      navigate("/login");
    }
  })


  return (
    <div id="container">
      <div className="cardContainer">
        <Card style={{ backgroundColor: 'yellow', color: 'white' }}>
          <Card.Body>
            <Card.Title style={{ color: 'cyan' }}>Contact Us:</Card.Title>
            <Card.Subtitle style={{ color: 'black' }} className="mb-2">Contact us through the given links.</Card.Subtitle>
            <Card.Text>
            </Card.Text>
            <Card.Link style={{ color: 'blue', textDecoration: 'none' }} href="https://facebook.com">Facebook</Card.Link>
            <Card.Link style={{ color: 'purple', textDecoration: 'none' }} href="https://instagram.com">Instagram</Card.Link>
            <Card.Link style={{ color: 'dodgeblue', textDecoration: 'none' }} href="https://linkedn.com">LinkedIn</Card.Link>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default Contact
