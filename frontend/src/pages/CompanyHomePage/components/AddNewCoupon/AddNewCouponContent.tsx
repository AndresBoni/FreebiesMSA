import React, { useState } from "react";
import AddNewCouponForm from "./AddNewCouponForm";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Coupon } from "@/types";
import CouponCard from "@/components/CouponCard";

const AddNewCouponContent: React.FC = () => {
  const [couponPreview, setCouponPreview] = useState<Coupon>({
    id: 0,
    title: "",
    store: "",
    imageUrl: "",
    shortDescription: "",
    conditions: "",
    location: { state: "", district: "" },
    status: "active",
    targetCustomer: "all",
    redeemed: 0,
    available: 0,
    inProgress: 0,
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <AddNewCouponForm setCouponPreview={setCouponPreview} />
      </Grid>
      <Grid item xs={12} md={4} display="flex" justifyContent="center">
        <Box
          maxWidth={{ xs: "100%", sm: 300, md: 300 }}
          sx={{
            display: { xs: "flex", md: "block" },
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          <CouponCard coupon={couponPreview} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default AddNewCouponContent;
