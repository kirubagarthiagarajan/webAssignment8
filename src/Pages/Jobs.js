import { React, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Card } from 'react-bootstrap';
function Jobs() {
    let navigate = useNavigate();

    const jobArray = [["Amazon Inc.", "Developer 1", "Dallas", "$4500/month"], ["Fidelity Investments", "Cloud Developer", "Boston", "$6500/month"],
    ["Meta", "AI Architect", "Florida", "$7500/yr"], ["Netflix", "Content-Supervisor", "Austin", "$5500/yr"]];

    useEffect(() => {
        if (sessionStorage.getItem("user") == null) {

            navigate("/login");
        }
    })


    return (
        <div id="container">
            <div class="row">
                {jobArray.map(job => {
                    return (
                        <Card style={{ backgroundColor: 'yellow', color: 'black', marginTop: "100px", width: "31%", margin: " 20px 10px 20px 20px" }}>
                            <Card.Body>
                                <Card.Title style={{ color: 'cyan' }}>{job[0]}</Card.Title>
                                <Card.Subtitle style={{ color: 'black' }} className="mb-2">{job[1]}</Card.Subtitle>
                                <Card.Text>
                                    <b>{job[2]}
                                        <p>{job[3]}</p>
                                    </b>

                                </Card.Text>

                            </Card.Body>
                        </Card>


                    );
                })}
            </div>
        </div>
    )
}

export default Jobs
