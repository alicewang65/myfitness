import React from "react";
import { NavBar } from "./NavBar";
import { Link } from "react-router-dom";

export function NotFound() {
    return(
        <div>
            <NavBar />
            <h1>PAGE NOT FOUND...RETURN  <Link to={"/home"}>HOME</Link></h1>
        </div>
    );
}