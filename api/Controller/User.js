import { db } from "../Database.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const getUserChangeInfo = async (req, res) => {
  const { email, password, name, location, website } = req.body;

  const id = parseInt(req.body.id);
  const coverPicture = req.files.coverPicture && req.files.coverPicture[0].path;
  const profilePicture =
    req.files.profilePicture && req.files.profilePicture[0].path;

  try {
    const result = await db.query("SELECT * FROM users WHERE id=($1)", [id]);
    const data = result.rows[0];
    console.log(data);
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
    res.redirect(`https://social-media-eta-amber.vercel.app/${friendId}`);
  } catch (err) {
    console.log(err);
  }
};
