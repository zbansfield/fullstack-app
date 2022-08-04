import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Buffer } from "buffer";

export default ({context}) => {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        context.actions.fetchData();
    }, [])

    let handleSubmit = async (e) => {
        e.preventDefault();
        const encodedCredentials = Buffer.from(`${context.authenticatedUser.emailAddress}:${context.authenticatedUser.password}`).toString("base64");
        try {
            let res = await axios.put(`http://localhost:5000/api/courses/${id}`, {
                title: e.target[0].value,
                description: e.target[1].value,
                estimatedTime: e.target[2].value,
                materialsNeeded: e.target[3].value,
                userId: context.authenticatedUser.id,
            }, {
                headers: {
                    'Authorization': `Basic ${encodedCredentials}`
                }
            });
            if (res.status === 200) {
                console.log('Updated successfully')
            } 
        } catch (err) {
            console.log(err);
        }
        navigate(`/courses/${id}`);
    };

    return(
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        {
                            (context.courses.find((course) => course.id == id)) ? 
                            <><div>
                                    <label htmlFor="courseTitle">Course Title</label>
                                    <input
                                        id="courseTitle"
                                        name="courseTitle"
                                        type="text"
                                        defaultValue={context.courses.find((course) => course.id == id).title} 
                                    />
                                    <p>{`By ${context.courses.find((course) => course.id == id).user.firstName} ${context.courses.find((course) => course.id == id).user.lastName}`}</p>
                                    <label htmlFor="courseDescription">Course Description</label>
                                    <textarea
                                        id="courseDescription"
                                        name="courseDescription"
                                        defaultValue={context.courses.find((course) => course.id == id).description} 
                                        />
                                </div>
                                <div>
                                    <label htmlFor="estimatedTime">Estimated Time</label>
                                    <input
                                        id="estimatedTime"
                                        name="estimatedTime"
                                        type="text"
                                        defaultValue={context.courses.find((course) => course.id == id).estimatedTime}
                                        />
                                    <label htmlFor="materialsNeeded">Materials Needed</label>
                                    <textarea
                                        id="materialsNeeded"
                                        name="materialsNeeded"
                                        defaultValue={context.courses.find((course) => course.id == id).materialsNeeded}
                                        />
                                </div></>
                                : <></>
                        }
                        
                    </div>
                    <button className="button" type="submit">
                        Update Course
                    </button>
                    <button
                        className="button button-secondary"
                        onClick={() => navigate(`/courses/${id}`)}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </main>
    )
}