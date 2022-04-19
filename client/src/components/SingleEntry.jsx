import React from "react"
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api.js";
import { NavBarLoggedIn } from './NavBarLoggedIn.jsx';

export function SingleEntry() {
    const navigate = useNavigate();

    const params = useParams();
    const entryID = params.id;

    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
 
    
    const getSingleEntry = async () => {
        console.log("single entry...");
        console.log(entryID);
        const res = await api.getEntry(entryID);
        // console.log(res);
        // console.log(res.data.entry);

        // setEntry(res.data.entry);
        setTitle(res.data.entry.title);
        setDate(res.data.entry.date);
        setDescription(res.data.entry.description);

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
        } else {
            console.log(res.data.success);
            navigate("/entries");
        }
    };

    const modifySingleEntry = async () => {
        // e.preventDefault();

        const res = await api.updateEntry({
            id: entryID,
            title,
            date,
            entry: description
        });

        if (Object.hasOwnProperty.call(res.data, "error")) {
            console.log("error! updating entry!");
            console.log(res.data.error);
        } else {
            // console.log(res.data.success);
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
        <div>
            <NavBarLoggedIn />
            <h1>Modify/Delete Your Entry</h1>
            <form>
                <section>
                    <label for="title">Title</label>
                    <input id="title" 
                        name="title" 
                        type="text" 
                        onChange={titleHandler}
                        value={title}
                        required />
                </section>
                <section>
                    <label for="date">Date</label>
                    <input id="date" 
                        name="date" 
                        type="date" 
                        onChange={dateHandler}
                        value={date}
                        required />
                </section>
                <section>
                    <label for="entry">Entry</label>
                    <textarea id="entry"
                        name="entry"
                        onChange={descriptionHandler}
                        rows="5"
                        value={description}
                        required/>
                </section>
                <button type="button" onClick={deleteSingleEntry}>Delete</button>
                <button type="button" onClick={modifySingleEntry}>Modify</button>
            </form>

            
        </div>
    );

}