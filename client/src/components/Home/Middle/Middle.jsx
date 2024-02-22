import React from "react";
import "./Middle.scss";
import CreatePost from "./CreatePost";
import ShowPost from "./ShowPost";

export default function Middle() {
  return (
    <div className="middle-box">
      <div className="storys"></div>
      <CreatePost />
      <ShowPost />
    </div>
  );
}
