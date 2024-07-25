import React, { useState, useCallback, useEffect } from "react";
import {
  DialogContentText,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogContent,
  Grid,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { Coupon } from "@/types";
import SelectLocation from "@/components/SelectLocation";

interface AddNewCouponFormProps {
  setCouponPreview: (coupon: Coupon) => void;
}

const AddNewCouponForm: React.FC<AddNewCouponFormProps> = ({
  setCouponPreview,
}) => {
  const [coupon, setCoupon] = useState<Coupon>({
    id: 0,
    title: "",
    store: "",
    imageUrl: "",
    shortDescription: "",
    conditions: "",
    location: { state: "", district: "" },
    status: "active",
    targetCustomer: "all",
    redeemed: 0,
    available: 0,
    inProgress: 0,
  });

  useEffect(() => {
    setCouponPreview(coupon);
  }, [coupon, setCouponPreview]);

  const handleTextChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setCoupon((prevCoupon) => ({
        ...prevCoupon,
        [name]: value,
      }));
    },
    [],
  );

  const handleTargetCustomerChange = useCallback(
    (event: SelectChangeEvent<"new" | "returning" | "all">) => {
      setCoupon((prevCoupon) => ({
        ...prevCoupon,
        targetCustomer: event.target.value as "new" | "returning" | "all",
      }));
    },
    [],
  );

  const handleRegionChange = useCallback((region: string) => {
    setCoupon((prevCoupon) => ({
      ...prevCoupon,
      location: {
        ...prevCoupon.location,
        state: region,
      },
    }));
  }, []);

  const handleDistrictChange = useCallback((district: string) => {
    setCoupon((prevCoupon) => ({
      ...prevCoupon,
      location: {
        ...prevCoupon.location,
        district: district,
      },
    }));
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DialogContent>
          <DialogContentText>
            Please enter the details for the new coupon:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="Title"
            fullWidth
            value={coupon.title}
            onChange={handleTextChange}
          />
          <TextField
            margin="dense"
            id="imageUrl"
            name="imageUrl"
            label="Image URL"
            fullWidth
            value={coupon.imageUrl}
            onChange={handleTextChange}
          />
          <TextField
            margin="dense"
            id="shortDescription"
            name="shortDescription"
            label="Short Description"
            fullWidth
            multiline
            rows={4}
            value={coupon.shortDescription}
            onChange={handleTextChange}
          />
          <TextField
            margin="dense"
            id="conditions"
            name="conditions"
            label="Conditions"
            fullWidth
            multiline
            rows={4}
            value={coupon.conditions}
            onChange={handleTextChange}
          />
          <SelectLocation
            mode="return-values"
            onRegionChange={handleRegionChange}
            onDistrictChange={handleDistrictChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="customer-label">Target Customer</InputLabel>
            <Select
              labelId="customer-label"
              id="customer"
              name="targetCustomer"
              value={coupon.targetCustomer}
              onChange={handleTargetCustomerChange}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="new">New</MenuItem>
              <MenuItem value="returning">Returning</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
      </Grid>
    </Grid>
  );
};

export default AddNewCouponForm;
