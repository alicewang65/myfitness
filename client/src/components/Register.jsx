import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../api.js";
import { NavBar } from './NavBar.jsx';

export function Register(props) {
    const navigate = useNavigate();

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");

    const userHandler = (e) => {
        setUser(e.target.value);
    };

    const passHandler = (e) => {
        setPass(e.target.value);
    }

    const submit = async (e) => {
        e.preventDefault();
        const res = await api.registerUser({username: user, password: pass});
        // console.log(res.data);

        if (Object.hasOwnProperty.call(res.data, "error")) {
            setError(res.data.error);
        } else {
            navigate("/home");
        }
    };

    return (
        <div>
            <NavBar />
            <h1>Register</h1>
            {error === "" ? <p>{error}</p> : <p></p>}
            <form onSubmit={submit}>
                <section>
                    <label for="username">Username</label>
                    <input id="username" 
                        name="username" 
                        type="text" 
                        onChange={userHandler}
                        required autofocus />
                </section>
                <section>
                    <label for="current-password">Password</label>
                    <input id="current-password" 
                        name="password" 
                        type="password" 
                        onChange={passHandler}
                        required />
                </section>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}