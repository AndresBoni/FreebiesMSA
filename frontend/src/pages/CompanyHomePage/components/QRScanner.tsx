import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import { Scanner, IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { QrCode } from "@mui/icons-material";

const QRScanner: React.FC = () => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [code, setCode] = useState<string>("");

  const handleScan = (detectedCodes: IDetectedBarcode[]) => {
    if (detectedCodes.length > 0) {
      setCode(detectedCodes[0].rawValue);
      setIsScannerOpen(false);
    }
  };

  const handleManualCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const handleOpenScanner = () => {
    setIsScannerOpen(true);
  };

  const handleCloseScanner = () => {
    setIsScannerOpen(false);
  };

  const handleSubmit = () => {
    // TODO Implement check/validate code
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      maxWidth="sm"
      width="100%"
      gap="1rem"
      p="1rem"
    >
      <Dialog
        open={isScannerOpen}
        onClose={handleCloseScanner}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Escáner QR</DialogTitle>
        <DialogContent
          sx={{
            alignSelf: "center",
            height: "auto",
            maxWidth: "500px",
            overflow: "hidden",
          }}
        >
          <Scanner onScan={handleScan} formats={["qr_code"]} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseScanner} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      <TextField
        label="Customer Coupon Code"
        value={code}
        onChange={handleManualCode}
        fullWidth
        variant="outlined"
        margin="normal"
        placeholder="Scan or type manually"
        focused
      />
      <Box display="flex" gap="1rem">
        <Button
          startIcon={<QrCode />}
          variant="contained"
          color="success"
          onClick={isScannerOpen ? handleCloseScanner : handleOpenScanner}
        >
          {isScannerOpen ? "Close Scanner" : "Scan Coupon"}
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Confirm
        </Button>
      </Box>
      {code && <p>Código escaneado: {code}</p>}
    </Box>
  );
};

export default QRScanner;
