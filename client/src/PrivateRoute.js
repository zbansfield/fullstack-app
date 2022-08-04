import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { Consumer } from './Context';

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