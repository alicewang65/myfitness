import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../api.js";
import { NavBar } from './NavBar.jsx';

export function Login(props) {
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
        const res = await api.loginUser({username: user, password: pass});
        console.log(res);
        console.log(res.data);

        if (Object.hasOwnProperty.call(res.data, "error")) {
            console.log("setting error");
            setError(res.data.error);
        } else {
            console.log(res.data);
            navigate("/entries/" + res.data.username);
        }
    };

    return (
        <div>
            <NavBar />
            <h1>Login</h1>
            {error === "" ? <p></p> : <p>{error}</p>}
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
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}