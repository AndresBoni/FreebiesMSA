import React from "react";
import { Container, Typography } from "@mui/material";
import CouponsList from "./components/CouponsList";

const CustomerHomePage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ padding: "0 16px", marginTop: "2rem" }}>
      <Typography component="h1" variant="h5" pt={2} textAlign="center">
        Come Hungry, Leave Happy! 🍔🎉
      </Typography>
      <Typography
        variant="subtitle1"
        pb={4}
        textAlign="center"
        color="textSecondary"
      >
        Discover mouth-watering deals and freebies just for you!
      </Typography>
      <CouponsList />
    </Container>
  );
};

export default CustomerHomePage;
