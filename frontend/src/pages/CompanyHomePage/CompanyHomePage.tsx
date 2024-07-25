import React from "react";
import QRScanner from "./components/QRScanner";
import MyCoupons from "./components/MyCoupons";
import { Container } from "@mui/material";

const CompanyHomePage: React.FC = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: "0 16px",
        marginTop: "2rem",
        gap: "2rem",
      }}
    >
      <QRScanner />
      <MyCoupons />
    </Container>
  );
};

export default CompanyHomePage;
