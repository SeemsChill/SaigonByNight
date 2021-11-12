import React from "react";
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
import SignInMotion from "@/components/motions/signin-isometric";
import Layout from "@/components/layouts/format";
import { useForm } from "react-hook-form";
import { useAuth } from "@/libs/firebase/auth";

const SignIn = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  function onSubmit(values) {
    setActive(true);
    signIn(values.email, values.password);
  }

  return (
    <Layout title="Sign in">
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
          <Heading>Sign in</Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl id="signin-email" isInvalid={errors.email} mt={4}>
              <FormLabel mt={4}>email:</FormLabel>
              <Input w="90%" transition="all 400ms ease-in-out" _hover={{transform: "scale(1.1)"}}  placeholder="君のEメール" {...register("email", {
                required: "Required",
                pattern: {
                  value: /^[A-Z0-9]+@[A-Z0-9]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address."
                },
                minLength: {
                  value: 8,
                  message: "Minimum length must atleast be 8."
                }
              })}/>
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl> 
            <FormControl id="signin-password" isInvalid={errors.password} mt={4}>
              <FormLabel mt={4}>password:</FormLabel>
              <Input w="90%" transition="all 400ms ease-in-out" _hover={{transform: "scale(1.1)"}} placeholder="君のパスワード" {...register("password", {
                required: "Required",
                pattern: {
                  value: /^[A-Z0-9]{2,}$/i,
                  message: "Invalid password key syntaxs."
                },
                minLength: {
                  value: 8,
                  message: "Mimimum length must atleast be 8."
                }
              })}/>
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              mt={4}
              colorScheme="teal"
              color="white"
              type="submit"
            >
              Submit
            </Button>
          </form>
          <Text mt={8}>
            Still not have account?
            <a
              href="/signup"
              style={{ color: "teal", fontWeight: "bold", marginLeft: "4px" }}
            >
              signup here
            </a>
            !
          </Text>
          <Text mt={4}>
            Forgot{" "}
            <a
              href="/forgot"
              style={{ color: "teal", fontWeight: "bold", marginLeft: "4px" }}
            >
              password
            </a>
            ?
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
        <Box
          as="div"
          transform="translateX(14rem)"
          display={{ base: "none", md: "inline-block" }}
        >
          <SignInMotion />
        </Box>
      </Container>
    </Layout>
  );
};

export default SignIn;
