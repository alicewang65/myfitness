import React from "react"
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api.js";
import { NavBarLoggedIn } from './NavBarLoggedIn.jsx';

export function SingleEntry() {
    const navigate = useNavigate();

    const params = useParams();
    const entryID = params.id;

    const [original, setOriginal] = useState({});
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
 
    
    const getSingleEntry = async () => {
        console.log("single entry...");
        console.log(entryID);
        const res = await api.getEntry(entryID);

        if (Object.hasOwnProperty.call(res.data, "error")) {
            setError(res.data.error);
        } else {
            // console.log(res);
            // console.log(res.data.entry);

            // setEntry(res.data.entry);
            setTitle(res.data.entry.title);
            setDate(res.data.entry.date);
            setDescription(res.data.entry.description);

            const temp = {
                title: res.data.entry.title,
                date: res.data.entry.date,
                description: res.data.entry.description
            };

            setOriginal(temp);
        }
    };

    useEffect(() => {
        async function checkUser() {
            // check if user is logged in
            const res = await api.getUser();
            if (Object.hasOwnProperty.call(res.data, "error")) {
                navigate("/home");
            }
        }
        checkUser();
        getSingleEntry();
    }, []);

    const deleteSingleEntry = async () => {
        console.log(entryID);

        const res = await api.deleteEntry(entryID);
        
        if (Object.hasOwnProperty.call(res.data, "error")) {
            console.log("error!");
            setError(res.data.error);
        } else {
            console.log(res.data.success);
            navigate("/entries");
        }
    };

    const modifySingleEntry = async () => {
        // e.preventDefault();
        // check to see if values have changed, otherwise don't
        // make a background request
        if (original.title !== title || original.date !== date || original.description !== description) {
            console.log("fetching...");
            const res = await api.updateEntry({
                id: entryID,
                title,
                date,
                entry: description
            });

            if (Object.hasOwnProperty.call(res.data, "error")) {
                console.log("error! updating entry!");
                console.log(res.data.error);
                setError(res.data.error);
            } else {
                // console.log(res.data.success);
                navigate("/entries");
            }
        } else {
            navigate("/entries");
        }
    };

    const titleHandler = (e) => {
        setTitle(e.target.value);
    };

    const dateHandler = (e) => {
        setDate(e.target.value);
    };

    const descriptionHandler = (e) => {
        setDescription(e.target.value);
    };

    
    return (
        <div className="m-4">
            <NavBarLoggedIn />
            <h1 className="my-3 text-center">Modify/Delete Your Entry</h1>

            <div className="w-75 mx-auto">
                <form>
                    <div className="form-group mt-3">
                        <label htmlFor="title">Title</label>
                        <input className="form-control"
                            id="title" 
                            name="title" 
                            type="text" 
                            onChange={titleHandler}
                            value={title}
                            required />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="date">Date</label>
                        <input className="form-control"
                            id="date" 
                            name="date" 
                            type="date" 
                            onChange={dateHandler}
                            value={date}
                            required />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="entry">Entry</label>
                        <textarea className="form-control"
                            id="entry"
                            name="entry"
                            onChange={descriptionHandler}
                            rows="5"
                            value={description}
                            required/>
                    </div>

                    <div className="mt-3">
                        {error !== "" ? <p className="text-danger">{error}</p> : <p></p>}
                    </div>

                    <div className="mt-3 text-center">
                        <button type="button" className="btn btn-primary me-3" onClick={deleteSingleEntry}>Delete</button>
                        <button type="button" className="btn btn-primary" onClick={modifySingleEntry}>Save</button>
                    </div>
                    
                </form>
            </div>
        </div>
    );

}