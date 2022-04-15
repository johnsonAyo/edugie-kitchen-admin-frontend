import React from "react";
import { useSelector } from "react-redux";
import UserProfile from "./../UserProfile";
import "./styles.scss";

// const mapState = ({ user }) => ({
//   currentUser: user.currentUser,
// });

const VerticalNav = ({ children }) => {
  // const { currentUser } = useSelector(mapState);

  const configUserProfile = "Admin";

  return (
    <div className="verticalNav">
      <UserProfile />

      <div className="menu">{children}</div>
    </div>
  );
};

export default VerticalNav;
