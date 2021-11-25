import React from "react";
import { Box, Flex, Heading, Text, useColorMode } from "@chakra-ui/react";

export default function Product({ product }) {
  const { colorMode } = useColorMode();

  return (
    <>
      <Box
        bg={colorMode == "light" ? "#18181d" : "#dcc9b0"}
        _hover={{
          transform: "scale(1.04)",
        }}
        borderRadius="md"
        p="0.5rem"
        pl="1rem"
        transition="all 300ms ease-in-out"
      >
        <Heading color={colorMode == "light" ? "#dcc9b0" : "#18181d"}>
          {product.name}
        </Heading>
        <Flex alignItems="center" justifyContent="right" mt="1rem">
          <Box
            bg={product.status_zone}
            border={`4px solid ${colorMode == "light" ? "#dcc9b0" : "#18181d"}`}
            borderRadius="50%"
            h="1rem"
            w="1rem"
          />
          <Text
            color={colorMode == "light" ? "#dcc9b0" : "#18181d"}
            fontWeight="bold"
            mx="1rem"
          >
            {`quantity: ${product.current_quantity}`}
          </Text>
        </Flex>
      </Box>
    </>
  );
}
