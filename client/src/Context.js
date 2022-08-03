import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

export const Context = React.createContext()

export const Provider = (props) => {

    const [courses, setCourses] = useState([]);
    const cookie = Cookies.get('authenticatedUser')
    const [authenticatedUser, setAuthenticatedUser] = useState(cookie ? JSON.parse(cookie) : null);
    const data = new Data();

    const fetchData = () => {
        fetch("http://localhost:5000/api/courses")
        .then(res => res.json())
        .then((data) => {
                setCourses(data);
            })
    }

    const signIn = async (emailAddress, password) => {
        const user = await data.getUser(emailAddress, password);
        if (user !== null) {
            setAuthenticatedUser(user)
            const cookieOptions = {
                expires: 1 // 1 day
            };
            Cookies.set('authenticatedUser', JSON.stringify(user), cookieOptions);
        }
        return user;
    }

    const signOut = async () => {
        setAuthenticatedUser(null)
        Cookies.remove('authenticatedUser');
    }


    return (
        <Context.Provider value={{ 
        courses,
        authenticatedUser,
        actions: {
            fetchData: fetchData,
            signIn: signIn,
            signOut: signOut
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
  