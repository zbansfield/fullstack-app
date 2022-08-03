import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default ({context}) => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [materialsNeeded, setMaterialsNeeded] = useState("");

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.post(`http://localhost:5000/api/courses/`, {
                title: title,
                description: description,
                estimatedTime: estimatedTime,
                materialsNeeded: materialsNeeded,
                userId: context.user.id
            });
            let resJson = await res.json();
            if (res.status === 200) {
                setTitle("");
                setDescription("");
                setEstimatedTime("");
                setMaterialsNeeded("");
            } 
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input
                                id="courseTitle"
                                name="courseTitle"
                                type="text"
                                defaultValue=""
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <p>{`By ${context.authenticatedUser.firstName} ${context.authenticatedUser.lastName}`}</p>
                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea
                                id="courseDescription"
                                name="courseDescription"
                                defaultValue={""}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input
                                id="estimatedTime"
                                name="estimatedTime"
                                type="text"
                                defaultValue=""
                                onChange={(e) => setEstimatedTime(e.target.value)}
                            />
                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea
                                id="materialsNeeded"
                                name="materialsNeeded"
                                defaultValue={""}
                                onChange={(e) => setMaterialsNeeded(e.target.value)}
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