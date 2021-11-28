import React from "react";
import { Box, Grid } from "@chakra-ui/react";
import ProductComponent from "@/components/product-main-components";

export default function MainPageProduct({ res }) {
  let products = [];

  for (let key in res) {
    products.push(res[key]);
  }

  return (
    <Box as="div" p="1.5rem">
      <Grid gap={4} templateColumns="repeat(1,1fr)">
        {products.map(function (product, i) {
          return <ProductComponent key={i} product={product} />;
        })}
      </Grid>
    </Box>
  );
}
