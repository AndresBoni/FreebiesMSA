import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Campaign } from "@/types";

export interface ModalState {
  couponModal: { isOpen: boolean; campaign?: Campaign };
  redeemModal: { isOpen: boolean; campaign?: Campaign };
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
    openCouponModal: (state, action: PayloadAction<Campaign>) => {
      state.couponModal.isOpen = true;
      state.couponModal.campaign = action.payload;
    },
    closeCouponModal: (state) => {
      state.couponModal.isOpen = false;
      state.couponModal.campaign = undefined;
    },
    openRedeemModal: (state, action: PayloadAction<Campaign>) => {
      state.couponModal.isOpen = false;
      state.redeemModal.isOpen = true;
      state.redeemModal.campaign = action.payload;
    },
    closeRedeemModal: (state) => {
      state.redeemModal.isOpen = false;
      state.redeemModal.campaign = undefined;
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
