import React, { MouseEvent, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import ProfileMenu from "./ProfileMenu";
import MobileMenu from "./MobileMenu";
import { logout } from "@/store/slices/userSlice";
import { RootState } from "@/store/store";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state: RootState) => state.user);
  const logged = !!token;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [],
  );

  const handleMobileMenuOpen = useCallback((event: MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  }, []);

  const handleMobileMenuClose = useCallback(() => {
    setMobileMoreAnchorEl(null);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
    handleMobileMenuClose();
  }, [handleMobileMenuClose]);

  const handleLogOut = useCallback(() => {
    dispatch(logout());
    handleMenuClose();
  }, [dispatch, handleMenuClose]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to={"/"}
              sx={{
                display: { sm: "block" },
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Freebies
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {logged ? (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <Typography
                      variant="body2"
                      sx={{ mr: 1, fontSize: "0.875rem" }}
                    >
                      {user?.name}
                    </Typography>
                    <AccountCircle />
                  </IconButton>
                </Box>
              ) : (
                <>
                  <Button color="inherit" component={Link} to="/login">
                    Login
                  </Button>
                  <Button color="inherit" component={Link} to="/signup">
                    Sign Up
                  </Button>
                  <Button
                    color="info"
                    variant="contained"
                    component={Link}
                    to="/signup/store"
                    sx={{ mx: 2 }}
                  >
                    Register Store
                  </Button>
                </>
              )}
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls="primary-search-account-menu-mobile"
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <MobileMenu
        anchorEl={mobileMoreAnchorEl}
        isMobileMenuOpen={isMobileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
        handleProfileMenuOpen={handleProfileMenuOpen}
        logged={logged}
      />
      <ProfileMenu
        anchorEl={anchorEl}
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
        handleLogOut={handleLogOut}
        logged={logged}
      />
    </Box>
  );
};

export default Navbar;
