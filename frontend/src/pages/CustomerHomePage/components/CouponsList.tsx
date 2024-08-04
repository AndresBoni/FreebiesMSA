import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CouponCard from "@/components/CouponCard";
import CouponModal from "./CouponModal";
import RedeemModal from "./RedeemModal";
import SelectLocation from "@/components/SelectLocation";
import { RootState } from "@/store/store";
import { openCouponModal, openRedeemModal } from "@/store/slices/modalSlice";
import { Campaign } from "@/types";
import api from "@/config/axiosConfig";

const CouponsList: React.FC = () => {
  const dispatch = useDispatch();
  const { couponModal, redeemModal } = useSelector(
    (state: RootState) => state.modals,
  );

  const { location, district } = useParams<{
    location?: string;
    district?: string;
  }>();

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await api.get("/api/campaign");
        const campaigns = await response.data;

        setCampaigns(campaigns);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const filteredCampaigns = campaigns.filter((campaign) => {
    let match = true;

    if (location && location !== "All-New-Zealand") {
      match = campaign.state === location;
    }

    if (match && district && district !== "All-districts") {
      match = campaign.district === district;
    }

    return match;
  });

  const handleOpenCouponModal = (campaign: Campaign) => {
    dispatch(openCouponModal(campaign));
  };

  const handleOpenRedeemModal = (campaign: Campaign) => {
    dispatch(openRedeemModal(campaign));
  };

  if (loading) {
    return (
      <Typography component="p" variant="h6" my={8} mx={6}>
        Loading...
      </Typography>
    );
  }

  return (
    <>
      <SelectLocation mode={"navigate"} />
      <Grid
        sx={{ display: "flex", flexDirection: "column", gap: "1rem", mt: 2 }}
      >
        <Grid container spacing={2}>
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((campaign) => (
              <Grid item key={campaign.campaignId} xs={12} sm={6} md={4}>
                <CouponCard
                  campaign={campaign}
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
      {couponModal.isOpen && couponModal.campaign && (
        <CouponModal campaign={couponModal.campaign} />
      )}
      {redeemModal.isOpen && redeemModal.campaign && (
        <RedeemModal campaign={redeemModal.campaign} />
      )}
    </>
  );
};

export default CouponsList;
