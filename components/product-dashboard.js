import React from "react";
import { Box, Center, Grid, Text, useColorMode } from "@chakra-ui/react";
import Product from "@/components/product";

export default function ProductDashboard({ products }) {
  const { colorMode } = useColorMode();
  const productObjects = [];

  for (let key in products) {
    productObjects.push(products[key]);
  }

  return (
    <>
      <Box
        as="div"
        border={`4px solid ${colorMode == "light" ? "#18181d" : "#dcc9b0"}`}
        borderRadius="5px"
        h="30rem"
        ml={{ base: "0rem", md: "2rem" }}
        mt={{ base: "2rem", md: "0rem" }}
        p="1.5rem"
        w="100%"
      >
        {JSON.stringify(products) === "{}" ? (
          <Center h="25rem" w="100%">
            <Text>Nothing in here yet.</Text>
          </Center>
        ) : (
          <Grid
            gap={6}
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
          >
            {productObjects.map(function (product, i) {
              return <Product key={i} product={product} />;
            })}
          </Grid>
        )}
      </Box>
    </>
  );
}
