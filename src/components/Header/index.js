import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import "./styles.scss";

const Logo =
  "https://res.cloudinary.com/dfi24gqb6/image/upload/v1650028155/edugielogo_pi6n7m.jpg";

const Header = (props) => {
  const location = useLocation();

  useEffect(() => {}, [location]);

  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="SimpleTut LOGO" />
          </Link>
        </div>

        <nav>
          <ul>
            <li>
              <Link to="/">Edugie Kitchen Admin Dashboard</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
