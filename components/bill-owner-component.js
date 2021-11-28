import React from "react";
import { Box, Flex, Text, Heading, useColorMode } from "@chakra-ui/react";
import DeliveryModal from "./delivery-modal";

export default function BillOwnerComponent({ bill }) {
  const { colorMode } = useColorMode();

  return (
    <Box
      width={{ base: "20rem", md: "25rem" }}
      p="1rem"
      border={`4px solid ${colorMode == "light" ? "#202023" : "#f0e7db"}`}
      borderRadius="lg"
    >
      <Flex justifyContent="space-between">
        <Flex flexDirection="column">
          <Text>{`client: ${bill.client_name}`}</Text>
          <Heading>{bill.prod_name}</Heading>
        </Flex>
        <Flex flexDirection="column">
          <Box
            bg={bill.status ? "green" : "red"}
            h="1.3rem"
            w="1.3rem"
            border="3px solid white"
            borderRadius="50%"
          />
        </Flex>
      </Flex>

      <Text>{`quantity: ${bill.quantity}`}</Text>
      <Text>{`province: ${bill.province}`}</Text>
      <Text>{`district: ${bill.district}`}</Text>
      <Text>{`ward: ${bill.ward}`}</Text>
      <Text>{`phone number: ${bill.phone_number}`}</Text>
      <Flex mt={3} justifyContent="right">
        <DeliveryModal bill={bill} />
      </Flex>
    </Box>
  );
}
