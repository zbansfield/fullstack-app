import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default ({context}) => {
    const navigate = useNavigate();

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    /** Handles form submission 
     * calls signIn() function from Context
     * navigates back to the home '/' route
    */
    const handleSubmit = (e) => {
        e.preventDefault();  
        context.actions.signIn(emailAddress, password);
        navigate('/');
    }

    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input 
                        id="emailAddress" 
                        name="emailAddress" 
                        type="email" 
                        defaultValue="" 
                        onChange={(e) => setEmailAddress(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                    <input 
                        id="password" 
                        name="password" 
                        type="password" 
                        defaultValue="" 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button className="button" type="submit">
                        Sign In
                    </button>
                    <button
                        type="button"
                        className="button button-secondary"
                        onClick={() => navigate('/')}
                    >
                        Cancel
                    </button>
                </form>
                <p>
                Don't have a user account? Click here to{" "}
                <a href="signup">sign up</a>!
                </p>
            </div>
        </main>
    )

}