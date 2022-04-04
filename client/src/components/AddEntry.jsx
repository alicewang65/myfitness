import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../api";

export function AddEntry() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [entry, setEntry] = useState("");

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

        if (Object.hasOwnProperty.call(res.data, "status")) {
            navigate("/entries");
        }
    };

    return (
        <div>
            <h1>Create a New Entry</h1>
            <form onSubmit={submit}>
                <section>
                    <label for="title">Title</label>
                    <input id="title" 
                        name="title" 
                        type="text" 
                        onChange={titleHandler}
                        required />
                </section>
                <section>
                    <label for="date">Date</label>
                    <input id="date" 
                        name="date" 
                        type="date" 
                        onChange={dateHandler}
                        required />
                </section>
                <section>
                    <label for="entry">Entry</label>
                    <textarea id="entry"
                        name="entry"
                        onChange={entryHandler}
                        rows="5"
                        placeholder="Enter your training entry here..."/>
                </section>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}