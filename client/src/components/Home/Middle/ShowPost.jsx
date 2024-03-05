import React, { useContext, useState, useEffect } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { SocialContext } from "../../Context/DataContext";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Comments from "./Comments";
import LikePost from "./LikePost";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { Link } from "react-router-dom";

export default function ShowPost({ showUserId, hey }) {
  const { user, allUsers } = useContext(SocialContext);

  const [posts, setPosts] = useState([]);

  const [isDeleteClicked, setDeleteClicked] = useState(false);
  const [deleteId, setDeleteId] = useState();

  const [isLikeClicked, setIsLikeClicked] = useState(false);

  const [likePostId, setLikePostId] = useState(null);

  const [showLikeIcon, setShowLikeIcon] = useState(false);

  const [likeIconId, setLikeIconId] = useState();

  const [isCommentClicked, setCommentClicked] = useState(false);

  const [commentText, setCommentText] = useState("");

  const [commentId, setCommentId] = useState();

  const [isItTrue, setTrue] = useState(false);

  const sendComment = (user_id, post_id, text) => {
    fetch("https://social-media-q3gh.onrender.com/api/posts/get-comment", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userId: user_id,
        postId: post_id,
        comment: text,
        date: new Date().toLocaleString(),
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      });
  };

  const deletePost = (id) => {
    fetch("https://social-media-q3gh.onrender.com/api/posts/delete-post", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ postId: id }),
    });
  };

  const likePost = (user_id, post_id, count, likes) => {
    fetch("https://social-media-q3gh.onrender.com/api/posts/get-like", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userId: user_id,
        postId: post_id,
        count: count,
        likes: likes,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      });
  };

  const WAIT_TIME = 1000;
  useEffect(() => {
    axios
      .get("https://social-media-q3gh.onrender.com/api/posts/get-all-post")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [posts]);

  return (
    <>
      {posts[0] === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "100px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <div>
          {Array.isArray(posts) &&
            posts?.map((item, i) => {
              const findUser = allUsers.find(
                (item2) => parseInt(item2.id) === parseInt(item.user_id)
              );
              const findLike = item.likes?.find((item) => {
                if (item.userId === user.id) {
                  return item.boolean;
                }
              });

              const findFriend = user?.friends?.find(
                (item2) => item2 === findUser?.id
              );
              return (
                <div key={i}>
                  {hey !== "123"
                    ? (findFriend === findUser?.id ||
                        findUser?.id === user.id) && (
                        <div className="show-post">
                          <div className="show-post-box">
                            <div className="first">
                              <div className="avatar">
                                <Link to={`/${item.user_id}`}>
                                  <Stack direction="row" spacing={2}>
                                    <Avatar
                                      alt="Remy Sharp"
                                      src={findUser?.img}
                                    />
                                  </Stack>
                                </Link>
                                <div className="user-name">
                                  <Link
                                    to={`/${item.user_id}`}
                                    className="link"
                                  >
                                    <b>{findUser?.name}</b>
                                  </Link>
                                  <span>{item.share_time}</span>
                                </div>
                              </div>
                              {item.user_id === user.id && (
                                <form
                                  className="delete-form"
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    deletePost(item.id);
                                    setDeleteClicked((prevVal) => !prevVal);
                                  }}
                                >
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setDeleteId(item.id);
                                      setDeleteClicked((prevVal) => !prevVal);
                                    }}
                                  >
                                    <MoreHorizIcon />
                                  </button>
                                  {isDeleteClicked && item.id === deleteId && (
                                    <button className="delete" type="submit">
                                      delete
                                    </button>
                                  )}
                                </form>
                              )}
                            </div>
                            <div className="second">
                              <p>{item.post_text}</p>
                            </div>
                            <div className="third">
                              <img
                                src={`https://social-media-q3gh.onrender.com/${item.img}`}
                              />
                            </div>
                            <div className="fourth">
                              <form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  likePost(
                                    user.id,
                                    item.id,
                                    item?.like_count,
                                    item?.likes
                                  );
                                }}
                                className="item"
                              >
                                <button type="submit">
                                  {typeof findLike === "undefined" ? (
                                    <FavoriteBorderOutlinedIcon />
                                  ) : (
                                    <FavoriteOutlinedIcon
                                      style={{ color: "red" }}
                                    />
                                  )}
                                </button>
                                <span>
                                  {item.like_count === null
                                    ? 0
                                    : item?.like_count}
                                </span>
                              </form>
                              <form>
                                <button
                                  onClick={() => {
                                    setCommentClicked((prevVal) => !prevVal);
                                    setCommentId(item.id);
                                  }}
                                  type="button"
                                >
                                  <ChatOutlinedIcon />
                                  <span>
                                    Comments{" "}
                                    <span>
                                      {item?.data2 !== null ? (
                                        <span>({item.data2?.length})</span>
                                      ) : null}
                                    </span>
                                  </span>
                                </button>
                              </form>
                              <div>
                                <ShareOutlinedIcon />
                                <span>Share</span>
                              </div>
                            </div>
                            <div className="fifth">
                              {isCommentClicked && item.id === commentId && (
                                <form
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    setCommentText("");
                                    sendComment(user?.id, item.id, commentText);
                                  }}
                                  className="comment-text"
                                >
                                  <Stack direction="row" spacing={2}>
                                    <Avatar alt="Remy Sharp" src={user?.img} />
                                  </Stack>
                                  <input
                                    className="comment-text"
                                    type="text"
                                    name="commentText"
                                    value={commentText}
                                    onChange={(e) =>
                                      setCommentText(e.target.value)
                                    }
                                    placeholder="write a comment"
                                    autoFocus
                                    required
                                  />

                                  <input
                                    className="send-comment"
                                    type="submit"
                                    value="Send"
                                  />
                                </form>
                              )}
                              {isCommentClicked && item?.id === commentId && (
                                <div className="comments">
                                  {item.data2?.toReversed().map((item2, i) => {
                                    return (
                                      <Comments
                                        postId={item.id}
                                        key={i}
                                        {...item2}
                                      />
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    : (typeof showUserId !== "undefined"
                        ? showUserId === findUser?.id
                        : findUser?.id === user.id) && (
                        <div key={i} className="show-post">
                          <div className="show-post-box">
                            <div className="first">
                              <div className="avatar">
                                <Link to={`/${item.user_id}`}>
                                  <Stack direction="row" spacing={2}>
                                    <Avatar
                                      alt="Remy Sharp"
                                      src={findUser?.img}
                                    />
                                  </Stack>
                                </Link>
                                <div className="user-name">
                                  <Link
                                    to={`/${item.user_id}`}
                                    className="link"
                                  >
                                    <b>{findUser?.name}</b>
                                  </Link>
                                  <span>{item.share_time}</span>
                                </div>
                              </div>
                              {item.user_id === user.id && (
                                <form
                                  className="delete-form"
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    deletePost(item.id);
                                    setDeleteClicked((prevVal) => !prevVal);
                                  }}
                                >
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setDeleteId(item.id);
                                      setDeleteClicked((prevVal) => !prevVal);
                                    }}
                                  >
                                    <MoreHorizIcon />
                                  </button>
                                  {isDeleteClicked && item.id === deleteId && (
                                    <button className="delete" type="submit">
                                      delete
                                    </button>
                                  )}
                                </form>
                              )}
                            </div>
                            <div className="second">
                              <p>{item.post_text}</p>
                            </div>
                            {item.img !== null && (
                              <div className="third">
                                <img src={item.img} />
                              </div>
                            )}
                            <div className="fourth">
                              <form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  likePost(
                                    user.id,
                                    item.id,
                                    item?.like_count,
                                    item?.likes
                                  );
                                }}
                                className="item"
                              >
                                <button type="submit">
                                  {typeof findLike === "undefined" ? (
                                    <FavoriteBorderOutlinedIcon />
                                  ) : (
                                    <FavoriteOutlinedIcon
                                      style={{ color: "red" }}
                                    />
                                  )}
                                </button>
                                <span>
                                  {item.like_count === null
                                    ? 0
                                    : item?.like_count}
                                </span>
                              </form>
                              <form>
                                <button
                                  onClick={() => {
                                    setCommentClicked((prevVal) => !prevVal);
                                    setCommentId(item.id);
                                  }}
                                  type="button"
                                >
                                  <ChatOutlinedIcon />
                                  <span>
                                    Comments{" "}
                                    <span>
                                      {item?.data2 !== null ? (
                                        <span>({item.data2?.length})</span>
                                      ) : null}
                                    </span>
                                  </span>
                                </button>
                              </form>
                              <div>
                                <ShareOutlinedIcon />
                                <span>Share</span>
                              </div>
                            </div>
                            <div className="fifth">
                              {isCommentClicked && item.id === commentId && (
                                <form
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    setCommentText("");
                                    sendComment(user?.id, item.id, commentText);
                                  }}
                                  className="comment-text"
                                >
                                  <Stack direction="row" spacing={2}>
                                    <Avatar alt="Remy Sharp" src={user?.img} />
                                  </Stack>
                                  <input
                                    className="comment-text"
                                    type="text"
                                    name="commentText"
                                    value={commentText}
                                    onChange={(e) =>
                                      setCommentText(e.target.value)
                                    }
                                    placeholder="write a comment"
                                    autoFocus
                                    required
                                  />

                                  <input
                                    className="send-comment"
                                    type="submit"
                                    value="Send"
                                  />
                                </form>
                              )}
                              {isCommentClicked && item?.id === commentId && (
                                <div className="comments">
                                  {item.data2?.toReversed().map((item2, i) => {
                                    return (
                                      <Comments
                                        postId={item.id}
                                        key={i}
                                        {...item2}
                                      />
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                </div>
              );
            })}
        </div>
      )}
    </>
  );
}
