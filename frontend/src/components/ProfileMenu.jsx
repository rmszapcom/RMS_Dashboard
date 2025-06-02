import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate, useLocation } from "react-router-dom";

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const location = useLocation();

  const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleNavigate = (path) => {
    handleMenuClose();
    navigate(path);
  };

  const handleLogout = () => {
    handleMenuClose();
    window.location.href = "/";
  };

  // Determine menu label and navigation path based on current location
  const isAdmin = location.pathname === "/admin";
  const menuLabel = isAdmin ? "Dashboard" : "Admin Panel";
  const menuPath = isAdmin ? "/" : "/admin";

  return (
    <Box sx={{ position: "absolute", top: 24, right: 32 }}>
      <IconButton
        onClick={handleProfileClick}
        color="primary"
        size="medium"
        sx={{ bgcolor: "#e3e6f5", boxShadow: "none" }}
      >
        <AccountCircleIcon fontSize="medium" sx={{ boxShadow: "none" }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          onClick={() => handleNavigate(menuPath)}
          sx={{ fontSize: "0.8rem" }}
        >
          {menuLabel}
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ fontSize: "0.8rem" }}>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ProfileMenu;
