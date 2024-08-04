import React, { useState, useCallback } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import { useDispatch, useSelector } from "react-redux";
import { closeCouponModal, openRedeemModal } from "@/store/slices/modalSlice";
import { RootState } from "@/store/store";
import { Campaign } from "@/types";
import noCouponImage from "@/assets/nocouponimage.svg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

interface Props {
  campaign: Campaign;
}

const CouponModal: React.FC<Props> = ({ campaign }) => {
  const dispatch = useDispatch();
  const { couponModal } = useSelector((state: RootState) => state.modals);
  const { isOpen } = couponModal;

  const [couponImage, setCouponImage] = useState(
    campaign.coupon.image || noCouponImage,
  );

  const handleImageError = useCallback(() => {
    setCouponImage(noCouponImage);
  }, []);

  if (!campaign) return null;

  return (
    <Modal
      open={isOpen}
      onClose={() => dispatch(closeCouponModal())}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, p: 2 }}>
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          pb={2}
          fontWeight="bold"
        >
          {campaign.coupon.title}
        </Typography>
        <CardMedia
          component="img"
          height="194"
          image={couponImage}
          onError={handleImageError}
          alt={campaign.coupon.title}
          style={{ width: "100%", objectFit: "cover", marginBottom: 2 }}
        />
        <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
          {campaign.coupon.shortDescription}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ fontWeight: "bold" }}
        >
          Conditions
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {campaign.coupon.conditions}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          Location: {campaign.state}, {campaign.district}
        </Typography>
        <IconButton
          onClick={() => dispatch(openRedeemModal(campaign))}
          sx={{ mt: 2, p: 1 }}
          color="primary"
        >
          <CardGiftcardOutlinedIcon />
          <Typography variant="body2" sx={{ ml: 1 }}>
            Redeem
          </Typography>
        </IconButton>
      </Box>
    </Modal>
  );
};

export default CouponModal;
