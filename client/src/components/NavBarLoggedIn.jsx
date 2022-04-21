import React from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../api.js";


export function NavBarLoggedIn() {
    const navigate = useNavigate();

    const logOut = async () => {
        const res = await api.logOutUser();
        if (Object.hasOwnProperty.call(res.data, "success")) {
            navigate("/home", {state: "loggedout"});
        }
    };

    return (
        <nav class="navbar navbar-expand-sm navbar-light bg-light">
            <div class="container-fluid">
                <Link class="navbar-brand" to={"/home"}>MyFitness</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link class="nav-link" to={"/entries"}>All Entries</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to={"/create"}>Add Entry</Link>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link no-button" onClick={logOut}>Log Out</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}