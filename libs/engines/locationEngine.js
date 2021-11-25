import React, { useEffect, useState } from "react";
import { PATHS } from "@/libs/constants/path";

const FETCH_TYPES = {
  PROVINCES: "FETCH_PROVINCES",
  DISTRICTS: "FETCH_DISTRICTS",
  WARDS: "FETCH_WARDS",
};

async function onLocationFetching(fetchTypes, locationId) {
  let url;
  switch (fetchTypes) {
    case FETCH_TYPES.PROVINCES: {
      url = PATHS.PROVINCES;
      break;
    }

    case FETCH_TYPES.DISTRICTS: {
      url = `${PATHS.DISTRICTS}/${locationId}.json`;
      break;
    }

    case FETCH_TYPES.WARD: {
      url = `${PATHS.WARDS}/${locationId}.json`;
      break;
    }

    default: {
      return [];
    }
  }

  const locations = (
    await fetch(url, { method: "GET" }).then((response) => {
      return response.json().then((data) => {
        return data;
      });
    })
  )["data"];
  return locations.map(({ id, name }) => ({ value: id, label: name }));
}

export default function useLocationSelect() {
  const [location, setLocation] = useState({
    provinceOptions: [],
    districtOptions: [],
    wardOptions: [],
    selectedProvince: null,
    selectedDistrict: null,
    selectedWard: null,
  });

  const { selectedProvince, selectedDistrict } = location;

  useEffect(() => {
    (async function () {
      const options = await onLocationFetching(FETCH_TYPES.PROVINCES);
      setLocation({ ...location, provinceOptions: options });
    })();
  }, []);

  useEffect(() => {
    (async function () {
      if (!selectedProvince) return;
      const options = await onLocationFetching(
        FETCH_TYPES.DISTRICTS,
        selectedProvince.value
      );
      setLocation({ ...location, districtOptions: options });
    })();
  }, [selectedProvince]);

  useEffect(() => {
    (async function () {
      if (!selectedDistrict) return;
      const options = await onLocationFetching(
        FETCH_TYPES.WARD,
        selectedDistrict.value
      );
      setLocation({ ...location, wardOptions: options });
    })();
  }, [selectedDistrict]);

  function onProvinceSelect(option) {
    if (option !== selectedProvince) {
      setLocation({
        ...location,
        selectedProvince: option,
      });
    }
  }

  function onDistrictSelect(option) {
    if (option !== selectedDistrict) {
      setLocation({
        ...location,
        selectedDistrict: option,
      });
    }
  }

  function onWardSelect(option) {
    setLocation({
      ...location,
      selectedWard: option,
    });
  }

  return {
    location,
    onProvinceSelect,
    onDistrictSelect,
    onWardSelect,
  };
}
