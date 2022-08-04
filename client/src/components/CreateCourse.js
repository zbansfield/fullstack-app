import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Buffer } from "buffer";

export default ({context}) => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState(null);

    useEffect(()=>{
        context.actions.getValidationErrors(errors);
    }, [errors])

    let handleSubmit = async (e) => {
        e.preventDefault();
        const encodedCredentials = Buffer.from(`${context.authenticatedUser.emailAddress}:${context.authenticatedUser.password}`).toString("base64");
        try {
            let res = await axios.post(`http://localhost:5000/api/courses/`, {
                title: e.target[0].value,
                description: e.target[1].value,
                estimatedTime: e.target[2].value,
                materialsNeeded: e.target[3].value,
                userId: context.authenticatedUser.id,
            }, {
                headers: {
                    'Authorization': `Basic ${encodedCredentials}`
                }
            })
            .then(res => {
                if (res) {
                    navigate('/');
                }
            })
            .catch(function (error) {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  console.log(error.response.data.errors);
                  setErrors(error.response.data.errors);
                } 
            });
        } catch (err) {
            console.log(err);
        }
        
    };

    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                {
                    context.validationErrors ? 
                        <div className="validation--errors">
                            <h3>Validation Errors</h3>
                            <ul>
                                {context.validationErrors.map(error => (
                                    <li key={error}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    : <></>
                }
                
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input
                                id="courseTitle"
                                name="courseTitle"
                                type="text"
                                defaultValue=""
                            />
                            <p>{`By ${context.authenticatedUser.firstName} ${context.authenticatedUser.lastName}`}</p>
                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea
                                id="courseDescription"
                                name="courseDescription"
                                defaultValue={""}
                            />
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input
                                id="estimatedTime"
                                name="estimatedTime"
                                type="text"
                                defaultValue=""
                            />
                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea
                                id="materialsNeeded"
                                name="materialsNeeded"
                                defaultValue={""}
                            />
                        </div>
                    </div>
                    <button className="button" type="submit">
                        Create Course
                    </button>
                    <button
                        className="button button-secondary"
                        onClick={() => navigate('/')}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </main>
    )
}