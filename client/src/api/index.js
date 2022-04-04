import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/"
});

const registerUser = async (payload) => {
    return await api.post("/register", payload);
};

const loginUser = async (payload) => {
    return await api.post("/login", payload);
};

const getUser = async () => {
    console.log("get user");
    return await api.get("/user", {withCredentials: true});
};

const apis = {
    registerUser,
    loginUser,
    getUser
};

export default apis;