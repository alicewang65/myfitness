import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api.js";
import { NavBar } from "./NavBar";
import { NavBarLoggedIn } from "./NavBarLoggedIn";

export function Home() {
    const [loggedIn, setLoggedIn] = useState(false);
    const location = useLocation();
    // console.log("location", location.state);

    useEffect(() => {
        // console.log("useEffect...");
        async function checkUser() {
            // check if user is logged in
            const res = await api.getUser();
            // console.log(res.data);
            if (Object.hasOwnProperty.call(res.data, "success")) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        }
        checkUser();
    });

    return(
        <div className="m-4">
            {loggedIn ? <NavBarLoggedIn /> : <NavBar />}
            <div className="pic-container my-3 d-flex justify-content-center align-items-center">
                {/* <img className="" src={homepic} alt="Watercolor background"/>   */}
                <h1 className="fst-italic">Welcome to MyFitness</h1>
            </div>
            <div>
                <h2>What is MyFitness?</h2>
                <p>
                    Whether you're a professional athlete or just starting your fitness journey, 
                    you're bound to hear about the advantages of keeping a training log. Training 
                    logs help you keep track of your progress and allow for self reflection in the future.
                </p>
                <p>
                    However, it's not easy to keep track of all that information! MyFitness is a 
                    web app that will allow users to keep track of their workouts. Once registered 
                    and logged in, users can add, remove and update their workouts. They're also 
                    able to see all of their past workouts.
                </p>
            </div>
            <h2>Getting Started</h2>
            <div className="container mt-3 mx-auto">
                <div className="row">
                    <div className="col-md border p-3 m-2 bg-light">
                        <h3>Registering</h3>
                        <p>
                            Getting started only requires creating an account! Simply click on the
                            "Register" tab in the top right hand corner of the page. Enter your
                            username and password. Then, simply log-in with your credentials.
                        </p>
                    </div>
                    <div className="col-md border p-3 m-2 bg-light">
                        <h3>Creating an Entry</h3>
                        <p>
                            After logging in, you'll see your list of all training entries. To create
                            a new one, simply click the "Add Entry" tab in the upper right hand corner.
                            Fill out the title, date and contents of your entry and hit submit. You
                            should see your newly created entry in your list of entries.
                        </p>
                    </div>
                    <div className="col-md border p-3 m-2 bg-light">
                        <h3>Modifying an Entry</h3>
                        <p>
                            If you ever need to modify or delete an entry, simply click the entry to
                            view the detailed information about your entry. There, you will be able to
                            modify or delete your entry. After making your changes, you should be able
                            to see the results immediately.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}