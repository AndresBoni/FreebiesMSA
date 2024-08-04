import React, { useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AddNewCouponContent from "./AddNewCouponContent";
import { closeAddNewCouponModal } from "@/store/slices/modalSlice";
import { RootState } from "@/store/store";

const AddNewCouponModal: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector(
    (state: RootState) => state.modals.addNewCouponModal,
  );

  const handleCloseAddNewCouponModal = useCallback(() => {
    dispatch(closeAddNewCouponModal());
  }, [dispatch]);

  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseAddNewCouponModal}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle>Add New Coupon</DialogTitle>
      <DialogContent>
        <AddNewCouponContent />
      </DialogContent>
      <DialogActions sx={{ alignSelf: "center", m: "1rem", gap: ".5rem" }}>
        <Button variant="contained" color="success">
          Create
        </Button>
        <Button onClick={handleCloseAddNewCouponModal}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewCouponModal;
