import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/pillows">Pillows</Link>
    </div>
  );
}

export default NavBar;
