import React, { useState } from 'react';

export const Context = React.createContext()
let id = 0;

export const Provider = (props) => {
  const [courses, setCourses] = useState([]);

  const someFunction = () => {
    // some function
  };


  return (
    <Context.Provider value={{ 
      courses,
      actions: {
        
      }
    }}>
      { props.children }
    </Context.Provider>
  );
};

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

 export default function withContext(Component) {
    return function ContextComponent(props) {
      return (
        <Context.Consumer>
          {context => <Component {...props} context={context} />}
        </Context.Consumer>
      );
    }
  }
  