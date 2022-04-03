import React from "react";
import { BrowserRouter as Router} from "react-router-dom";

import { Register } from "../components/Register.jsx";

import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <Router>
      <Register />
    </Router>
  )
}

export default App;
