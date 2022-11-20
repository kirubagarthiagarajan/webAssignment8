
import { React, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Card } from 'react-bootstrap';
function Home() {
  let navigate = useNavigate();

  const user = '';

  const [state, setState] = useState({
    user: ''
  });

  useEffect(() => {
    if (sessionStorage.getItem("user") == null) {
      navigate("/login");
    }
    else
      setState(prevState => ({
        user: sessionStorage.getItem("user")
      }));
  })
  return (

    <div id="container">
      {state.user.length > 0 && (
        <h4 style={{ textAlign: "center", paddingTop: "20px" }}> Welcome, &nbsp; {state.user}</h4>

      )}
      <div className="cardContainer">
        <Card style={{ backgroundColor: 'grey', color: 'white' }}>
          <Card.Body>
            <Card.Title style={{ color: 'cyan' }}>Welcome to Job Searcher</Card.Title>
            <Card.Subtitle style={{ color: 'black' }} className="mb-2">You need a job. We have it.</Card.Subtitle>
            <Card.Text>
              We offer job postings in various fields of computer science such as Developing, networking, Operating Systems and OS.
            </Card.Text>
            <Card.Link style={{ color: 'cyan', textDecoration: 'none' }} href="http://localhost:3000/aboutus">About Us</Card.Link>
            <Card.Link style={{ color: 'cyan', textDecoration: 'none' }} href="http://localhost:3000/contact">Contact Us</Card.Link>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default Home
