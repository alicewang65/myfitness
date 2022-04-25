import React from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../api.js";


export function NavBarLoggedIn() {
    const navigate = useNavigate();

    const logOut = async () => {
        const res = await api.logOutUser();
        if (Object.hasOwnProperty.call(res.data, "success")) {
            // navigate("/loggingout");
            navigate("/home");
        }
    };

    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to={"/home"}>MyFitness</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to={"/entries"}>All Entries</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/create"}>Add Entry</Link>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link no-button" onClick={logOut}>Log Out</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}