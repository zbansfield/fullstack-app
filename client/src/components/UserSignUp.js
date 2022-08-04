import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default ({context}) => {

    const navigate = useNavigate();

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.post(`http://localhost:5000/api/users`, {
                firstName: e.target[0].value,
                lastName: e.target[1].value,
                emailAddress: e.target[2].value,
                password: e.target[3].value,
            });
            if (res.status === 200) {
                console.log('Account created successfully')
            } 
        } catch (err) {
            console.log(err);
        }
        context.actions.signIn(e.target[2].value, e.target[3].value);
        navigate('/');
    };

    return (
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
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