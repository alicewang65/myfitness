import React from "react";
import { useEffect, useState } from "react";
import api from "../api.js";
import { NavBar } from "./NavBar";
import { NavBarLoggedIn } from "./NavBarLoggedIn";

export function Home() {
    const [loggedIn, setLoggedIn] = useState(false);


    useEffect(() => {
        async function checkUser() {
            // check if user is logged in
            const res = await api.getUser();
            if (Object.hasOwnProperty.call(res.data, "success")) {
                setLoggedIn(true);
            }
        }
        checkUser();
    }, []);

    return(
        <div>
            {loggedIn ? <NavBarLoggedIn /> : <NavBar />}
            <h1>Home Page</h1>
        </div>
    );
}