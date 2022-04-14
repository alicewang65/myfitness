import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from "../api.js";
import { NavBarLoggedIn } from './NavBarLoggedIn.jsx';

export function AllEntries() {
    const params = useParams();
    const [entries, setEntries] = useState([]);
    const [grid, setGrid] = useState(true);

    useEffect(() => {
        // implement checking if user is logged in before doing ANYTHING

        getEntries();
    }, []);

    const getEntries = async () => {
        const res = await api.getEntries();
        // console.log("entriesssss");
        // console.log(res.data);

        const gridRow = [];
        const temp = res.data.entries;

        // split elements into groups of 3
        for (let ii = 0; ii < temp.length; ii += 3) {
            if (ii + 3 > temp.length) {
                gridRow.push(temp.slice(ii, temp.length));
            } else {
                gridRow.push(temp.slice(ii, ii + 3));
            }
        }

        console.log(gridRow);

        console.log(gridRow[0][0]["_id"]);

        setEntries(gridRow);
    };

    const getGrid = () => {
        return (
            entries.map((row) => {
                // ele is an array of 3
                return (
                    <div className="row">
                        {
                            row.map((ele) => {
                                return (
                                    <div className="col">
                                        <p><Link to={"/entry/" + params.username + "/" + ele["_id"]}>Title: {ele.title}</Link></p>
                                        <p>Date: {ele.date}</p>
                                        <p>Description: {(ele.description).substring(0, 50) + ((ele.description.length > 50) ? "..." : "")}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                );
            })
        );
    };

    const getList = () => {
        return (
            entries.map(row => {
                return (
                    row.map(ele => {
                        return (
                            <div>
                                <p><Link to={"/entry/" + params.username + "/" + ele["_id"]}>Title: {ele.title}</Link></p>
                                <p>Date: {ele.date}</p>
                                <p>Description: {ele.description}</p>
                                <hr/>
                            </div>
                        )
                    })
                )
            })
        )
    };

    const changeToGrid = () => {
        setGrid(true);
    };

    const changeToList = () => {
        setGrid(false);
    };

    return (
        <div>
            <NavBarLoggedIn />
            <h1>See Entries</h1>
            <button id="grid" type="button" onClick={changeToGrid}>Grid</button>
            <button id="list" type="butotn" onClick={changeToList}>List</button>

            {
                grid ? getGrid() : getList()
            }
        </div>
    );
}