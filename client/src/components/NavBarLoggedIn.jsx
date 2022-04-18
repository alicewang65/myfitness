import React from "react"
import {Link, useParams} from "react-router-dom"


export function NavBarLoggedIn() {
    // need to get ID of user once logged in
    const params = useParams();

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <Link class="navbar-brand" to={"/home/" + params.username}>MyFitness</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link class="nav-link" to={"/entries/" + params.username}>Entries</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to={"/create/" + params.username}>Add Entry</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}