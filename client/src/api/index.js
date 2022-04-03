import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/"
});

export const registerUser = payload => api.post("/register", payload);

const apis = {
    registerUser
};

export default apis;