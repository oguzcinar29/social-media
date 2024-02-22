import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { SocialContext } from "../Context/DataContext";
import Left from "../Home/Left/Left";
import Right from "../Home/Right/Right";
import SingleProfile from "./SingleProfile";

export default function UserProfile() {
  const { id } = useParams();
  const { allUsers } = useContext(SocialContext);
  const findUser = allUsers?.find((item) => parseInt(item.id) === parseInt(id));

  return (
    <div className="home">
      <div className="home-box">
        <div className="left">
          <Left />
        </div>
        <div className="user-profile hey">
          <SingleProfile {...findUser} />
        </div>
        <div className="right">
          <Right />
        </div>
      </div>
    </div>
  );
}
