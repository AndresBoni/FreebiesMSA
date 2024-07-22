import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import QRCode from "qrcode.react";
import { Coupon } from "@/types";
import { closeRedeemModal } from "@/store/slices/modalSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

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
  coupon: Coupon;
}

const RedeemModal: React.FC<Props> = ({ coupon }) => {
  const [qrCode, setQRCode] = useState<string>("");
  const [expiryTime, setExpiryTime] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(900);

  const dispatch = useDispatch();

  const { redeemModal } = useSelector((state: RootState) => state.modals);

  useEffect(() => {
    if (redeemModal.isOpen && coupon) {
      //TODO implement real QR code
      const randomQRCode = Math.random().toString(36).substring(7);
      setQRCode(randomQRCode);

      const expiry = new Date();
      expiry.setMinutes(expiry.getMinutes() + 15);
      setExpiryTime(expiry);

      setTimeLeft(900);
    }
  }, [redeemModal.isOpen, coupon]);

  useEffect(() => {
    if (!redeemModal.isOpen || !expiryTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const difference = Math.floor(
        (expiryTime.getTime() - now.getTime()) / 1000,
      );
      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
      } else {
        setTimeLeft(difference);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [redeemModal.isOpen, expiryTime]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <Modal
      open={redeemModal.isOpen}
      onClose={() => dispatch(closeRedeemModal())}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, alignItems: "center", p: 2 }}>
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          pb={2}
          fontWeight="bold"
        >
          {coupon.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <QRCode value={qrCode} size={200} />
          <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
            QR Code: {qrCode}
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          Expires in: {formatTime(timeLeft)}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          Location: {coupon.location.state}, {coupon.location.district}
        </Typography>
      </Box>
    </Modal>
  );
};

export default RedeemModal;
