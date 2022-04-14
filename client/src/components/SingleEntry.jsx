import React from "react"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api.js";

export function SingleEntry() {
    const params = useParams();
    const [entry, setEntry] = useState({});

    const entryID = params.id

    const getSingleEntry = async () => {
        console.log("single entry...");
        console.log(entryID);
        const res = await api.getEntry(entryID);
        // console.log(res);
        // console.log(res.data.entry);

        setEntry(res.data.entry);
    };

    useEffect(() => {
        // implement checking if user is logged in before doing ANYTHING
        getSingleEntry();
    }, []);

    const deleteSingleEntry = async () => {
        
    };

    const modifySingleEntry = async () => {

    };

    
    return (
        <div>
            <p>Title: {ele.title}</p>
            <p>Date: {ele.date}</p>
            <p>Description: {ele.description}</p>
            <button type="button">Delete</button>
            <button type="button">Modify</button>
        </div>
    );

}