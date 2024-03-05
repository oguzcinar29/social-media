import React, { useContext, useState } from "react";
import { SocialContext } from "../../Context/DataContext";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
export default function CreatePost() {
  const [postText, setPostText] = useState("");

  const { user } = useContext(SocialContext);

  const [image, setImage] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div className="create-post">
      <form
        encType="multipart/form-data"
        action="https://social-media-q3gh.onrender.com/api/posts/make-post"
        method="post"
      >
        <input type="hidden" name="id" value={user.id} />
        <input type="hidden" name="date" value={new Date().toLocaleString()} />
        <div className="top">
          <Link to={`/${user.id}`}>
            <Stack direction="row" spacing={2}>
              <Avatar
                alt="Remy Sharp"
                src={`https://social-media-q3gh.onrender.com/${user.img}`}
              />
            </Stack>
          </Link>
          <textarea
            type="text"
            name="postText"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="What's on your mind ?"
          />
        </div>
        {image !== null && (
          <img
            style={{ width: "100%", height: "300px", objectFit: "cover" }}
            src={image}
          />
        )}
        <hr></hr>
        <div className="bottom">
          <div className="left12">
            <div className="item">
              <input
                style={{ display: "none" }}
                id="file-input"
                type="file"
                name="postFile"
                onChange={onImageChange}
              />

              <label
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
                id="image-label"
                htmlFor="file-input"
              >
                <img src="https://github.com/safak/youtube2022/blob/social-app/client/src/assets/img.png?raw=true" />
                Add Image
              </label>
            </div>
            <div className="item">
              <img src="https://github.com/safak/youtube2022/blob/social-app/client/src/assets/map.png?raw=true" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src="https://github.com/safak/youtube2022/blob/social-app/client/src/assets/friend.png?raw=true" />
              <span>Tag Frined</span>
            </div>
          </div>
          <input type="submit" value="Share" />
        </div>
      </form>
    </div>
  );
}
