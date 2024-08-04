import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Typography,
} from "@mui/material";
import useLocationSelect from "@/hooks/useLocationSelect";
import { NewZealandLocations } from "@/data/NewZealandLocations";

const ALL_DISTRICTS = "All-districts";

interface BaseSelectLocationProps {
  mode: "navigate" | "return-values";
}

interface ReturnValuesProps extends BaseSelectLocationProps {
  mode: "return-values";
  onRegionChange: (region: string) => void;
  onDistrictChange: (district: string) => void;
}

interface NavigateModeProps extends BaseSelectLocationProps {
  mode: "navigate";
  onRegionChange?: never;
  onDistrictChange?: never;
}

type SelectLocationProps = ReturnValuesProps | NavigateModeProps;

const SelectLocation: React.FC<SelectLocationProps> = ({
  mode,
  onRegionChange,
  onDistrictChange,
}) => {
  const {
    selectedRegion,
    selectedDistrict,
    handleRegionChange,
    handleDistrictChange,
    districts,
    disableDistrictSelect,
  } = useLocationSelect({ mode, onRegionChange, onDistrictChange });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Location</Typography>
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <FormControl fullWidth>
          <InputLabel id="region-label">Region</InputLabel>
          <Select
            labelId="region-label"
            id="region-select"
            value={selectedRegion}
            onChange={(e) => handleRegionChange(e.target.value as string)}
            label="Region"
            fullWidth
            variant="outlined"
          >
            {NewZealandLocations.map((location) => (
              <MenuItem key={location.region} value={location.region}>
                {location.region}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6} sm={4} md={3}>
        <FormControl fullWidth>
          <InputLabel id="district-label">District</InputLabel>
          <Select
            labelId="district-label"
            id="district-select"
            value={selectedDistrict}
            onChange={(e) => handleDistrictChange(e.target.value as string)}
            label="District"
            fullWidth
            variant="outlined"
            disabled={disableDistrictSelect}
          >
            <MenuItem value={ALL_DISTRICTS}>All districts</MenuItem>
            {districts.map((district) => (
              <MenuItem key={district} value={district}>
                {district}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default SelectLocation;
