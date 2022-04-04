import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Register } from './components/Register';
import { Login } from "./components/Login";
import { User } from "./components/User";
import reportWebVitals from './reportWebVitals';
import { AddEntry } from './components/AddEntry';
import {AllEntries} from "./components/AllEntries";

import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { NavBar } from './components/NavBar';
import { Home } from './components/Home';
import { HomeLoggedIn } from './components/HomeLoggedIn';
import { NotFound } from './components/NotFound';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/home" element={<Home />}/>
        <Route exact path="/home/:id" element={<HomeLoggedIn/>}/>
        <Route exact path="/register" element={<div><Register /></div>}/>
        <Route exact path="/login" element={<div><Login /></div>}/>
        {/* <Route path="/user" element={<User />}/> */}
        <Route exact path="/create/:id" element={<AddEntry/>}/>
        <Route exact path="/entries/:id" element={<AllEntries />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
