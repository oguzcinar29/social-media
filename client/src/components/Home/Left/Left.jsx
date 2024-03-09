import React, { useContext } from "react";
import "./Left.scss";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { SocialContext } from "../../Context/DataContext";
import { Link } from "react-router-dom";

export default function Left() {
  const { user } = useContext(SocialContext);
  console.log(user?.img);

  return (
    <div className="box">
      <div className="avatar item">
        <Link
          className="link"
          style={{ display: "flex", alignItems: "center", gap: "9.5px" }}
          to={`/${user.id}`}
        >
          <Stack direction="row" spacing={2}>
            <Avatar
              style={{ width: "30px", height: "30px" }}
              alt={user.username}
              src={
                typeof user.img !== "undefined"
                  ? `https://social-media-q3gh.onrender.com/${user.img}`
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhtvj0pJnhgtJsOOFTcg6PDGuuGUqR26dFg5AMMkGmqQ&s"
              }
            />
          </Stack>
          <span>{user.name}</span>
        </Link>
      </div>
      <div className="item">
        <img
          src={
            "https://github.com/safak/youtube2022/blob/social-app/client/src/assets/1.png?raw=true"
          }
        />
        <span>Friends</span>
      </div>
      <div className="item">
        <img src="https://github.com/safak/youtube2022/blob/social-app/client/src/assets/2.png?raw=true" />
        <span>Groups</span>
      </div>
      <div className="item">
        <img src="https://github.com/safak/youtube2022/blob/social-app/client/src/assets/3.png?raw=true" />
        <span>Marketplace</span>
      </div>
      <div className="item">
        <img src="https://github.com/safak/youtube2022/blob/social-app/client/src/assets/4.png?raw=true" />
        <span>Watch</span>
      </div>
      <div className="item">
        <img src="https://github.com/safak/youtube2022/blob/social-app/client/src/assets/5.png?raw=true" />
        <span>Memories</span>
      </div>
      <hr></hr>
      <p>Your shortcuts</p>
      <div className="item">
        <img src="https://github.com/safak/youtube2022/blob/social-app/client/src/assets/6.png?raw=true" />
        <span>Events</span>
      </div>
      <div className="item">
        <img src="https://github.com/safak/youtube2022/blob/social-app/client/src/assets/7.png?raw=true" />
        <span>Gaming</span>
      </div>
      <div className="item">
        <img src="https://github.com/safak/youtube2022/blob/social-app/client/src/assets/8.png?raw=true" />
        <span>Galery</span>
      </div>
      <div className="item">
        <img src="https://github.com/safak/youtube2022/blob/social-app/client/src/assets/9.png?raw=true" />
        <span>Videos</span>
      </div>
      <div className="item">
        <img src="https://github.com/safak/youtube2022/blob/social-app/client/src/assets/10.png?raw=true" />
        <span>Messages</span>
      </div>
      <hr></hr>
      <p>Others</p>
      <div className="item">
        <img src="https://github.com/safak/youtube2022/blob/social-app/client/src/assets/11.png?raw=true" />
        <span>Fundraiser</span>
      </div>
      <div className="item">
        <img src="https://github.com/safak/youtube2022/blob/social-app/client/src/assets/12.png?raw=true" />
        <span>Tutorials</span>
      </div>
      <div className="item">
        <img src="https://github.com/safak/youtube2022/blob/social-app/client/src/assets/13.png?raw=true" />
        <span>Courses</span>
      </div>
    </div>
  );
}
