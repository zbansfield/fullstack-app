import React from 'react';
import { Navigate } from 'react-router-dom';
import { Consumer } from './Context';

// Private route higher order component which checks if the user is authenticated
// If user is not authenticated then it will redirect to the sign in page
export default ({ children }) => {
  return (
    <Consumer>
      {context => (
        context.authenticatedUser ? children : ( <Navigate to='/signin' /> )
      )
    }
    </Consumer> 
  );
};