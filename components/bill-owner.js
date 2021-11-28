import React from "react";
import { Box, Grid } from "@chakra-ui/react";
import BillOwnerComponent from "./bill-owner-component";

export default function BillOwner({ bills }) {
  const bills_list = [];

  for (let key in bills) {
    bills_list.push(bills[key]);
  }

  return (
    <Box mt={3}>
      <Grid gap={6} templateColumns="repeat(1,1fr)">
        {bills_list.map(function (bill, i) {
          return <BillOwnerComponent key={i} bill={bill} />;
        })}
      </Grid>
    </Box>
  );
}
