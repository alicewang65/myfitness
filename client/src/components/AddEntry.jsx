import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../api.js";
import { NavBarLoggedIn } from './NavBarLoggedIn.jsx';

export function AddEntry() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [entry, setEntry] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        async function checkUser() {
            // check if user is logged in
            const res = await api.getUser();
            if (Object.hasOwnProperty.call(res.data, "error")) {
                navigate("/home");
            }
        }
        checkUser();
    }, []);

    const titleHandler = (e) => {
        setTitle(e.target.value);
    };

    const dateHandler = (e) => {
        setDate(e.target.value);
    };

    const entryHandler = (e) => {
        setEntry(e.target.value);
    };

    const submit = async (e) => {
        e.preventDefault();

        const res = await api.addEntry({
            title,
            date,
            entry
        });

        if (Object.hasOwnProperty.call(res.data, "success")) {
            navigate("/entries");
        } else {
            setError(res.data.error);
        }
    };

    return (
        <div className="m-4">
            <NavBarLoggedIn />
            <h1 className="my-3 text-center">Create a New Entry</h1>

            <div className="w-75 mx-auto">
                <form onSubmit={submit}>
                    <div className="form-group mt-3">
                        <label htmlFor="title">Title</label>
                        <input className="form-control"
                            id="title" 
                            name="title" 
                            type="text" 
                            onChange={titleHandler}
                            required />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="date">Date</label>
                        <input className="form-control"
                            id="date" 
                            name="date" 
                            type="date" 
                            onChange={dateHandler}
                            required />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="entry">Entry</label>
                        <textarea className="form-control"
                            id="entry"
                            name="entry"
                            onChange={entryHandler}
                            rows="5"
                            placeholder="Enter your training entry here..."
                            required/>
                    </div>

                    <div className="mt-3">
                        {error !== "" ? <p className="text-danger">{error}</p> : <p></p>}
                    </div>

                    <div className="text-center mt-3">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}