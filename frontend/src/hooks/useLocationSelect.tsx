import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { NewZealandLocations } from "@/data/NewZealandLocations";

type Mode = "navigate" | "return-values";

type useLocationSelectProps = {
  mode: Mode;
  onRegionChange?: (region: string) => void;
  onDistrictChange?: (district: string) => void;
};

const useLocationSelect = ({
  mode,
  onRegionChange,
  onDistrictChange,
}: useLocationSelectProps) => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");

  useEffect(() => {
    if (mode === "navigate") {
      const encodedRegion = encodeURIComponent(
        selectedRegion.replace(/\s+/g, "-"),
      );
      const encodedDistrict = encodeURIComponent(
        selectedDistrict.replace(/\s+/g, "-"),
      );

      let url = `/${encodedRegion}`;
      if (selectedDistrict && selectedDistrict !== "All-districts") {
        url += `/${encodedDistrict}`;
      }

      navigate(url);
    } else if (mode === "return-values" && onRegionChange && onDistrictChange) {
      onRegionChange(selectedRegion);
      onDistrictChange(selectedDistrict);
    }
  }, [
    selectedRegion,
    selectedDistrict,
    navigate,
    mode,
    onRegionChange,
    onDistrictChange,
  ]);

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);

    const location = NewZealandLocations.find((loc) => loc.region === region);
    if (!location || location.districts.length === 0) {
      setSelectedDistrict("");
    } else {
      setSelectedDistrict("All-districts");
    }
  };

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
  };

  const districts = useMemo(() => {
    if (!selectedRegion) return [];
    const location = NewZealandLocations.find(
      (loc) => loc.region === selectedRegion,
    );
    return location ? location.districts : [];
  }, [selectedRegion]);

  const disableDistrictSelect = useMemo(
    () => districts.length === 0,
    [districts],
  );

  return {
    selectedRegion,
    selectedDistrict,
    handleRegionChange,
    handleDistrictChange,
    districts,
    disableDistrictSelect,
  };
};

export default useLocationSelect;
