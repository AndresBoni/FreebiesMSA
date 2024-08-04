import React, { useState, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GiftIcon from "@mui/icons-material/CardGiftcardOutlined";
import { Campaign } from "@/types";
import noCouponImage from "@/assets/nocouponimage.svg";

interface Props {
  campaign: Campaign;
  onOpenCouponModal?: (campaign: Campaign) => void;
  onOpenRedeemModal?: (campaign: Campaign) => void;
}

const formatLocation = (state: string, district: string) => {
  if (state && district) {
    return `${state}, ${district}`;
  }
  return state || district;
};

const CouponCard: React.FC<Props> = ({
  campaign,
  onOpenCouponModal,
  onOpenRedeemModal,
}) => {
  const [couponImage, setCouponImage] = useState(
    campaign.coupon.image || noCouponImage,
  );
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = useCallback(() => {
    setExpanded((prevExpanded) => !prevExpanded);
  }, []);

  const handleImageError = useCallback(() => {
    setCouponImage(noCouponImage);
  }, []);

  const handleOpenCouponModal = useCallback(() => {
    if (onOpenCouponModal) {
      onOpenCouponModal(campaign);
    }
  }, [campaign, onOpenCouponModal]);

  const handleOpenRedeemModal = useCallback(() => {
    if (onOpenRedeemModal) {
      onOpenRedeemModal(campaign);
    }
  }, [campaign, onOpenRedeemModal]);

  return (
    <Card sx={{ width: "100%", minHeight: 390, cursor: "pointer" }}>
      <CardHeader
        onClick={handleOpenCouponModal}
        titleTypographyProps={{ variant: "h6", fontWeight: "bold" }}
        title={campaign.coupon.title}
        subheader={
          <Typography variant="body2">
            {formatLocation(campaign.state, campaign.district)}
          </Typography>
        }
      />
      <CardMedia
        component="img"
        height="194"
        image={couponImage}
        onError={handleImageError}
        alt={campaign.coupon.title}
        onClick={handleOpenCouponModal}
        sx={{ cursor: "pointer" }}
      />
      <CardContent onClick={handleOpenCouponModal} sx={{ cursor: "pointer" }}>
        <Typography variant="body2" color="text.secondary">
          {campaign.coupon.shortDescription}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="redeem"
          onClick={handleOpenRedeemModal}
          sx={{ p: 1 }}
          color="primary"
        >
          <GiftIcon />
          <Typography variant="body2" sx={{ ml: 1 }}>
            Redeem
          </Typography>
        </IconButton>
        <IconButton
          aria-expanded={expanded}
          onClick={handleExpandClick}
          aria-label="show more"
          sx={{ ml: "auto" }}
        >
          <ExpandMoreIcon />
          <Typography variant="subtitle2" sx={{ ml: 1 }}>
            Conditions
          </Typography>
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{campaign.coupon.conditions}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default CouponCard;
