import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface ProfileMenuProps {
  anchorEl: null | HTMLElement;
  isMenuOpen: boolean;
  handleMenuClose: () => void;
  handleLogOut: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ anchorEl, isMenuOpen, handleMenuClose, handleLogOut }) => (
  <Menu
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    keepMounted
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    open={isMenuOpen}
    onClose={handleMenuClose}
  >
    <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
  </Menu>
);

export default ProfileMenu;
