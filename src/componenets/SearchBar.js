import { Input, List, Image } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userSearched } from "../services/firebase";
import { formatDistance } from "date-fns";
import "./SearchBar.css";

const SearchBar = () => {
  const [userText, setuserText] = useState("");
  const [results, setResults] = useState(null);
  const [debounceText, setdebounceText] = useState("");
  

  useEffect(() => {
    const id = setTimeout(() => {
      if (userText !== "" && userText.length >= 3) {
        setdebounceText(userText);
      }
    }, 800);
    if (userText === "") {
      setResults(null);
    }
    return () => {
      clearTimeout(id);
    };
  }, [userText]);
  useEffect(() => {
    async function searchUser() {
      const response = await userSearched(debounceText);
      setResults(response);
    }
    if (debounceText !== "") {
      searchUser();
    }
  }, [debounceText]);
  return (
    <>
      <Input
        value={userText}
        onChange={(e) => {
          setuserText(e.target.value.toLowerCase());
        }}
        icon="search"
        placeholder="Search..."
        id="searchBar"
        size="small"
      />
      {results?.length === 0 ? (
        <>
          <List id="searchResults" divided relaxed verticalAlign="middle">
            <List.Item style={{ width: "14.4rem" }} className="itemPadding">
              <List.Icon
                color="red"
                name="question"
                size="large"
                verticalAlign="middle"
              />
              <List.Content>
                <List.Header as="a">No Users Found</List.Header>
              </List.Content>
            </List.Item>
          </List>
        </>
      ) : (
        <>
          <List id="searchResults" divided relaxed verticalAlign="middle">
            {results?.map((user) => {
              return (
                <Link key={user.docId} to={`/profile/${user.userName}`}>
                  <List.Item
                    onClick={() => {
                      setuserText("");
                      setResults(null);
                      // history.push(`/profile/${user.userName}`);
                    }}
                    className="itemPadding"
                  >
                    <Image avatar src={user.photoURL} />
                    <List.Content>
                      <List.Header>{user.userName}</List.Header>
                      <List.Description>
                        Joined {formatDistance(user?.dateCreated, Date.now())}{" "}
                        ago
                      </List.Description>
                    </List.Content>
                  </List.Item>
                </Link>
              );
            })}
          </List>
        </>
      )}
    </>
  );
};

export default SearchBar;
