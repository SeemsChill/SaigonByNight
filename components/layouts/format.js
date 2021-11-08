import React from "react";
import { Container } from "@chakra-ui/react";
import Navbar from "../navbar";
import Toggle from "../toggle";

const Format = ({ children, type }) => {
  const href = type == "home" ? type : "signin";
  console.log(href);

  return (
    <>
      <Container maxW="container.lg" pt={14}>
        {children}
      </Container>
    </>
  );
};

export default Format;
