import React from 'react';
import { useState, useEffect } from 'react';
import api from "../api.js";
import { NavBarLoggedIn } from './NavBarLoggedIn.jsx';

export function AllEntries() {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        getEntries();
    }, []);

    const getEntries = async () => {
        const res = await api.getEntries();
        console.log("entriesssss");
        console.log(res.data);
        setEntries(res.data.entries);
    };


    return (
        <div>
            <NavBarLoggedIn />
            <h1>See Entries</h1>
            {
                entries.map((ele) => {
                    return (
                        <div>
                            <p>Title: {ele.title}</p>
                            <p>Date: {ele.date}</p>
                            <p>Description: {ele.description}</p>
                            <hr />
                        </div>
                    );
                })
            }
        </div>
    );
}