import React from "react";
import { Link } from "react-router-dom";

import Header from "./../components/Header";
import VerticalNav from "./../components/VerticalNav";

const AdminLayout = (props) => {
  return (
    <div className="adminLayout">
      <Header {...props} />
      <div className="controlPanel">
        <div className="sidebar">
          <VerticalNav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <span className="signOut">Sign Out</span>
              </li>
            </ul>
          </VerticalNav>
        </div>
        <div className="content">{props.children}</div>
      </div>
      <Header {...props} />
    </div>
  );
};

export default AdminLayout;
