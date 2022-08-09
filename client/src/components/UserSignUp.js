import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default ({context}) => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState(null);

    // Calling getValidation function from Context to update the validation errors if they are recieved from the API
    useEffect(() => {
        context.actions.getValidationErrors(errors);
    }, [errors])

    /** Handling form submission
     * sends post request with basic authentication to the Rest API to create a new user
     * navigates back to the home '/' route if the post request goes through
     * if the API sends validation errors the errors state is updated 
     * calls signIn() function from context if the post request goes through
     * @param {*} e 
     */
    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000/api/users`, {
                firstName: e.target[0].value,
                lastName: e.target[1].value,
                emailAddress: e.target[2].value,
                password: e.target[3].value,
            })
            .then(res => {
                if (res) {
                    context.actions.signIn(e.target[2].value, e.target[3].value);
                    navigate('/');
                }
            })
            .catch(function (error) {
                if (error.response) {
                  setErrors(error.response.data.errors);
                } 
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                {
                    context.validationErrors ? 
                        <div className="validation--errors">
                            <h3>Validation Errors</h3>
                            <ul>
                                {context.validationErrors.map(error => (
                                    <li key={error}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    : <></>
                }
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" defaultValue="" />
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" defaultValue="" />
                    <label htmlFor="emailAddress">Email Address</label>
                    <input
                    id="emailAddress"
                    name="emailAddress"
                    type="email"
                    defaultValue=""
                    />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" defaultValue="" />
                    <button className="button" type="submit">
                    Sign Up
                    </button>
                    <button
                    className="button button-secondary"
                    onClick={() => navigate('/')}
                    >
                    Cancel
                    </button>
                </form>
                <p>
                    Already have a user account? Click here to{" "}
                    <a href="signin">sign in</a>!
                </p>
            </div>
        </main> 
    )
}