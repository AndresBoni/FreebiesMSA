import React from "react";
import QRScanner from "./components/QRScanner";
import MyCampaigns from "./components/MyCampaigns";
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
      <MyCampaigns />
    </Container>
  );
};

export default CompanyHomePage;
