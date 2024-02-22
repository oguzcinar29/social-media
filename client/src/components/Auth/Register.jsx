import React, { useState, useEffect } from "react";
import "./Auth.scss";
import { Link } from "react-router-dom";

export default function Register() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e) => {
    const temp = e.target.name;
    setUserInfo((prevVal) => ({
      ...prevVal,
      [temp]: e.target.value,
    }));
  };

  const [alert, setAlert] = useState("");

  useEffect(() => {
    fetch("/api/auth/get-alert-value2")
      .then((response) => response.json())
      .then((data) => setAlert(data));
  }, []);

  return (
    <div className="auth">
      <div className="auth-box">
        <form action="/api/auth/register" method="post">
          <h1>Register</h1>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={userInfo.username}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={userInfo.email}
            required
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            required
            placeholder="Name"
            name="name"
            value={userInfo.name}
            onChange={handleChange}
          />

          <h5 style={{ color: "red" }}>{alert}</h5>
          <button className="auth-btn" type="submit">
            Register
          </button>
        </form>
        <div className="auth-image">
          <img src="https://plus.unsplash.com/premium_photo-1707988178080-1410d2423487?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8" />
          <div className="auth-image-texts">
            <h1>
              Oguz<span>Social.</span>
            </h1>
            <p>
              Lorem ipsum dolor sit amet. Qui aliquam sint est doloremque culpa
              qui aliquid corporis sit quia ullam. Aut odio facere ea sapiente
              autem eum galisum consequatur. Eum dignissimos quisquam qui labore
              porro non quibusdam quisquam nam quia dicta! Et provident quae a
              voluptatem dolorem qui tempora dolor qui perspiciatis
            </p>
            <p>Do you have an account?</p>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
