import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coupon } from "@/types";

export interface ModalState {
  couponModal: { isOpen: boolean; coupon?: Coupon };
  redeemModal: { isOpen: boolean; coupon?: Coupon };
  addNewCouponModal: { isOpen: boolean };
}

const initialState: ModalState = {
  couponModal: { isOpen: false },
  redeemModal: { isOpen: false },
  addNewCouponModal: { isOpen: false },
};

const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openCouponModal: (state, action: PayloadAction<Coupon>) => {
      state.couponModal.isOpen = true;
      state.couponModal.coupon = action.payload;
    },
    closeCouponModal: (state) => {
      state.couponModal.isOpen = false;
      state.couponModal.coupon = undefined;
    },
    openRedeemModal: (state, action: PayloadAction<Coupon>) => {
      state.couponModal.isOpen = false;
      state.redeemModal.isOpen = true;
      state.redeemModal.coupon = action.payload;
    },
    closeRedeemModal: (state) => {
      state.redeemModal.isOpen = false;
      state.redeemModal.coupon = undefined;
    },
    openAddNewCouponModal: (state) => {
      state.addNewCouponModal.isOpen = true;
    },
    closeAddNewCouponModal: (state) => {
      state.addNewCouponModal.isOpen = false;
    },
  },
});

export const {
  openCouponModal,
  closeCouponModal,
  openRedeemModal,
  closeRedeemModal,
  openAddNewCouponModal,
  closeAddNewCouponModal,
} = modalSlice.actions;
export default modalSlice.reducer;
