import React, { useEffect, useState, useCallback } from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddNewCouponModal from "./AddNewCoupon/AddNewCouponModal";
import { openAddNewCouponModal } from "@/store/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Campaign } from "@/types";
import api from "@/config/axiosConfig";
import { useNavigate } from "react-router-dom";
import { logout } from "@/store/slices/userSlice";

const getStatusChip = (status: "active" | "paused") => {
  const color = status === "active" ? "#a8e6cf" : "#ff8b94";
  return (
    <Chip
      label={status.charAt(0).toUpperCase() + status.slice(1)}
      sx={{ backgroundColor: color, color: "white" }}
    />
  );
};

// const getCustomerChip = (targetCustomer: "new" | "returning" | "all") => {
//   const colorMap = {
//     new: "#ffecb3",
//     returning: "#b3e5fc",
//     all: "#c5cae9",
//   };
//   return (
//     <Chip
//       label={targetCustomer.charAt(0).toUpperCase() + targetCustomer.slice(1)}
//       sx={{ backgroundColor: colorMap[targetCustomer], color: "black" }}
//     />
//   );
// };

const MyCampaigns: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addNewCouponModal } = useSelector((state: RootState) => state.modals);
  const { user } = useSelector((state: RootState) => state.user);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) {
      dispatch(logout());
      navigate("/login");
      return;
    }

    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        const response = await api.get("/api/campaign");
        const userCampaigns = response.data.filter(
          (campaign: Campaign) => campaign.userId === user.id,
        );
        setCampaigns(userCampaigns);
      } catch (error) {
        setError("An error occurred while fetching campaigns.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [user?.id, dispatch, navigate]);

  const handleOpenAddNewCouponModal = useCallback(() => {
    dispatch(openAddNewCouponModal());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {campaigns.length > 0 ? (
            campaigns.map((campaign) => (
              <TableRow key={campaign.campaignId}>
                <TableCell align="center">{campaign.coupon.title}</TableCell>
                <TableCell align="center">
                  {getStatusChip(
                    campaign.totalCoupons > 0 ? "active" : "paused",
                  )}
                </TableCell>
                <TableCell align="center">{campaign.redeemedCoupons}</TableCell>
                <TableCell align="center">{campaign.totalCoupons}</TableCell>
                <TableCell align="center">
                  {campaign.inProgressCoupons}
                </TableCell>
                {/* <TableCell align="center">
                  {getCustomerChip(campaign.targetCustomer)}
                </TableCell> */}
                <TableCell align="center">
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="view">
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">
                No campaigns available yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7} align="center">
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenAddNewCouponModal}
              >
                Add New Campaign
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      {addNewCouponModal.isOpen && <AddNewCouponModal />}
    </TableContainer>
  );
};

export default MyCampaigns;
