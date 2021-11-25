import React from "react";
import Image from "next/image";
import { Box, Flex, Heading, useColorMode } from "@chakra-ui/react";
import ProfileModal from "@/components/profile";
import EditProfileModal from "@/components/edit-profile";
import CreateProductModal from "@/components/create-product-modal";

export default function ProfileDashboard({ name, url }) {
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
      <Box
        border={`5px solid ${colorMode == "light" ? "#18181d" : "#dcc9b0"}`}
        h={200}
        w={200}
      >
        <Image
          priority
          alt={`${name} avatar`}
          src={url}
          width={200}
          height={200}
        />
      </Box>
      <Heading
        mt="2rem"
        pb="1rem"
        borderBottom={`4px solid ${
          colorMode == "light" ? "#18181d" : "#dcc9b0"
        }`}
        textAlign="center"
      >
        {name}
      </Heading>
      <Flex mt="1rem" justifyContent="center">
        <ProfileModal />
        <EditProfileModal />
        <CreateProductModal />
      </Flex>
    </Box>
  );
}
