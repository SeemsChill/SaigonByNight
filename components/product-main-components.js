import React from "react";
import { Box, Flex, Heading, Text, useColorMode } from "@chakra-ui/react";
import BuyModal from "./buy-modal";
import { useAuth } from "@/libs/firebase/auth";

export default function ProductComponent({ product }) {
  const { colorMode } = useColorMode();
  const { user } = useAuth();

  return (
    <Box
      p="2rem"
      border={`3px solid ${colorMode == "light" ? "#202023" : "#f0e7db"}`}
      borderRadius="lg"
    >
      <Flex justifyContent="space-between" w={{ base: "15rem", md: "30rem" }}>
        <Flex flexDirection="column">
          <Text>{product.username}</Text>
          <Heading>{product.prod_name}</Heading>
        </Flex>
        <Flex flexDirection="column">
          <Box
            bg={product.prod_status_zone}
            border={`4px solid ${colorMode == "light" ? "#202023" : "#f0e7db"}`}
            borderRadius="50%"
            h={{ base: "1.5rem", md: "2rem" }}
            w={{ base: "1.5rem", md: "2rem" }}
          />
        </Flex>
      </Flex>
      <Text my="1rem">{`description: ${product.prod_description}`}</Text>
      <Flex justifyContent="space-between" mt={2}>
        <Box>
          <Text fontSize="lg" fontWeight="bold">
            contact info:
          </Text>
          <Box pl="1rem">
            <Text>{product.province}</Text>
            <Text>{product.district}</Text>
            <Text>{product.ward}</Text>
            <Text>{product.phone_number}</Text>
          </Box>
        </Box>
        <Box>
          <Text fontSize="lg" fontWeight="bold">
            product info:
          </Text>
          <Box pl="1rem">
            <Text>{`quantity: ${product.prod_current_quantity}`}</Text>
            <Text>{`price: ${product.prod_price} VND`}</Text>
          </Box>
        </Box>
      </Flex>
      <Flex justifyContent="right">
        {user ? (
          <>
            {user.uid == product.owner_uid ? (
              <></>
            ) : (
              <BuyModal product={product} />
            )}
          </>
        ) : (
          <BuyModal product={product} />
        )}
      </Flex>
    </Box>
  );
}
