import React from "react";
import { Box, Flex, Text, Heading, useColorMode } from "@chakra-ui/react";

export default function BillClientComponent({ bill }) {
  const { colorMode } = useColorMode();

  return (
    <Box
      width={{ base: "20rem", md: "24rem" }}
      p="1rem"
      border={`4px solid ${colorMode == "light" ? "#202023" : "#f0e7db"}`}
      borderRadius="lg"
    >
      <Flex justifyContent="space-between">
        <Flex flexDirection="column">
          <Text>{bill.owner_name}</Text>
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
    </Box>
  );
}
