import React, { useContext, useState } from "react";
import "./Right.scss";
import { SocialContext } from "../../Context/DataContext";
import Suggestions from "./Suggestions";
import Latest from "./Latest";
import OnlineFriends from "./OnlineFriends";
export default function Right() {
  const { user, allUsers, dissmissArr } = useContext(SocialContext);

  return (
    <div className="right-box">
      <div className="suggestions box">
        <span>Suggestion For You</span>
        {allUsers?.map((item, i) => {
          const findFriend = user?.friends?.find((item2) => item2 === item.id);
          const findRequest = item?.friend_request?.find((item3) => {
            if (item.id !== user.id) {
              return item3 === user.id;
            }
          });
          const findDiss = dissmissArr?.find((item3) => item3 === item.id);

          if (
            typeof findFriend === "undefined" &&
            item.id !== user?.id &&
            typeof findRequest === "undefined" &&
            typeof findDiss === "undefined"
          ) {
            return <Suggestions key={i} {...item} />;
          }
        })}
      </div>
      <div className="latest-act box">
        <span>Latest Activites</span>
        <Latest />
      </div>
      <div className="online box">
        <span>Online Friends</span>
        <OnlineFriends />
      </div>
    </div>
  );
}
