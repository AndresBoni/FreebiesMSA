import React from "react";
import { Grid } from "@mui/material";
import CouponCard from "./CouponCard";
import coupons from "@/data/Coupons";
import CouponModal from "./CouponModal";
import RedeemModal from "./RedeemModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { openCouponModal, openRedeemModal } from "@/store/slices/modalSlice";
import { Coupon } from "@/types";

const CouponsList: React.FC = () => {
  const dispatch = useDispatch();
  const { couponModal, redeemModal } = useSelector(
    (state: RootState) => state.modals,
  );

  const handleOpenCouponModal = (coupon: Coupon) => {
    dispatch(openCouponModal(coupon));
  };

  const handleOpenRedeemModal = (coupon: Coupon) => {
    dispatch(openRedeemModal(coupon));
  };

  return (
    <>
      <Grid sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Grid container spacing={2}>
          {coupons.map((coupon) => (
            <Grid item key={coupon.id} xs={12} sm={6} md={4}>
              <CouponCard
                coupon={coupon}
                onOpenCouponModal={handleOpenCouponModal}
                onOpenRedeemModal={handleOpenRedeemModal}
              />
            </Grid>
          ))}
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
