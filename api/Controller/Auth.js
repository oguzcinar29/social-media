import { db } from "../Database.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

let loginAlert = "";
let registerAlert = "";
export let currentUser = [];

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query("SELECT * FROM users");
    const users = result.rows;
    const findUser = users.find((item) => item.email === email);
    if (typeof findUser === "undefined") {
      // there is no email like that
      loginAlert = "There is no email like that";
      res.redirect("https://social-media-eta-amber.vercel.app/login");
    } else {
      bcrypt.compare(password, findUser.password, function (err, result) {
        if (result) {
          // it can log in everything is correct
          loginAlert = "";
          currentUser = findUser;
          res.redirect("https://social-media-eta-amber.vercel.app");
        } else {
          // wrong password typed
          loginAlert = "Wrong password. Try Again";
          res.redirect("https://social-media-eta-amber.vercel.app/login");
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const register = async (req, res) => {
  const { username, email, password, name } = req.body;
  try {
    const result = await db.query("SELECT * FROM users");
    const users = result.rows;
    const findUser = users.find((item) => item.email === email);

    if (typeof findUser === "undefined") {
      bcrypt.hash(password, saltRounds, async function (err, hash) {
        await db.query(
          "INSERT INTO users(username,email,password,name) VALUES ($1,$2,$3,$4)",
          [username, email, hash, name]
        );
      });
      // everything okay
      registerAlert = "";
      res.redirect("https://social-media-eta-amber.vercel.app/login");
    } else {
      // there is email that user typed
      registerAlert = "There is a email like that.You can loggin";
      res.redirect("https://social-media-eta-amber.vercel.app/register");
    }
  } catch (err) {
    console.log(err);
    res.redirect("https://social-media-eta-amber.vercel.app/register");
  }
};

export const getAlertValue = (req, res) => {
  res.json(loginAlert);
};
export const getAlertValue2 = (req, res) => {
  res.json(registerAlert);
};

export const acceptRequest = async (req, res) => {
  const friend = parseInt(req.body.friend);
  const user = parseInt(req.body.user);
  console.log(friend);
  console.log(user);
  try {
    await db.query(
      "UPDATE users SET friends=array_append(friends,($1)) WHERE id=($2)",
      [friend, user]
    );
    await db.query(
      "UPDATE users SET friends=array_append(friends,($1)) WHERE id=($2)",
      [user, friend]
    );
    await db.query(
      "UPDATE users SET friend_request=array_remove(friend_request,($1)) WHERE id=($2)",
      [friend, user]
    );
    const result = await db.query("SELECT * FROM users WHERE id=($1)", [user]);
    const data = result.rows[0];

    currentUser = data;
    res.redirect("https://social-media-eta-amber.vercel.app");
  } catch (err) {
    console.log(err);
  }
};

export const declineRequest = async (req, res) => {
  const friend = parseInt(req.body.friend);
  const user = parseInt(req.body.user);
  console.log(friend);
  console.log(user);
  try {
    await db.query(
      `UPDATE users SET friend_request=array_remove(friend_request,${friend}) WHERE id=($1)`,
      [user]
    );
    const result = await db.query("SELECT * FROM users WHERE id=($1)", [user]);
    const data = result.rows[0];

    currentUser = data;
    res.redirect("https://social-media-eta-amber.vercel.app");
  } catch (err) {
    console.log(err);
  }
};

export const removeFriend = async (req, res) => {
  // hereeeeee
  console.log(req.body);
  const userId = parseInt(req.body.userId);
  const friendId = parseInt(req.body.friendId);
  try {
    await db.query(
      "UPDATE users SET friends=array_remove(friends,($1)) WHERE id=($2)",
      [friendId, userId]
    );
    await db.query(
      "UPDATE users SET friends=array_remove(friends,($1)) WHERE id=($2)",
      [userId, friendId]
    );
    const result = await db.query("SELECT * FROM users WHERE id=($1)", [
      userId,
    ]);
    const data = result.rows[0];

    currentUser = data;
    res.redirect("https://social-media-eta-amber.vercel.app");
  } catch (err) {
    console.log(err);
  }
};

export const getUserChangeInfo = async (req, res) => {
  const { email, password, name, location, website } = req.body;

  const id = parseInt(req.body.id);
  const coverPicture = req.files.coverPicture && req.files.coverPicture[0].path;
  const profilePicture =
    req.files.profilePicture && req.files.profilePicture[0].path;

  try {
    const result = await db.query("SELECT * FROM users WHERE id=($1)", [id]);
    const data = result.rows[0];

    try {
      bcrypt.hash(password, saltRounds, async function (err, hash) {
        await db.query(
          "UPDATE users SET email=($1),password=($2),name=($3),location=($4),website=($5),img=($6),big_img=($7) WHERE id=($8)",
          [
            email,
            hash,
            name,
            location,
            website,
            typeof profilePicture === "undefined" ? data.img : profilePicture,
            typeof coverPicture === "undefined" ? data.big_img : coverPicture,
            id,
          ]
        );
      });
      const result = await db.query("SELECT * FROM users WHERE id=($1)", [id]);
      const data = result.rows[0];

      currentUser = data;
      res.redirect(`https://social-media-eta-amber.vercel.app/${id}`);
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

export const friendRequest = async (req, res) => {
  console.log(req.body);
  const userId = parseInt(req.body.userId);
  const friendId = parseInt(req.body.friendId);
  try {
    await db.query(
      `UPDATE users SET friend_request=friend_request || '{${userId}}' WHERE id=($1)`,
      [friendId]
    );
    const result = await db.query("SELECT * FROM users WHERE id=($1)", [
      userId,
    ]);
    const data = result.rows[0];

    currentUser = data;
    res.redirect(`https://social-media-eta-amber.vercel.app/${friendId}`);
  } catch (err) {
    console.log(err);
  }
};

export const friendRequestDelete = async (req, res) => {
  const userId = parseInt(req.body.userId);
  const friendId = parseInt(req.body.friendId);
  try {
    await db.query(
      `UPDATE users SET friend_request=array_remove(friend_request,${userId}) WHERE id=($1)`,
      [friendId]
    );
    const result = await db.query("SELECT * FROM users WHERE id=($1)", [
      userId,
    ]);
    const data = result.rows[0];

    currentUser = data;
    res.redirect(`https://social-media-eta-amber.vercel.app/${friendId}`);
  } catch (err) {
    console.log(err);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users");
    const data = result.rows;
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

export const logout = (req, res) => {
  currentUser = [];
  res.redirect("https://social-media-eta-amber.vercel.app/login");
};

export const getCurrentUser = (req, res) => {
  const { password, ...other } = currentUser;
  res.json(other);
};
