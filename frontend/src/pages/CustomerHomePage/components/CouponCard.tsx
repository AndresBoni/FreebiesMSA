import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import GiftIcon from "@mui/icons-material/CardGiftcardOutlined";
import { Coupon } from "@/types";
import noCouponImage from "@/assets/nocouponimage.svg";
interface Props {
  coupon: Coupon;
  onOpenCouponModal: (coupon: Coupon) => void;
  onOpenRedeemModal: (coupon: Coupon) => void;
}

const CouponCard: React.FC<Props> = ({
  coupon,
  onOpenCouponModal,
  onOpenRedeemModal,
}) => {
  const [couponImage, setCouponImage] = React.useState(
    coupon.imageUrl || noCouponImage,
  );
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const handleImageError = () => {
    setCouponImage(noCouponImage);
  };

  return (
    <Card sx={{ width: "100%", cursor: "pointer" }}>
      <CardHeader
        onClick={() => onOpenCouponModal(coupon)}
        titleTypographyProps={{ variant: "h6", fontWeight: "bold" }}
        title={coupon.title}
        subheader={
          <Typography variant="body2">
            {`${coupon.location.state}, ${coupon.location.district}`}
          </Typography>
        }
      />
      <CardMedia
        component="img"
        height="194"
        image={couponImage}
        onError={handleImageError}
        alt={coupon.title}
        onClick={() => onOpenCouponModal(coupon)}
        style={{ cursor: "pointer" }}
      />
      <CardContent
        onClick={() => onOpenCouponModal(coupon)}
        style={{ cursor: "pointer" }}
      >
        <Typography variant="body2" color="text.secondary">
          {coupon.shortDescription}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="redeem"
          onClick={() => onOpenRedeemModal(coupon)}
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
          <Typography paragraph>{coupon.conditions}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default CouponCard;
