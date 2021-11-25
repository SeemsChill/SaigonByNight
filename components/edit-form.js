import React, { useState } from "react";
import { useRouter } from "next/router";
import Select from "react-select";
import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { MdBuild } from "react-icons/md";
import useLocation from "@/libs/engines/locationEngine";
import onUpdateInfoSubmit from "@/libs/engines/updateEngine";

export default function EditForm() {
  const [message, setMessage] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { location, onProvinceSelect, onDistrictSelect, onWardSelect } =
    useLocation();
  const {
    provinceOptions,
    districtOptions,
    wardOptions,
    selectedProvince,
    selectedDistrict,
    selectedWard,
  } = location;
  const router = useRouter();

  async function onEditProfileSubmit({ realName, phoneNumber }) {
    const res = await onUpdateInfoSubmit(
      realName,
      phoneNumber,
      selectedProvince["label"],
      selectedDistrict["label"],
      selectedWard["label"]
    );

    if (res.status == 202) {
      setMessage("Update profile successfully.");
    } else {
      router.push("/");
    }
  }

  return (
    <>
      {message && (
        <Alert status="success">
          <AlertIcon />
          {message}
        </Alert>
      )}
      <form onSubmit={handleSubmit(onEditProfileSubmit)}>
        <FormControl id="real-name" isInvalid={errors.realName}>
          <FormLabel fontSize="xl" fontWeight="bold" mt={4}>
            real name:
          </FormLabel>
          <Input
            bg="#dcc5a7"
            fontWeight="bold"
            {...register("realName", {
              required: "This field is required.",
              minLength: {
                value: 8,
                message: "Minimum characters length is 20.",
              },
              maxLength: {
                value: 100,
                message: "Maximum characters length is 100.",
              },
            })}
          />
          <FormErrorMessage>
            {errors.realName && errors.realName.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="phone-number" isInvalid={errors.phoneNumber} mt={4}>
          <FormLabel fontSize="xl" fontWeight="bold" mt={4}>
            phone number:
          </FormLabel>
          <InputGroup>
            <InputLeftAddon fontWeight="bold">+84</InputLeftAddon>
            <Input
              bg="#dcc5a7"
              fontWeight="bold"
              {...register("phoneNumber", {
                required: "This field is required.",
                pattern: {
                  value: /^(7|8|9)\d{8}$/,
                  message: "Invalid format: e.g: +84 865322389",
                },
              })}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.phoneNumber && errors.phoneNumber.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="province" mt={4}>
          <FormLabel fontSize="xl" fontWeight="bold" mt={4}>
            province/city:
          </FormLabel>
          <Select
            name="provinceId"
            key={`provinceId_${selectedProvince?.value}`}
            isDisabled={provinceOptions.length === 0}
            options={provinceOptions}
            onChange={(option) => onProvinceSelect(option)}
            placeholder="Tỉnh/Thành"
            defaultValue={selectedProvince}
          />
        </FormControl>
        <FormControl id="district" mt={4}>
          <FormLabel fontSize="xl" fontWeight="bold" mt={4}>
            district:
          </FormLabel>
          <Select
            name="districtId"
            key={`districtId_${selectedDistrict?.value}`}
            isDisabled={districtOptions.length === 0}
            options={districtOptions}
            onChange={(option) => onDistrictSelect(option)}
            placeholder="Quận/Huyện"
            defaultValue={selectedDistrict}
          />
        </FormControl>
        <FormControl id="ward" mt={4}>
          <FormLabel fontSize="xl" fontWeight="bold" mt={4}>
            ward:
          </FormLabel>
          <Select
            name="wardId"
            key={`wardId_${selectedWard?.value}`}
            isDisabled={wardOptions.length === 0}
            options={wardOptions}
            placeholder="Phường/Xã"
            onChange={(option) => onWardSelect(option)}
            defaultValue={selectedWard}
          />
        </FormControl>
        <Flex justifyContent="right">
          <Button
            bg="#202023"
            color="white"
            leftIcon={<MdBuild />}
            type="submit"
            mt={6}
            size="lg"
          >
            Edit
          </Button>
        </Flex>
      </form>
    </>
  );
}
