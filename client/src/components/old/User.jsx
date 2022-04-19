import React from 'react';
import { useState } from 'react';
import api from "../../api.js";

export function User() {
    const [userData, setUserData] = useState({});

    const getData = async () => {
        const res = await api.getUser();
        console.log(res);
    };

    getData();
    return (
        <div>
            <p>hello</p>
        </div>
    );
}