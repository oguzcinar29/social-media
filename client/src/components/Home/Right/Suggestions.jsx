import React, { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { SocialContext } from "../../Context/DataContext";
import { Link } from "react-router-dom";

export default function Suggestions({ name, img, id }) {
  const { tempUserArr, setDissMissArr } = useContext(SocialContext);
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const [posts, setPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    fetch("https://social-media-q3gh.onrender.com/api/auth/get-current-user")
      .then((response) => response.json())
      .then((data) => setUser(data));

    fetch("https://social-media-q3gh.onrender.com/api/auth/get-all-users")
      .then((response) => response.json())
      .then((data) => {
        setAllUsers(data);
      });
  }, []);
  return (
    <div className="suggestion">
      <div className="name">
        <Link to={`/${id}`}>
          <Stack direction="row" spacing={2}>
            <Avatar
              style={{ width: "30px", height: "30px" }}
              alt={img.username}
              src={
                typeof user.img !== "undefined"
                  ? `https://social-media-q3gh.onrender.com/${user.img}`
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhtvj0pJnhgtJsOOFTcg6PDGuuGUqR26dFg5AMMkGmqQ&s"
              }
            />
          </Stack>
        </Link>
        <b>{name}</b>
      </div>
      <div className="suggestion-btns">
        <form
          action="https://social-media-q3gh.onrender.com/api/auth/friend-request"
          method="post"
        >
          <button className="last-btns" type="submit">
            follow
          </button>
          <input type="hidden" name="userId" value={user?.id} />
          <input type="hidden" name="friendId" value={id} />
        </form>
        <Link
          className="link last-btns red"
          to="/"
          onClick={() => setDissMissArr((prevVal) => [prevVal, id])}
        >
          dissmiss
        </Link>
      </div>
    </div>
  );
}
