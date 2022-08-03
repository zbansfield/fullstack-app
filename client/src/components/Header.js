import React from "react";

export default ({context}) => {
    
    return (
        <>
        {
            (context.authenticatedUser) ?
            <header>
                <div className="wrap header--flex">
                    <h1 className="header--logo"><a href="/">Courses</a></h1>
                    <nav>
                        <ul className="header--signedin">
                            <li>{`Welcome, ${context.authenticatedUser.firstName} ${context.authenticatedUser.lastName}!`}</li>
                            <li><a href="/signout">Sign Out</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
            : 
            <header>
                <div className="wrap header--flex">
                    <h1 className="header--logo"><a href="/">Courses</a></h1>
                    <nav>
                        <ul className="header--signedout">
                            <li><a href="/signup">Sign Up</a></li>
                            <li><a href="/signin">Sign In</a></li>
                        </ul>
                    </nav>
                </div>
            </header> 

        }
        </> 
    )
}
