import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/",
    // baseURL: "https://alice-wang-ait-final-project.herokuapp.com/",
    withCredentials: true
});

const registerUser = async (payload) => {
    return await api.post("/register", payload);
};

const loginUser = async (payload) => {
    return await api.post("/login", payload);
};

const getUser = async () => {
    console.log("get user");
    return await api.get("/user");
};

const addEntry = async (payload) => {
    return await api.post("/create", payload);
};

const getEntries = async () => {
    return await api.get("/entries");
};

const getEntry = async (payload) => {
    return await api.get("/entry", {params: {"id": payload}});
};

const deleteEntry = async (payload) => {
    console.log(payload);

    return await api.delete("/delete", {params: {"id": payload}});
}

const updateEntry = async (payload) => {
    return await api.post("/update", payload);
}

const apis = {
    registerUser,
    loginUser,
    getUser,
    addEntry,
    getEntries,
    getEntry,
    deleteEntry,
    updateEntry
};

export default apis;