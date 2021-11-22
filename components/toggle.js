import React from "react";
import NextLink from "next/link";
import { Button } from "@chakra-ui/react";

const Toggle = ({ children, style, href }) => {
  return (
    <NextLink href={`/${href}`}>
      <Button
        my="0"
        mx="0.5rem"
        bg={style.background}
        border="4px"
        borderColor={style.background}
        color={style.color}
        size="md"
        _hover={{ transform: "scale(1.1)" }}
        transition="all 200ms ease-in-out"
      >
        {children}
      </Button>
    </NextLink>
  );
};

export default Toggle;
