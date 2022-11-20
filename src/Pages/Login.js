import React, { useState } from 'react'
import './pages.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function Login() {
    let navigate = useNavigate();

    const [state, setState] = useState({
        email: "",
        password: "",
        errorMail: false,
        errorTwoField: false,
        errorInvalid: false
    })

    function handleChangeEmail(e) {
        setState(prevState => ({
            email: e.target.value,
            password: prevState.password,
            errorTwoField: false,
            errorMail: false,
            errorInvalid: false
        }));
    }

    function clearForm() {
        setState({
            email: "",
            password: "",
            errorMail: false,
            errorTwoField: false,
            errorInvalid: false
        });
    }



    function handleChangePassword(e) {
        setState(prevState => ({
            email: prevState.email,
            password: e.target.value,
            errorTwoField: false,
            errorMail: prevState.errorMail,
            errorInvalid: false
        }));
    }

    function handleSubmit(e) {

        e.preventDefault();
        if (state.email.length < 1 || state.password.length < 1) {
            setState(prevState => ({
                email: prevState.email,
                password: prevState.password,
                errorTwoField: true,
                errorMail: prevState.errorMail,
                errorInvalid: prevState.errorInvalid
            }));
        }
        else setState(prevState => ({
            email: prevState.email,
            password: prevState.password,
            errorTwoField: false,
            errorMail: prevState.errorMail,
            errorInvalid: prevState.errorInvalid
        }));


        axios.post("http://localhost:4000/user/login", {
            email: state.email,
            password: state.password
        })
            .then((response) => {
                if (response.data.code === 401) {
                    setState(prevState => ({
                        email: prevState.email,
                        password: prevState.password,
                        errorTwoField: prevState.errorTwoField,
                        errorMail: true,
                        errorInvalid: prevState.errorInvalid
                    }));
                }
                else
                    setState(prevState => ({
                        email: prevState.email,
                        password: prevState.password,
                        errorTwoField: prevState.errorTwoField,
                        errorMail: false,
                        errorInvalid: prevState.errorInvalid

                    }));


                if (response.data.code === 500) {
                    setState(prevState => ({
                        email: prevState.email,
                        password: prevState.password,
                        errorTwoField: prevState.errorTwoField,
                        errorMail: false,
                        errorInvalid: true
                    }));
                }
                else {
                    setState(prevState => ({
                        email: prevState.email,
                        password: prevState.password,
                        errorTwoField: prevState.errorTwoField,
                        errorMail: false,
                        errorInvalid: false
                    }));
                }
                if (response.data.code === 200) {
                    sessionStorage.setItem("user", state.email);
                    clearForm();
                    navigate("/home");
                }
            });

    }
    return (

        <div id="container">
            <main>
                <h2>Welcome to Job Portal</h2>
                <h3>Login with valid credentials, to access the portal.</h3>
                <br /><br />
                <form className='form-group' id="userSubmit" onSubmit={handleSubmit}>
                    <br /><br />
                    <label>E-mail Id*:</label>
                    <input type="email" name="emailId" id="emailId"
                        value={state.email || ''}
                        onChange={handleChangeEmail}
                        placeholder="E-mail" />

                    <br /><br />
                    {state.errorMail == true && (
                        <div id="error_emailId">
                            Please enter a valid e-mail id in the format of yourname@northeastern.edu.

                        </div>

                    )}
                    <br /><br />

                    <label>Password*:</label>
                    <input type="password" name="password" id="password"
                        value={state.password || ''}
                        onChange={handleChangePassword}
                        placeholder="Password" />
                    <br /><br />
                    {state.errorTwoField && (
                        <div id="error_emailId">
                            Please enter both e-mail and password to Login!

                        </div>
                    )}
                    {state.errorInvalid == true && (
                        <div id="error_emailId">
                            No user found with the given credentials!

                        </div>

                    )}


                    <br /><br />


                    <div>
                        <input className="buttons" type="submit" value="Login" />
                        <input className="buttons" type="reset" onClick={clearForm} value="Clear" />
                    </div>
                    <br /><br />

                </form>
            </main>
        </div>
    )
}

export default Login