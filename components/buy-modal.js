import React from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import { MdProductionQuantityLimits } from "react-icons/md";

export default function BuydModal() {
  const { onOpen } = useDisclosure();

  return (
    <>
      <Button colorScheme="yellow" onClick={onOpen} px="1.5rem" py="1rem">
        <MdProductionQuantityLimits />
      </Button>
    </>
  );
}
