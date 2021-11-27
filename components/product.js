import React from "react";
import { Box, Flex, Heading, Text, useColorMode } from "@chakra-ui/react";
import EditProductModal from "./edit-product";
import DeleteProductModal from "./delete-product-modal";

export default function Product({ product }) {
  const { colorMode } = useColorMode();

  return (
    <>
      <Box
        bg={colorMode == "light" ? "#18181d" : "white"}
        _hover={{
          transform: "scale(1.04)",
        }}
        borderRadius="md"
        p="0.5rem"
        pl="1rem"
        transition="all 300ms ease-in-out"
      >
        <Flex
          alignItems="center"
          bg={colorMode == "light" ? "white" : "#202023"}
          borderRadius="md"
          justifyContent="space-between"
          p="0.4rem"
        >
          <Heading
            size="md"
            color={colorMode == "light" ? "#18181d" : "#dcc9b0"}
          >
            {product.name}
          </Heading>
          <Box
            bg={product.status_zone}
            border={`4px solid ${colorMode == "light" ? "#18181d" : "#dcc9b0"}`}
            borderRadius="50%"
            h="1rem"
            w="1rem"
          />
        </Flex>
        <Box
          borderRadius="md"
          bg={colorMode == "light" ? "white" : "#202023"}
          mt="1rem"
          p="1rem"
        >
          <Text fontWeight="bold" h="4rem">
            {product.description}
          </Text>
        </Box>
        <Flex flexDirection="column" mt="1rem">
          <Text
            color={colorMode == "light" ? "#dcc9b0" : "#18181d"}
            fontWeight="bold"
            textAlign="right"
          >
            {`quantity: ${product.current_quantity}.`}
          </Text>
          <Text
            color={colorMode == "light" ? "#dcc9b0" : "#18181d"}
            fontWeight="bold"
            textAlign="right"
          >
            {`price: ${product.price}.`}
          </Text>
        </Flex>
        <Flex mt="1rem">
          <EditProductModal product={product} />
          <DeleteProductModal product={product} />
        </Flex>
      </Box>
    </>
  );
}
