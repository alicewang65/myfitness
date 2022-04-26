import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../api.js";
import { NavBar } from './NavBar.jsx';

export function Login() {
    const navigate = useNavigate();

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        async function checkUser() {
            // check if user is logged in
            const res = await api.getUser();
            if (Object.hasOwnProperty.call(res.data, "success")) {
                navigate("/entries");
            }
        }
        checkUser();        
    }, []);

    const userHandler = (e) => {
        setUser(e.target.value);
    };

    const passHandler = (e) => {
        setPass(e.target.value);
    }

    const submit = async (e) => {
        e.preventDefault();
        // want username to be case insensitive
        const res = await api.loginUser({username: user.toLowerCase(), password: pass});
        // console.log(res);
        // console.log(res.data);

        if (Object.hasOwnProperty.call(res.data, "error")) {
            // console.log("setting error");
            setError(res.data.error);
        } else {
            // console.log(res.data);
            navigate("/entries");
        }
    };

    return (
        <div className="m-4">
            <NavBar />
            <h1 className="my-3 text-center">Login</h1>
            <div className="w-50 mx-auto">
                <form onSubmit={submit}>
                    <div className="form-group mt-3">
                        <label htmlFor="username">Username</label>
                        <input className="form-control"
                            id="username" 
                            name="username" 
                            type="text" 
                            onChange={userHandler}
                            required/>
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="current-password">Password</label>
                        <input className="form-control"
                            id="current-password" 
                            name="password" 
                            type="password" 
                            onChange={passHandler}
                            required />
                    </div>
                    <div className="mt-3">
                        {error !== "" ? <p className="text-danger">{error}</p> : <p></p>}
                    </div>
                    <div className="text-center mt-3">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>   
            </div>
        </div>
    );
}