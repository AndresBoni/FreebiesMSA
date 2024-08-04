import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

interface MobileMenuProps {
  anchorEl: null | HTMLElement;
  isMobileMenuOpen: boolean;
  handleMobileMenuClose: () => void;
  handleProfileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  logged: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  anchorEl,
  isMobileMenuOpen,
  handleMobileMenuClose,
  handleProfileMenuOpen,
  logged,
}) => (
  <Menu
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    keepMounted
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    open={isMobileMenuOpen}
    onClose={handleMobileMenuClose}
  >
    {logged ? (
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
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

export default MobileMenu;
