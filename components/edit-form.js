import React, { useState } from "react";
import { useRouter } from "next/router";
import Select from "react-select";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Textarea,
  useColorMode,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { MdBuild } from "react-icons/md";
import useLocation from "@/libs/engines/locationEngine";
import onUpdateInfoSubmit from "@/libs/engines/updateEngine";

export default function EditForm({
  real_name,
  province,
  district,
  ward,
  phoneNumber,
  detailAddress,
}) {
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
  const { colorMode } = useColorMode();

  async function onEditProfileSubmit({ realName, phoneNumber, detailAddress }) {
    const res = await onUpdateInfoSubmit(
      realName,
      phoneNumber,
      selectedProvince ? selectedProvince["label"] : "",
      selectedDistrict ? selectedDistrict["label"] : "",
      selectedWard ? selectedWard["label"] : "",
      detailAddress
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
      <Box
        as="div"
        borderRadius="lg"
        my="1rem"
        p="1rem"
        bg={colorMode == "dark" ? "white" : "#f0e7db"}
      >
        <form onSubmit={handleSubmit(onEditProfileSubmit)}>
          <FormControl id="real-name" isInvalid={errors.realName}>
            <FormLabel fontSize="md" fontWeight="bold">
              real name:
            </FormLabel>
            <Input
              bg={colorMode == "light" ? "white" : "#e9e9ea"}
              color={colorMode == "light" ? "#202023" : "#646467"}
              fontWeight="bold"
              letterSpacing="1.2px"
              placeholder="フルネーム"
              defaultValue={real_name ? real_name : ""}
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
          <FormControl id="phone-number" isInvalid={errors.phoneNumber} mt={2}>
            <FormLabel fontSize="md" fontWeight="bold">
              phone number:
            </FormLabel>
            <InputGroup>
              <InputLeftAddon
                bg={colorMode == "light" ? "#dac19f" : "#a7a7ae"}
                fontWeight="bold"
              >
                +84
              </InputLeftAddon>
              <Input
                bg={colorMode == "light" ? "white" : "#e9e9ea"}
                color={colorMode == "light" ? "#202023" : "#646467"}
                fontWeight="bold"
                letterSpacing="1.2px"
                placeholder="電話番号"
                defaultValue={phoneNumber ? phoneNumber : ""}
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
          <FormControl id="province" mt={2}>
            <FormLabel fontSize="md" fontWeight="bold">
              province/city:
            </FormLabel>
            <Select
              name="provinceId"
              key={`provinceId_${selectedProvince?.value}`}
              isDisabled={provinceOptions.length === 0}
              options={provinceOptions}
              onChange={(option) => onProvinceSelect(option)}
              placeholder={province ? province : "Tỉnh/Thành"}
              defaultValue={selectedProvince}
            />
          </FormControl>
          <FormControl id="district" mt={2}>
            <FormLabel fontSize="md" fontWeight="bold">
              district:
            </FormLabel>
            <Select
              name="districtId"
              key={`districtId_${selectedDistrict?.value}`}
              isDisabled={districtOptions.length === 0}
              options={districtOptions}
              onChange={(option) => onDistrictSelect(option)}
              placeholder={district ? district : "Quận/Huyện"}
              defaultValue={selectedDistrict}
            />
          </FormControl>
          <FormControl id="ward" mt={2}>
            <FormLabel fontSize="md" fontWeight="bold">
              ward:
            </FormLabel>
            <Select
              name="wardId"
              key={`wardId_${selectedWard?.value}`}
              isDisabled={wardOptions.length === 0}
              options={wardOptions}
              placeholder={ward ? ward : "Phường/Xã"}
              onChange={(option) => onWardSelect(option)}
              defaultValue={selectedWard}
            />
          </FormControl>
          <FormControl id="detail-address" mt={2}>
            <FormLabel fontSize="md" fontWeight="bold">
              detail address:
            </FormLabel>
            <Textarea
              bg={colorMode == "light" ? "white" : "#e9e9ea"}
              color={colorMode == "light" ? "#202023" : "#646467"}
              fontWeight="bold"
              letterSpacing="1.2px"
              placeholder="詳細住所"
              defaultValue={detailAddress ? detailAddress : ""}
              {...register("detailAddress", {
                minLength: {
                  value: 8,
                  message: "Minimum characters length is 8",
                },
                maxLength: {
                  value: 40,
                  message: "Maximum characters length is 40",
                },
              })}
            />
            <FormErrorMessage>
              {errors.detailAdress && errors.detailAddress.message}
            </FormErrorMessage>
          </FormControl>
          <Flex justifyContent="right">
            <Button
              bg="#202023"
              _hover={{ transform: "scale(1.04)" }}
              color="white"
              leftIcon={<MdBuild />}
              transition="all 300ms ease-in-out"
              type="submit"
              mt={6}
              size="lg"
            >
              Edit
            </Button>
          </Flex>
        </form>
      </Box>
    </>
  );
}
