import React from "react";

export default ({context}) => {

    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                <form>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" defaultValue="" />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" defaultValue="" />
                    <button className="button" type="submit">
                        Sign In
                    </button>
                    <button
                        className="button button-secondary"
                        onclick=""
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