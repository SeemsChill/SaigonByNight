import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Form,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import Layout from "@/components/layouts/format";

const SignUp = () => {
  return (
    <Layout title={"Sign up"}>
    <Container
      display="flex"
      maxW="container.lg"
      position="relative"
      pt="2rem"
      justifyContent="center"
    >
      <Box
        as="div"
        width={{ base: "20em", md: "30em", lg: "30em" }}
        height="32em"
        position={{ base: "", md: "absolute", lg: "absolute" }}
        css={{ backdropFilter: "blur(10px)" }}
        zIndex={1}
        transform={{ base: "", md: "", lg: "translateX(-9em)" }}
        borderRadius="10px"
      >
        <Heading>Sign up</Heading>
        <form>
          <FormControl id="signin-form" mt={4}>
            <FormLabel mt={4}>username:</FormLabel>
            <Input
              id="username"
              type="text"
              placeholder="password"
              w="90%"
              transition="all 400ms ease-in-out"
              _hover={{ transform: "scale(1.1)" }}
            />
            <FormLabel mt={4}>email:</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="email"
              w="90%"
              transition="all 400ms ease-in-out"
              _hover={{ transform: "scale(1.1)" }}
            />
            <FormLabel mt={4}>password:</FormLabel>
            <Input
              id="password"
              placeholder="password"
              w="90%"
              type="password"
              transition="all 400ms ease-in-out"
              _hover={{ transform: "scale(1.1)" }}
            />
            <FormLabel mt={4}>re-enter password:</FormLabel>
            <Input
              id="re-password"
              type="password"
              placeholder="re-enter password"
              w="90%"
              transition="all 400ms ease-in-out"
              _hover={{ transform: "scale(1.1)" }}
            />
          </FormControl>
          <Button
            mt={4}
            colorScheme="teal"
            color="white"
            type="submit"
            transition="all 300ms ease-in-out"
            _hover={{ transform: "scale(1.1)" }}
          >
            Submit
          </Button>
        </form>
        <Text mt={8}>
          Already have an account?
          <a
            href="/signup"
            style={{ color: "teal", fontWeight: "bold", marginLeft: "4px" }}
          >
            signin here!
          </a>
        </Text>
        <HStack mt={8}>
          <Button bg="#e73827" leftIcon={<FaGoogle />}>
            Sign with Google
          </Button>
          <Button bg="black" leftIcon={<FaGithub />}>
            Sign with Github
          </Button>
        </HStack>
      </Box>
    </Container>
    </Layout>
  );
};

export default SignUp;
