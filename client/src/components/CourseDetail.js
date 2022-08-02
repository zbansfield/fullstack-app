import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default ({context}) => {
    const { id } = useParams();

    useEffect(() => {
        context.actions.fetchData()
    }, [])

    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    <a className="button" href="update-course.html">
                        Update Course
                    </a>
                    <a className="button" href="#">
                        Delete Course
                    </a>
                    <a className="button button-secondary" href="index.html">
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
                                        High-end furniture projects are great to dream about. But unless you
                                        have a well-equipped shop and some serious woodworking experience to
                                        draw on, it can be difficult to turn the dream into a reality.
                                    </p>
                                </div><div>
                                        <h3 className="course--detail--title">Estimated Time</h3>
                                        <p>14 hours</p>
                                        <h3 className="course--detail--title">Materials Needed</h3>
                                        <ul className="course--detail--list">
                                            <li>1/2 x 3/4 inch parting strip</li>
                                            <li>1 x 2 common pine</li>
                                        </ul>
                                    </div></>
                            : <h3>..Loading</h3> 
                        }
                    </div>
                </form>
            </div>
        </main>
    );
};