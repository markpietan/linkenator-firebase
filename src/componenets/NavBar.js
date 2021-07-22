import { Menu, Image } from "semantic-ui-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { signOut } from "../services/firebase";
import { Link, useHistory } from "react-router-dom";
import SearchBar from "./SearchBar";
import "./NavBar.css";
import { HOME, LOG_IN, SIGN_UP } from "./../constant/routes";
import logo from "../logo.png";

const NavBar = () => {
  const [activeItem, setactiveItem] = useState("");
  const history = useHistory();
  const handleItemClick = async (e, { name }) => {
    if (name === "logout") {
      await signOut(history);
    }
    setactiveItem(name);
  };
  const loggedInUser = useSelector((store) => {
    return store.userLoggedIN.user;
  });
  return (
    <div>
      <Menu
        as="ul"
        className="navBar"
        color="green"
        inverted
        pointing
        fixed="top"
      >
        <Link to={HOME}>
          <Menu.Item
            as="li"
            color="green"
            active={activeItem === "home"}
            onClick={handleItemClick}
          >
            <Image circular size="mini" src={logo}></Image>
          </Menu.Item>
        </Link>
        <Link to={`/profile/${loggedInUser?.displayName}`}>
          <Menu.Item
            as="li"
            name="profile"
            active={activeItem === "profile"}
            onClick={handleItemClick}
          />
        </Link>
        {loggedInUser === null ? (
          <Link to={SIGN_UP}>
            <Menu.Item
              as="li"
              name="sign up"
              active={activeItem === "sign up"}
              onClick={handleItemClick}
            />
          </Link>
        ) : null}
        {loggedInUser === null ? (
          <Link to={LOG_IN}>
            <Menu.Item
              as="li"
              name="log in"
              active={activeItem === "log in"}
              onClick={handleItemClick}
            />
          </Link>
        ) : null}

        <Menu.Menu position="right">
          {loggedInUser !== null ? (
            <Menu.Item
              as="li"
              name="logout"
              active={activeItem === "logout"}
              onClick={handleItemClick}
            />
          ) : null}
          <Menu.Item>
            <SearchBar></SearchBar>
          </Menu.Item>
          <Menu.Item
            as="li"
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
