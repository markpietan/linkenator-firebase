import { Menu, Image, Input } from "semantic-ui-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar"
import "./NavBar.css"
import { HOME, LOG_IN, PROFILE, SIGN_UP } from "./../constant/routes";

const NavBar = () => {
  const [activeItem, setactiveItem] = useState("");
  const handleItemClick = (e, { name }) => setactiveItem(name);
  const loggedInUser = useSelector((store) => {
    return store.userLoggedIN.user;
  });
  return (
    <div>
      <Menu className= "navBar" color="green" inverted pointing fixed= "top">
        <Link to={HOME}>
          <Menu.Item
            name="home"
            color= "green"
            active={activeItem === "home"}
            onClick={handleItemClick}
          />
        </Link>
        <Link to={`/profile/${loggedInUser?.displayName}`}>
          <Menu.Item
            name="profile"
            active={activeItem === "profile"}
            onClick={handleItemClick}
          />
        </Link>
        {loggedInUser === "" ? (
          <Link to={SIGN_UP}>
            <Menu.Item
              name="sign up"
              active={activeItem === "sign up"}
              onClick={handleItemClick}
            />
          </Link>
        ) : null}
        {loggedInUser === "" ? (
          <Link to={LOG_IN}>
            <Menu.Item
              name="log in"
              active={activeItem === "log in"}
              onClick={handleItemClick}
            />
          </Link>
        ) : null}
        <Menu.Menu position="right">
          <Menu.Item>
          <SearchBar></SearchBar>
          </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position="right">
          <Menu.Item
            name="logout"
            active={activeItem === "logout"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="user"
            active={activeItem === "user"}
            onClick={handleItemClick}
          >
            <p>{loggedInUser?.displayName}</p>
            <Image src={loggedInUser?.photoURL} size="mini" circular />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default NavBar;
