import React from "react";

export default () => (
    <header>
        <div className="wrap header--flex">
            <h1 className="header--logo"><a href="/courses">Courses</a></h1>
            <nav>
                <ul className="header--signedout">
                    <li><a href="/sign-up">Sign Up</a></li>
                    <li><a href="/sign-in">Sign In</a></li>
                </ul>
            </nav>
        </div>
    </header> 
)