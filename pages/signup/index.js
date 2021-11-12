import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Form,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import Layout from "@/components/layouts/format";
import { useForm } from "react-hook-form";
import { useAuth } from "@/libs/firebase/auth";
import Cookies from "js-cookie";

const SignUp = () => {
  const [error, setError] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { classicSignUp } = useAuth();

  function onSubmit(values) {
    if (values.password == values.repassword) {
      classicSignUp(values.username, values.email, values.password);
    } else {
      setError("Passwords do not match.");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }

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
          {error && (
            <Alert
              status="error"
              borderRadius="5px"
              w="90%"
              transition="all 400ms ease-in-out"
            >
              <AlertIcon />
              {error}
            </Alert>
          )}
          <Heading>Sign up</Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl
              isInvalid={
                errors.username ||
                errors.email ||
                errors.password ||
                errors.repassword
              }
              id="signup-form"
              mt={4}
            >
              <FormLabel mt={4}>username:</FormLabel>
              <Input
                id="username"
                type="text"
                placeholder="password"
                w="90%"
                transition="all 400ms ease-in-out"
                _hover={{ transform: "scale(1.1)" }}
                {...register("username", {
                  required: "This field is required.",
                  minLength: {
                    value: 4,
                    message: "Minimum length should be 4.",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.username && errors.username.message}
              </FormErrorMessage>
              <FormLabel mt={4}>email:</FormLabel>
              <Input
                id="email"
                placeholder="email"
                w="90%"
                transition="all 400ms ease-in-out"
                _hover={{ transform: "scale(1.1)" }}
                {...register("email", {
                  required: "Required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
              <FormLabel mt={4}>password:</FormLabel>
              <Input
                id="password"
                placeholder="password"
                w="90%"
                type="password"
                transition="all 400ms ease-in-out"
                _hover={{ transform: "scale(1.1)" }}
                {...register("password", {
                  required: "This field is required.",
                  minLength: {
                    value: 4,
                    message: "Minimum length should be 4.",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
              <FormLabel mt={4}>re-enter password:</FormLabel>
              <Input
                id="re-password"
                type="password"
                placeholder="re-enter password"
                w="90%"
                transition="all 400ms ease-in-out"
                _hover={{ transform: "scale(1.1)" }}
                {...register("repassword", {
                  required: "This field is required.",
                  minLength: {
                    value: 4,
                    message: "Minimum length should be 4.",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.repassword && errors.repassword.message}
              </FormErrorMessage>
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
              signin here
            </a>
            !
          </Text>
          <HStack mt={8}>
            <Button
              bg={useColorModeValue("white", "#e73827")}
              leftIcon={<FaGoogle />}
            >
              Sign with Google
            </Button>
            <Button
              bg={useColorModeValue("white", "black")}
              leftIcon={<FaGithub />}
            >
              Sign with Github
            </Button>
          </HStack>
        </Box>
      </Container>
    </Layout>
  );
};

export default SignUp;
