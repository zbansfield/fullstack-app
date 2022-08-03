import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

export default ({context}) => {
    const { id } = useParams();
    // const [status, setStatus] = useState(false)
    let status = false;

    useEffect(() => {
        context.actions.fetchData()
    }, [])

    // Function for sending a delete request
    const deletePostHandler = () => {
        axios.delete('http://localhost:5000/api/courses/' + id)
            .then(response => {
                console.log(response);
            });
    }

    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    <a className="button" href={`/courses/${id}/update`}>
                        Update Course
                    </a>
                    <a className="button" href="/" onClick={deletePostHandler}>
                        Delete Course
                    </a>
                    <a className="button button-secondary" href="/">
                        Return to List
                    </a>
                </div>
            </div>
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        {
                            (context.courses[id - 1]) ? 
                                <><div>
                                    <h3 className="course--detail--title">Course</h3>
                                    <h4 className="course--name">{context.courses[id - 1].title}</h4>
                                    <p>{`By ${context.courses[id - 1].user.firstName} ${context.courses[id - 1].user.lastName}`}</p>
                                    <p>
                                        {context.courses[id - 1].description}
                                    </p>
                                </div>
                                <div>
                                    {
                                        context.courses[id - 1].estimatedTime ?
                                        <><h3 className="course--detail--title">Estimated Time</h3>
                                        <p>{context.courses[id - 1].estimatedTime}</p></>
                                        : <></>
                                    }
                                    {
                                        context.courses[id - 1].materialsNeeded ?
                                        <><h3 className="course--detail--title">Materials Needed</h3>
                                        <ul className="course--detail--list">
                                            {
                                                context.courses[id - 1].materialsNeeded.split("*").map(material => (
                                                    material.length !== 0 ?
                                                    <li key={material} >{material}</li> 
                                                    : material
                                                ))
                                            }
                                        </ul></>
                                        : <></>
                                    }    
                                </div></>
                            : <h3>..Loading</h3> 
                        }
                    </div>
                </form>
            </div>
        </main>
    );
};