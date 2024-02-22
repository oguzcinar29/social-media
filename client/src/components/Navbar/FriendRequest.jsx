import React, { useContext, useEffect } from "react";
import { SocialContext } from "../Context/DataContext";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

export default function FriendRequest({ img, name, id }) {
  const { user, setUser } = useContext(SocialContext);

  return (
    <div>
      <div className="box">
        <div className="img">
          <Stack direction="row" spacing={2}>
            <Avatar
              style={{ width: "70px", height: "70px" }}
              alt="Remy Sharp"
              src={img}
            />
          </Stack>
        </div>
        <div className="user-info">
          <b>{name}</b>
          <div className="accept-buttons">
            <form action="/api/auth/accept-request" method="post">
              <button type="submit">Accept</button>
              <input type="hidden" name="friend" value={id} />
              <input type="hidden" name="user" value={user.id} />
            </form>
            <form
              action="/api/auth/decline-request"
              method="post"
              type="submit"
            >
              <button>Declined</button>
              <input type="hidden" name="friend" value={id} />
              <input type="hidden" name="user" value={user.id} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
