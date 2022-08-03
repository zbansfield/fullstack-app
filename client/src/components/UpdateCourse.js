import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default ({context}) => {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        context.actions.fetchData()
    }, [])

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [materialsNeeded, setMaterialsNeeded] = useState("");

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.put(`http://localhost:5000/api/courses/${id}`, {
                title: title,
                description: description,
                estimatedTime: estimatedTime,
                materialsNeeded: materialsNeeded
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

    return(
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        {
                            (context.courses[id - 1]) ? 
                            <><div>
                                    <label htmlFor="courseTitle">Course Title</label>
                                    <input
                                        id="courseTitle"
                                        name="courseTitle"
                                        type="text"
                                        defaultValue={context.courses[id - 1].title} 
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <p>{`By ${context.courses[id - 1].user.firstName} ${context.courses[id - 1].user.lastName}`}</p>
                                    <label htmlFor="courseDescription">Course Description</label>
                                    <textarea
                                        id="courseDescription"
                                        name="courseDescription"
                                        defaultValue={context.courses[id - 1].description} 
                                        onChange={(e) => setDescription(e.target.value)}
                                        />
                                </div>
                                <div>
                                    <label htmlFor="estimatedTime">Estimated Time</label>
                                    <input
                                        id="estimatedTime"
                                        name="estimatedTime"
                                        type="text"
                                        defaultValue={context.courses[id - 1].estimatedTime}
                                        onChange={(e) => setEstimatedTime(e.target.value)} 
                                        />
                                    <label htmlFor="materialsNeeded">Materials Needed</label>
                                    <textarea
                                        id="materialsNeeded"
                                        name="materialsNeeded"
                                        defaultValue={context.courses[id - 1].materialsNeeded}
                                        onChange={(e) => setMaterialsNeeded(e.target.value)}
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