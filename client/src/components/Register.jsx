import React from 'react';
import { useState } from 'react';
import api from "../api";

export function Register(props) {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");

    const userHandler = (e) => {
        setUser(e.target.value);
    };

    const passHandler = (e) => {
        setPass(e.target.value);
    }

    const submit = async (e) => {
        e.preventDefault();
        await api.registerUser({username: user, password: pass});
    };

    return (
        <div>
            <h1>Register</h1>
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