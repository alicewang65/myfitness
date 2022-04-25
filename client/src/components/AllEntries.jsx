import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from "../api.js";
import { NavBarLoggedIn } from './NavBarLoggedIn.jsx';

export function AllEntries() {
    const navigate = useNavigate();

    const [entries, setEntries] = useState([]);
    const [grid, setGrid] = useState(true);
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
        getEntries();
    }, []);

    const getEntries = async () => {
        const res = await api.getEntries();
        // console.log("entriesssss");
        // console.log(res.data);

        if (Object.hasOwnProperty.call(res.data, "error")) {
            setError(res.data.error);
        } else {
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
        }
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
                                    <div className="col-md-4 my-2">
                                        <div className="card border-primary personal-card">
                                            <Link to={"/entry/" + ele["_id"]} className="text-decoration-none text-reset">
                                                <div className="card-body">
                                                    <h5 className="card-title">
                                                        {ele.title}
                                                    </h5>
                                                    <h6 className="card-subtitle mb-2 text-muted">{ele.date}</h6>
                                                    <p className="card-text">
                                                        {(ele.description).substring(0, 50) + ((ele.description.length > 50) ? "..." : "")}
                                                    </p>
                                                </div>
                                            </Link>
                                        </div>
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
                            <div className="my-2">
                                <div className="card border-primary personal-card">
                                    <Link to={"/entry/" + ele["_id"]} className="text-decoration-none text-reset">
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                {ele.title}
                                            </h5>
                                            <h6 className="card-subtitle mb-2 text-muted">{ele.date}</h6>
                                            <p className="card-text">
                                                {ele.description}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
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
        <div className="m-4">
            <NavBarLoggedIn />
            <h1 className="my-3 text-center">All Entries</h1>
            <div className="d-flex flex-row-reverse mb-2 mt-2">
                <button className="btn btn-primary" id="grid" type="button" onClick={changeToGrid}>Grid</button>
                <button className="btn btn-primary me-2" id="list" type="button" onClick={changeToList}>List</button>
            </div>
            
            <div className="mt-3">
                {error !== "" ? <p className="text-danger">{error}</p> : <p></p>}
            </div>

            { grid ? getGrid() : getList() }
        </div>
    );
}