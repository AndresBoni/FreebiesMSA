import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

interface ProfileMenuProps {
  anchorEl: null | HTMLElement;
  isMenuOpen: boolean;
  handleMenuClose: () => void;
  handleLogOut: () => void;
  logged: boolean;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  anchorEl,
  isMenuOpen,
  handleMenuClose,
  handleLogOut,
  logged,
}) => (
  <Menu
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    keepMounted
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    open={isMenuOpen}
    onClose={handleMenuClose}
  >
    {logged ? (
      <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
    ) : (
      [
        <MenuItem key="login" component={Link} to="/login">
          Login
        </MenuItem>,
        <MenuItem key="signup" component={Link} to="/signup">
          Sign Up
        </MenuItem>,
        <MenuItem key="register-store" component={Link} to="/signup/store">
          Register Store
        </MenuItem>,
      ]
    )}
  </Menu>
);

export default ProfileMenu;
