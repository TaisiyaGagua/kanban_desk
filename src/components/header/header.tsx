import React, { useState } from "react";
import "./header.css";
import logo from "./logo.svg";
import arrow from "./arrow.svg";

function Header(props: any) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <header className="header">
        <p className="header-title"> Awesome Kanban Board </p>
        <div className="header-user" onClick={toggleDropdown}>
          <img src={logo} className="header-logo" alt="logo" />
          <img
            src={arrow}
            className={`header-arrow${isOpen ? "-down" : ""}`}
            alt="arrow"
          />
        </div>
      </header>
      {isOpen && (
        <div className="header_dropdown-content">
          <p className="header_dropdown-text">Profile</p>
          <p className="header_dropdown-text">Log Out</p>
        </div>
      )}
    </div>
  );
}

export default Header;
