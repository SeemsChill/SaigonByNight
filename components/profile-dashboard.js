import React from "react";
import Image from "next/image";
import { Box, Flex, Heading, useColorMode } from "@chakra-ui/react";
import ProfileModal from "@/components/profile";
import EditProfileModal from "@/components/edit-profile";
import CreateProductModal from "@/components/create-product-modal";

export default function ProfileDashboard({
  username,
  email,
  real_name,
  province,
  district,
  ward,
  url,
  phoneNumber,
  detailAddress,
}) {
  const { colorMode } = useColorMode();

  return (
    <Box
      as="div"
      border={`4px solid ${colorMode == "light" ? "#18181d" : "#dcc9b0"}`}
      borderRadius="5px"
      display="flex"
      flexDirection="column"
      h="30rem"
      w="20rem"
      p="2rem"
    >
      <Box as="div" display="flex" justifyContent="center" w="100%">
        <Box
          border={`5px solid ${colorMode == "light" ? "#18181d" : "#dcc9b0"}`}
          borderRadius="50%"
          overflow="hidden"
          h={200}
          w={200}
        >
          <Image
            priority
            alt={`${username || "anonymouse"} avatar`}
            src={url || "https://avatars.githubusercontent.com/u/80795501?v=4"}
            width={200}
            height={200}
          />
        </Box>
      </Box>
      <Heading
        mt="2rem"
        pb="1rem"
        borderBottom={`4px solid ${
          colorMode == "light" ? "#18181d" : "#dcc9b0"
        }`}
        textAlign="center"
      >
        {username || "Anonymous"}
      </Heading>
      <Flex mt="1rem" justifyContent="center">
        <ProfileModal
          username={username || "Anonymous"}
          email={email}
          real_name={real_name}
          province={province}
          district={district}
          ward={ward}
          phoneNumber={phoneNumber}
          detailAddress={detailAddress}
        />
        <EditProfileModal
          real_name={real_name}
          province={province}
          district={district}
          ward={ward}
          phoneNumber={phoneNumber}
          detailAddress={detailAddress}
        />
        <CreateProductModal />
      </Flex>
    </Box>
  );
}
