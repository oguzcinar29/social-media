import * as React from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

export default function OnlineFriends() {
  return (
    <div className="online-friends">
      <div className="online-box">
        <Stack direction="row" spacing={2}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              alt="Remy Sharp"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8qsK1MdlLl333291EbJcgraI6lm29K-3XnQ&usqp=CAU"
            />
          </StyledBadge>
        </Stack>
        <b>Fernando Torres</b>
      </div>
      <div className="online-box">
        <Stack direction="row" spacing={2}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              alt="Remy Sharp"
              src="data:image/jpeg;base64,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"
            />
          </StyledBadge>
        </Stack>
        <b>Collins Fischer</b>
      </div>
      <div className="online-box">
        <Stack direction="row" spacing={2}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              alt="Remy Sharp"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvCdyi-jV5u0bVQC1BIH0LAH2wJT_p56qUNQ&usqp=CAU"
            />
          </StyledBadge>
        </Stack>
        <b>David Beckham</b>
      </div>
      <div className="online-box">
        <Stack direction="row" spacing={2}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              alt="Remy Sharp"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWsGk0OBBtICyPdKd4FalMuKWFEpE5ZSQG6g&usqp=CAU"
            />
          </StyledBadge>
        </Stack>
        <b>Adriana Lima</b>
      </div>
    </div>
  );
}
