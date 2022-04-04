import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './app';
import { Register } from './components/Register';
import { Login } from "./components/Login";
import { User } from "./components/User";
import reportWebVitals from './reportWebVitals';
import { AddEntry } from './components/AddEntry';
import {AllEntries} from "./components/AllEntries";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/user" element={<User />}/>
        <Route path="/create" element={<AddEntry/>}/>
        <Route path="/entries" element={<AllEntries />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
