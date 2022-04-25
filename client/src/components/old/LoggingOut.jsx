import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../NavBar";

export function LoggingOut() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/home");
        console.log(".....");
    });

    return(
        <div className="m-4">
            <NavBar />
            <div className="pic-container my-3 d-flex flex-column justify-content-center align-items-center">
                <h1 className="fst-italic">
                    LOGGING OUT...
                </h1>
            </div>
        </div>
    );
}