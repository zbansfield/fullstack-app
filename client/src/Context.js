import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

export const Context = React.createContext()

export const Provider = (props) => {
    const data = new Data();
    const cookie = Cookies.get('authenticatedUser');

    const [courses, setCourses] = useState([]);
    const [authenticatedUser, setAuthenticatedUser] = useState(cookie ? JSON.parse(cookie) : null);
    const [validationErrors, setValidationErrors] = useState(null);


    // ----------------------------------------
    //         Helper Functions
    // ----------------------------------------

    // Fetching the course data and updating the courses state
    const fetchData = () => {
        fetch("http://localhost:5000/api/courses")
        .then(res => res.json())
        .then((data) => {
                setCourses(data);
            })
    }

    /** Handling user sign in authentication
     * calls getUser() from Data.js to get the user's data 
     * updates the cookies so the user stays signed in with page refreshes 
    */ 
    const signIn = async (emailAddress, password) => {
        const user = await data.getUser(emailAddress, password);
        user.password = password;
        if (user !== null) {
            setAuthenticatedUser(user)
            const cookieOptions = {
                expires: 1 // 1 day
            };
            Cookies.set('authenticatedUser', JSON.stringify(user), cookieOptions);
        }
        return user;
    }

    /** Handling user sign out
     * resets authenticated user to null 
     * removes the cookies 
    */ 
    const signOut = async () => {
        setAuthenticatedUser(null)
        Cookies.remove('authenticatedUser');
    }

    /** Handling validation errors 
     * updates validationErrors state with the errors sent from the API
    */ 
    const getValidationErrors = (errors) => {
        setValidationErrors(errors);
    }

    return (
        <Context.Provider value={{ 
        courses,
        authenticatedUser,
        validationErrors,
        actions: {
            fetchData: fetchData,
            signIn: signIn,
            signOut: signOut,
            getValidationErrors: getValidationErrors
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
  