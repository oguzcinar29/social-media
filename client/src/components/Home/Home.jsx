import React, { useContext } from "react";
import Left from "./Left/Left";
import Middle from "./Middle/Middle";
import Right from "./Right/Right";
import "./Home.scss";
import { SocialContext } from "../Context/DataContext";
export default function Home() {
  return (
    <div className="home">
      <div className="home-box">
        <div className="left">
          <Left />
        </div>
        <div className="middle">
          <Middle />
        </div>
        <div className="right">
          <Right />
        </div>
      </div>
    </div>
  );
}
