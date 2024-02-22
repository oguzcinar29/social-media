import React, { useEffect, useState } from "react";
import "./Auth.scss";
import { Link } from "react-router-dom";

export default function Login() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const temp = e.target.name;
    setUserInfo((prevVal) => {
      return { ...prevVal, [temp]: e.target.value };
    });
  };

  const [alert, setAlert] = useState("");

  useEffect(() => {
    fetch("https://social-media-q3gh.onrender.com/api/auth/get-alert-value")
      .then((response) => response.json())
      .then((data) => setAlert(data));
  }, []);

  return (
    <div className="auth">
      <div className="auth-box">
        <div className="auth-image">
          <img src="https://plus.unsplash.com/premium_photo-1675791187743-75daf08bbbee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D" />
          <div className="auth-image-texts">
            <h1>
              Hello<span>World.</span>
            </h1>
            <p>
              Lorem ipsum dolor sit amet. Qui aliquam sint est doloremque culpa
              qui aliquid corporis sit quia ullam. Aut odio facere ea sapiente
              autem eum galisum consequatur. Eum dignissimos quisquam qui labore
              porro non quibusdam quisquam nam quia dicta! Et provident quae a
              voluptatem dolorem qui tempora dolor qui perspiciatis
            </p>
            <p>Do'nt you have an account'</p>
            <Link to="/register">Register</Link>
          </div>
        </div>
        <form
          action="https://social-media-q3gh.onrender.com/api/auth/login"
          method="post"
        >
          <h1>Login</h1>
          <input
            type="text"
            className="hey3"
            name="email"
            placeholder="Email"
            value={userInfo.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userInfo.password}
            onChange={handleChange}
          />

          <h5 style={{ color: "red" }}>{alert}</h5>
          <button className="auth-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
