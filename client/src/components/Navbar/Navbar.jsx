import React, { useContext, useEffect, useState } from "react";
import "./Navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { SocialContext } from "../Context/DataContext";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import FriendRequest from "./FriendRequest";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import Badge from "@mui/material/Badge";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search"; // Importing the search icon
import { InputAdornment } from "@mui/material";
import useWindowDimensions from "../GetWidth";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const [searchUser, setSearchUser] = useState("");

  const [userSearchId, setSearchUserId] = useState();

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const { user, allUsers } = useContext(SocialContext);

  const countries = [
    { code: "AD", label: "Andorra", phone: "376" },
    {
      code: "AE",
      label: "United Arab Emirates",
      phone: "971",
    },
    { code: "AF", label: "Afghanistan", phone: "93" },
  ];

  const countries2 = allUsers?.map((item) => {
    const user = {
      code: item.img,
      label: item.name,
    };
    return user;
  });

  useEffect(() => {
    const findUser = allUsers?.find((item2) => item2.name === searchUser);

    setSearchUserId(findUser?.id);
  }, [searchUser]);

  const { width } = useWindowDimensions();

  const [searchClicked, setSearchClicked] = useState(false);

  return (
    <nav className="nav">
      <div className="box">
        <div className="left">
          <Link className="link" to="/">
            <h5>oguzsocial</h5>
          </Link>

          <div className="icon">
            <Link className="link" to="/">
              <HomeOutlinedIcon />
            </Link>
          </div>
          <div className="icon">
            <DarkModeOutlinedIcon />
          </div>
          <div className="icon">
            <GridViewOutlinedIcon />
          </div>

          {width > 750 && (
            <div className="search2">
              <Autocomplete
                id="country-select-demo"
                sx={{ width: 375 }}
                options={countries2}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                      onClick={() => {
                        setSearchUser(option.label);
                      }}
                    >
                      <Stack direction="row" spacing={2}>
                        <Avatar alt="Remy Sharp" src={option.code} />
                      </Stack>
                      {option.label}
                    </div>
                  </Box>
                )}
                renderInput={(params) => (
                  <div style={{ display: "flex" }}>
                    <TextField
                      {...params}
                      onChange={(e) => setSearchUser(e.target.value)}
                      InputProps={{
                        ...params.InputProps,
                        style: { height: 40 },
                        startAdornment: (
                          <InputAdornment
                            style={{ paddingBottom: "13px" }}
                            position="start"
                          >
                            <SearchIcon />
                          </InputAdornment>
                        ),
                        autoComplete: "new-password", // disable autocomplete and autofill
                      }}
                    />
                    <Link className="link search-user" to={`/${userSearchId}`}>
                      Search
                    </Link>
                  </div>
                )}
              />
            </div>
          )}
        </div>
        {width < 750 && (
          <div className="icon">
            <button
              onClick={() => {
                setSearchClicked((prevVal) => !prevVal);
              }}
              style={{ background: "transparent", border: "none" }}
            >
              <SearchIcon />
            </button>
          </div>
        )}
        {width > 1100 && (
          <div className="right">
            <div className="icon">
              <div>
                <button
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                  aria-describedby={id}
                  type="button"
                  onClick={handleClick}
                >
                  <Badge
                    badgeContent={user?.friend_request?.length}
                    color="primary"
                  >
                    <PersonAddOutlinedIcon
                      style={{ border: "none", color: "black" }}
                    />
                  </Badge>
                </button>
                <Popper id={id} open={open} anchorEl={anchorEl}>
                  {user?.friend_request?.length !== 0 && (
                    <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
                      <div className="friend-request-nav">
                        {user.friend_request?.map((item, i) => {
                          const findUser = allUsers.find(
                            (item2) => item2.id === item
                          );
                          console.log(findUser);
                          return <FriendRequest key={i} {...findUser} />;
                        })}
                      </div>
                    </Box>
                  )}
                  {user?.friend_request?.length === 0 && (
                    <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
                      <div className="friend-request-nav">
                        <h4 style={{ opacity: "0.6" }}>
                          There is no friend requested.
                        </h4>
                      </div>
                    </Box>
                  )}
                </Popper>
              </div>
            </div>
            <div className="icon">
              <EmailOutlinedIcon />
            </div>
            <div className="icon">
              <NotificationsOutlinedIcon />
            </div>
            <form
              action="https://social-media-q3gh.onrender.com/api/auth/logout"
              method="post"
            >
              <input className="logout-nav" type="submit" value="Logout" />
            </form>
            <div className="avatar">
              <Link to={`/${user.id}`}>
                <Stack direction="row" spacing={2}>
                  <Avatar alt="Remy Sharp" src={user.img} />
                </Stack>
              </Link>
              <b>{user.name}</b>
            </div>
          </div>
        )}
      </div>
      {searchClicked && (
        <div className="search2">
          <Autocomplete
            id="country-select-demo"
            sx={{ width: "100%" }}
            options={countries2}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    setSearchUser(option.label);
                  }}
                >
                  <Stack direction="row" spacing={2}>
                    <Avatar alt="Remy Sharp" src={option.code} />
                  </Stack>
                  {option.label}
                </div>
              </Box>
            )}
            renderInput={(params) => (
              <div style={{ display: "flex" }}>
                <TextField
                  {...params}
                  onChange={(e) => setSearchUser(e.target.value)}
                  InputProps={{
                    ...params.InputProps,

                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                />
                <Link className="link search-user" to={`/${userSearchId}`}>
                  Search
                </Link>
              </div>
            )}
          />
        </div>
      )}
    </nav>
  );
}
