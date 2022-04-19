import React from 'react';
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';

// component imports
import { Home } from './components/Home';
import { NotFound } from './components/NotFound';
import { Register } from './components/Register';
import { Login } from "./components/Login";
import { AddEntry } from './components/AddEntry';
import { AllEntries } from "./components/AllEntries";
import { SingleEntry } from './components/SingleEntry';

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/home" element={<Home />}/>
        <Route exact path="/register" element={<div><Register /></div>}/>
        <Route exact path="/login" element={<div><Login /></div>}/>
        <Route exact path="/create" element={<AddEntry/>}/>
        <Route exact path="/entries" element={<AllEntries />}/>
        <Route exact path="/entry/:id" element={<SingleEntry/>}/>
        <Route exact path="/" element={<Navigate replace to="/home" />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);