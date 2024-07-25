import React, { useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  TableFooter,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PauseIcon from "@mui/icons-material/Pause";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddNewCouponModal from "./AddNewCoupon/AddNewCouponModal";
import coupons from "@/data/Coupons";
import { openAddNewCouponModal } from "@/store/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

const getStatusChip = (status: "active" | "paused") => {
  const color = status === "active" ? "#a8e6cf" : "#ff8b94";
  return (
    <Chip
      label={status.charAt(0).toUpperCase() + status.slice(1)}
      sx={{ backgroundColor: color, color: "white" }}
    />
  );
};

const getCustomerChip = (targetCustomer: "new" | "returning" | "all") => {
  const colorMap = {
    new: "#ffecb3",
    returning: "#b3e5fc",
    all: "#c5cae9",
  };
  return (
    <Chip
      label={targetCustomer.charAt(0).toUpperCase() + targetCustomer.slice(1)}
      sx={{ backgroundColor: colorMap[targetCustomer], color: "black" }}
    />
  );
};

const MyCoupons: React.FC = () => {
  const dispatch = useDispatch();
  const { addNewCouponModal } = useSelector((state: RootState) => state.modals);

  const handleOpenAddNewCouponModal = useCallback(() => {
    dispatch(openAddNewCouponModal());
  }, [dispatch]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Redeemed</TableCell>
            <TableCell align="center">Available</TableCell>
            <TableCell align="center">In Progress</TableCell>
            <TableCell align="center">Customer Type</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coupons.map((coupon) => (
            <TableRow key={coupon.id}>
              <TableCell align="center">{coupon.title}</TableCell>
              <TableCell align="center">
                {getStatusChip(coupon.status)}
              </TableCell>
              <TableCell align="center">{coupon.redeemed}</TableCell>
              <TableCell align="center">{coupon.available}</TableCell>
              <TableCell align="center">{coupon.inProgress}</TableCell>
              <TableCell align="center">
                {getCustomerChip(coupon.targetCustomer)}
              </TableCell>
              {/* TODO Implement actions */}
              <TableCell align="center">
                <IconButton aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="view">
                  <VisibilityIcon />
                </IconButton>
                <IconButton aria-label="pause">
                  <PauseIcon />
                </IconButton>
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7} align="center">
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenAddNewCouponModal}
              >
                Add New Coupon
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      {addNewCouponModal.isOpen && <AddNewCouponModal />}
    </TableContainer>
  );
};

export default MyCoupons;
