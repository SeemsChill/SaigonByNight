import React from "react";
import { Container, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Container
      color="white"
      display="flex"
      maxW="container.lg"
      position="relative"
      pt="2rem"
      justifyContent="center"
    >
      <Spinner size="xl" thickness="4px" speed="0.65s" />
    </Container>
  );
};

export default Loading;
