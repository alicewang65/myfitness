import React from "react";
import { NavBar } from "./NavBar";
import { Link } from "react-router-dom";

export function NotFound() {
    return(
        <div className="m-4">
            <NavBar />
            <div className="pic-container my-3 d-flex flex-column justify-content-center align-items-center">
                <h1 className="fst-italic">
                    UH OH
                </h1>
                <p className="w-50 mx-auto text-center">
                    You've stumbled on a page that doesn't exist. Click "MyFitness" in the
                    upper left hand corner to return home, or click <Link to={"/home"}>here</Link>.
                </p>
            </div>
        </div>
    );
}