import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { SocialContext } from "../Context/DataContext";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function UpdateUserInfo({
  name,
  username,
  email,
  password,
  id,
  location,
  website,
  img,
  big_img,
  friends,
  friend_request,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { user, allUsers } = useContext(SocialContext);

  const [userInfo, setUserInfo] = useState({
    name: name || "",
    password: "",
    email: email || "",
    location: location || "",
    website: website || "",
    id: id,
  });

  const userInfoChange = (e) => {
    const target = e.target.name;
    console.log(target);
    setUserInfo((prevVal) => {
      return { ...prevVal, [target]: e.target.value };
    });
  };

  const [image, setImage] = useState(big_img);
  const [image2, setImage2] = useState(img);
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  const onImageChange2 = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage2(URL.createObjectURL(event.target.files[0]));
    }
  };

  const findUser = allUsers?.find((item) => item.id === id);

  const findRequest = findUser?.friend_request?.find(
    (item) => item === user?.id
  );

  console.log(findUser);

  const checkFriend = findUser?.friends?.find((item) => item === user.id);
  console.log(checkFriend);

  return (
    <div>
      <div>
        {user.id === id && (
          <Button
            style={{ color: "white", backgroundColor: "rgb(78, 78, 208)" }}
            onClick={handleOpen}
          >
            Update
          </Button>
        )}
        {user.id !== id && (
          <form action="/api/auth/friend-request" method="post">
            {typeof findRequest === "undefined" &&
            typeof checkFriend === "undefined" ? (
              <button type="submit" className="follow-btn">
                Follow
              </button>
            ) : (
              <div>
                {typeof checkFriend === "undefined" ? (
                  <form action="/api/auth/friend-request-delete" method="post">
                    <button type="submit" className="friend-request-span">
                      Friend Request Waiting
                    </button>
                    <input type="hidden" name="userId" value={user.id} />
                    <input type="hidden" name="friendId" value={id} />
                  </form>
                ) : (
                  <form action="/api/auth/remove-friend" method="post">
                    <button type="submit" className="friend-request-span">
                      Following
                    </button>
                    <input type="hidden" name="userId" value={user.id} />
                    <input type="hidden" name="friendId" value={id} />
                  </form>
                )}
              </div>
            )}
            <input type="hidden" name="userId" value={user.id} />
            <input type="hidden" name="friendId" value={id} />
          </form>
        )}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form
              action="/api/auth/get-change-user-info"
              method="post"
              encType="multipart/form-data"
            >
              <input type="hidden" name="id" value={id} />
              <div className="update-user" id="hey">
                <div className="close">
                  <h1>Update Your Profile</h1>
                  <button onClick={() => setOpen(false)} type="button">
                    <CloseOutlinedIcon />
                  </button>
                </div>

                <div className="update-imgs">
                  <div>
                    <p>Cover picture</p>
                    <input
                      style={{ display: "none" }}
                      type="file"
                      name="coverPicture"
                      id="img1"
                      onChange={onImageChange}
                    />

                    <label
                      className="label"
                      style={{ cursor: "pointer" }}
                      htmlFor="img1"
                    >
                      <img alt="preview image" src={image} />
                      <div>
                        <CloudUploadIcon
                          style={{ color: "rgb(78, 78, 208)" }}
                        />
                      </div>
                    </label>
                  </div>
                  <div>
                    <p>Profile Picture</p>
                    <input
                      style={{ display: "none" }}
                      onChange={onImageChange2}
                      type="file"
                      name="profilePicture"
                      id="img2"
                    />
                    <label
                      className="label"
                      style={{ cursor: "pointer" }}
                      htmlFor="img2"
                    >
                      <img alt="preview image" src={image2} />
                      <div>
                        <CloudUploadIcon
                          style={{ color: "rgb(78, 78, 208)" }}
                        />
                      </div>
                    </label>
                  </div>
                </div>
                <div className="get-info">
                  <label>Email</label>
                  <input
                    onChange={userInfoChange}
                    type="text"
                    name="email"
                    required
                    value={userInfo.email}
                  />
                </div>
                <div className="get-info">
                  <label>Password</label>
                  <input
                    onChange={userInfoChange}
                    type="password"
                    required
                    name="password"
                    value={userInfo.password}
                  />
                </div>
                <div className="get-info">
                  <label>Name</label>
                  <input
                    onChange={userInfoChange}
                    type="text"
                    name="name"
                    value={userInfo.name}
                  />
                </div>
                <div className="get-info">
                  <label>Country City</label>
                  <input
                    onChange={userInfoChange}
                    type="text"
                    name="location"
                    value={userInfo.location}
                  />
                </div>
                <div className="get-info">
                  <label>Website</label>
                  <input
                    onChange={userInfoChange}
                    type="text"
                    name="website"
                    value={userInfo.website}
                  />
                </div>

                <button className="update-btn" type="submit">
                  Update
                </button>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
