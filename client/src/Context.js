import React, { useEffect, useState } from 'react';

export const Context = React.createContext()

export const Provider = (props) => {

    const [courses, setCourses] = useState([]);
    // variable to keep track of when the courses needs to be updated (ie data needs to be fetched again)
    const [courseChange, setCourseChange] = useState(0);

    const updateCourses = () => {
        
    };

    const fetchData = () => {
        fetch("http://localhost:5000/api/courses")
        .then(res => res.json())
        .then((data) => {
                setCourses(data);
            })
    }

    // useEffect(() => {
    //     fetch("http://localhost:5000/api/courses")
    //         .then(res => res.json())
    //         .then((data) => {
    //                 setCourses(data);
    //             })
    // }, [courseChange])


    return (
        <Context.Provider value={{ 
        courses,
        actions: {
            fetchData: fetchData
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
  