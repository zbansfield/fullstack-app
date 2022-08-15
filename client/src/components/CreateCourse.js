import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Buffer } from "buffer";

export default ({context}) => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState(null);

    // Calling getValidation function from Context to update the validation errors if they are recieved from the API
    useEffect(()=>{
        context.actions.getValidationErrors(errors);
    }, [errors])

    /** Handling form submission
     * sends post request with basic authentication to the Rest API to create a new course
     * navigates back to the home '/' route if the post request goes through
     * if the API sends validation errors the errors state is updated 
     * @param {*} e 
     */
    let handleSubmit = async (e) => {
        e.preventDefault();
        const encodedCredentials = Buffer.from(`${context.authenticatedUser.emailAddress}:${context.authenticatedUser.password}`).toString("base64");
        try {
            await axios.post(`http://localhost:5000/api/courses/`, {
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
                  setErrors(error.response.data.errors);
                  if (error.response.status === 500) {
                    navigate('/error')
                  }
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