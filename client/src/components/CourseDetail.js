import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Buffer } from "buffer";
import ReactMarkdown from 'react-markdown';

export default ({context}) => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Calling fetchData function from Context to fetch courses
    useEffect(() => {
        context.actions.fetchData();
    }, [])

    // Handling sending a delete request to the Rest API
    // Using basic authentication to authenticate user for delete reqeust
    const deleteCourseHandler = () => {
        const encodedCredentials = Buffer.from(`${context.authenticatedUser.emailAddress}:${context.authenticatedUser.password}`).toString("base64");
        
        axios.delete('http://localhost:5000/api/courses/' + id, {
            headers: {
                'Authorization': `Basic ${encodedCredentials}`
            }
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status === 500) {
                        navigate('/error')
                      }
                }
            });
    }

    return (
        <main>
            <div className="actions--bar">
                {
                    (context.courses.find((course) => course.id == id)) ?
                    <>
                    <div className="wrap">
                        {
                            context.authenticatedUser ?
                                context.authenticatedUser.emailAddress === context.courses.find((course) => course.id == id).user.emailAddress ? 
                                <><a className="button" href={`/courses/${id}/update`}>
                                    Update Course
                                </a>
                                <a className="button" href="/" onClick={deleteCourseHandler}>
                                    Delete Course
                                </a></>
                                :
                                <></>
                        : <></>
                        }
                        
                        
                        <a className="button button-secondary" href="/">
                            Return to List
                        </a>
                    </div>
                    </>
                    :
                    <></>
                }
                
            </div>
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        {
                            (context.courses.find((course) => course.id == id)) ? 
                                <><div>
                                    <h3 className="course--detail--title">Course</h3>
                                    <h4 className="course--name">{context.courses.find((course) => course.id == id).title}</h4>
                                    <p>{`By ${context.courses.find((course) => course.id == id).user.firstName} ${context.courses.find((course) => course.id == id).user.lastName}`}</p>
                                    <ReactMarkdown>
                                        {context.courses.find((course) => course.id == id).description}
                                    </ReactMarkdown>
                                </div>
                                <div>
                                    {
                                        context.courses.find((course) => course.id == id).estimatedTime ?
                                        <><h3 className="course--detail--title">Estimated Time</h3>
                                        <p>{context.courses.find((course) => course.id == id).estimatedTime}</p></>
                                        : <></>
                                    }
                                    {
                                        context.courses.find((course) => course.id == id).materialsNeeded ?
                                        <><h3 className="course--detail--title">Materials Needed</h3>
                                        <ul className="course--detail--list">
                                            <ReactMarkdown>
                                                {context.courses.find((course) => course.id == id).materialsNeeded}
                                            </ReactMarkdown>
                                        </ul></>
                                        : <></>
                                    }    
                                </div></>
                            : navigate('/notfound') 
                        }
                    </div>
                </form>
            </div>
        </main>
    );
};