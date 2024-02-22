import React, { useContext, useState } from "react";
import { SocialContext } from "../../Context/DataContext";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import { Link } from "react-router-dom";
export default function Comments({ postId, userId, comment, date }) {
  const { allUsers, user } = useContext(SocialContext);
  const findUser = allUsers.find((item) => item.id === userId);

  const deleteComment = () => {
    console.log(postId);
    fetch("https://social-media-q3gh.onrender.com/api/posts/delete-comment", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        comment: comment,
        postId: postId,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      });
  };

  const editText = () => {
    console.log("hey");
    setChangeText("");
    fetch(
      "https://social-media-q3gh.onrender.com/api/posts/edit-comment-text",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          postId: postId,
          oldComment: comment,
          newComment: changeText,
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => console.log(result));

    setEditClicked(false);
  };

  const [isEditClicked, setEditClicked] = useState(false);
  const [changeText, setChangeText] = useState(comment);

  return (
    <div className="comment">
      <div className="user-info">
        <Link to={`/${userId}`}>
          <Stack direction="row" spacing={2}>
            <Avatar alt="Remy Sharp" src={findUser.img} />
          </Stack>
        </Link>
        <div className="text">
          <Link className="link" to={`/${userId}`}>
            <b>{findUser?.name}</b>
          </Link>
          {!isEditClicked && <p>{comment}</p>}
          {isEditClicked && (
            <input
              value={changeText}
              onChange={(e) => setChangeText(e.target.value)}
              name="editedText"
              type="text"
              placeholder="Change your text"
            />
          )}
        </div>
      </div>

      <span className="date">
        <span>{date?.slice(10, 22)}</span>
        <span>{date?.slice(0, 9)}</span>
      </span>
      {user.id === userId && (
        <div className="edit-comment">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              deleteComment();
            }}
          >
            <button type="submit">
              <DeleteOutlineOutlinedIcon style={{ color: "red" }} />
            </button>
          </form>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editText();
            }}
          >
            {!isEditClicked && (
              <button onClick={() => setEditClicked(true)} type="button">
                <ModeOutlinedIcon style={{ color: "rgb(78, 78, 208)" }} />
              </button>
            )}

            {isEditClicked && (
              <button type="submit">
                <DoneOutlineOutlinedIcon
                  style={{ color: "rgb(78, 78, 208)" }}
                />
              </button>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
