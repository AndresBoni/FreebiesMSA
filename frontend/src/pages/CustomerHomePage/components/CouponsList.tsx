import React from "react";
import { Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CouponCard from "./CouponCard";
import CouponModal from "./CouponModal";
import RedeemModal from "./RedeemModal";
import SelectLocation from "@/components/SelectLocation";
import coupons from "@/data/Coupons";
import { RootState } from "@/store/store";
import { openCouponModal, openRedeemModal } from "@/store/slices/modalSlice";
import { Coupon } from "@/types";

const CouponsList: React.FC = () => {
  const dispatch = useDispatch();
  const { couponModal, redeemModal } = useSelector(
    (state: RootState) => state.modals,
  );

  const { location, district } = useParams<{
    location?: string;
    district?: string;
  }>();

  const filteredCoupons = coupons.filter((coupon) => {
    let match = true;

    if (location && location !== "All-locations") {
      match = coupon.location.state === location;
    }

    if (match && district && district !== "All-districts") {
      match = coupon.location.district === district;
    }

    return match;
  });

  const handleOpenCouponModal = (coupon: Coupon) => {
    dispatch(openCouponModal(coupon));
  };

  const handleOpenRedeemModal = (coupon: Coupon) => {
    dispatch(openRedeemModal(coupon));
  };

  return (
    <>
      <SelectLocation mode={"navigate"} />
      <Grid
        sx={{ display: "flex", flexDirection: "column", gap: "1rem", mt: 2 }}
      >
        <Grid container spacing={2}>
          {filteredCoupons.length > 0 ? (
            filteredCoupons.map((coupon) => (
              <Grid item key={coupon.id} xs={12} sm={6} md={4}>
                <CouponCard
                  coupon={coupon}
                  onOpenCouponModal={handleOpenCouponModal}
                  onOpenRedeemModal={handleOpenRedeemModal}
                />
              </Grid>
            ))
          ) : (
            <Typography component="p" variant="h6" my={8} mx={6}>
              No coupons are available for your location right now, but stay
              tuned! More exciting deals are on the way just for you.
            </Typography>
          )}
        </Grid>
      </Grid>
      {couponModal.isOpen && couponModal.coupon && (
        <CouponModal coupon={couponModal.coupon} />
      )}
      {redeemModal.isOpen && redeemModal.coupon && (
        <RedeemModal coupon={redeemModal.coupon} />
      )}
    </>
  );
};

export default CouponsList;
