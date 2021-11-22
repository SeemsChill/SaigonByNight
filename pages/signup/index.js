import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Layout from "@/components/layouts/format";
import Loading from "@/components/loading";
import { useForm } from "react-hook-form";
import { useAuth } from "@/libs/firebase/auth";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm();
  const { user, isFetching, classicSignUp, error, isSubmit } = useAuth();
  const router = useRouter();
  const { colorMode } = useColorMode();

  const password = useRef({});
  password.current = watch("password", "");

  function onSubmit(values) {
    classicSignUp(values.username, values.email, values.password);
  }

  function handleShow() {
    setShow(!show);
  }

  function handleConfirmShow() {
    setShowConfirmPassword(!showConfirmPassword);
  }

  if (user) {
    router.push("/");
    return <></>;
  }

  return (
    <>
      {isFetching ? (
        <Layout>
          <Loading />
        </Layout>
      ) : (
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
                  w={"90%"}
                  borderRadius={"40px"}
                  bg={"white"}
                  color={"black"}
                  position="absolute"
                  transform={"translateY(-2rem)"}
                >
                  <AlertIcon color={"black"} />
                  <AlertTitle mr={2}>{error}</AlertTitle>
                </Alert>
              )}
              <Heading>Sign up</Heading>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl
                  id="signup-username"
                  isInvalid={errors.username}
                  mt={4}
                >
                  <FormLabel mt={4}>username:</FormLabel>
                  <Input
                    placeholder="君のユーザー名"
                    w="90%"
                    {...register("username", {
                      required: "This is required",
                      pattern: {
                        value: /^[A-Z0-9_]{2,}$/i,
                        message:
                          "Allow only alphabet characters and '_' syntax.",
                      },
                      minLength: {
                        value: 8,
                        message: "Minimum characters should be atleast 8.",
                      },
                      maxLength: {
                        value: 20,
                        message: "Maximum characters should be 20.",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.username && errors.username.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl id="signup-email" isInvalid={errors.email} mt={4}>
                  <FormLabel mt={4}>email:</FormLabel>
                  <Input
                    placeholder="君のEメール"
                    w={"90%"}
                    {...register("email", {
                      required: "This is required",
                      pattern: {
                        value: /^[A-Z0-9_-]+@[A-Z0-9]+\.[A-Z]{2,}$/i,
                        message:
                          "Invalid email (allow only alphabet, number, [_, -]).",
                      },
                      minLength: {
                        value: 8,
                        message: "Mimimum email characters length is 8.",
                      },
                      maxLength: {
                        value: 40,
                        message: "Maximum email characters length is 40.",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  id="signup-password"
                  isInvalid={errors.password}
                  mt={4}
                >
                  <FormLabel mt={4}>password:</FormLabel>
                  <InputGroup size="md">
                    <Input
                      placeholder="君のパスワード"
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      w={"90%"}
                      {...register("password", {
                        required: "You must specify a password.",
                        pattern: {
                          value: /^[A-Z0-9@_]{2,}$/i,
                          message: "Allow only alphabet, number, [@, _].",
                        },
                        minLength: {
                          value: 8,
                          message: "Password must have at least 8 characters.",
                        },
                        maxLength: {
                          value: 40,
                          message: "Maximum password characters length is 40.",
                        },
                      })}
                    />
                    <InputRightElement w={{ base: "7.5rem", md: "9.5rem" }}>
                      <Button h="1.75rem" size="sm" onClick={handleShow}>
                        {show ? <AiFillEye /> : <AiFillEyeInvisible />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.password && errors.password.messsage}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  id="signup-confirm"
                  isInvalid={errors.confirm}
                  mt={4}
                >
                  <FormLabel mt={4}>confirm password:</FormLabel>
                  <InputGroup size="md">
                    <Input
                      placeholder="パスワードを認証する, お願い."
                      pr="4.5rem"
                      type={showConfirmPassword ? "text" : "password"}
                      w={"90%"}
                      {...register("confirm", {
                        required: "You must specify the password again.",
                        pattern: {
                          value: /^[A-Z0-9_-]{2,}$/i,
                          message: "Allow only alphabet, number, [@, _].",
                        },
                        minLength: {
                          value: 8,
                          message: "Password must have at least 8 characters.",
                        },
                        maxLength: {
                          value: 40,
                          message: "Maxmimum password characters length is 40.",
                        },
                        validate: (value) =>
                          value === password.current ||
                          "The passwords do not match.",
                      })}
                    />
                    <InputRightElement w={{ base: "7.5rem", md: "9.5rem" }}>
                      <Button h="1.75rem" size="sm" onClick={handleConfirmShow}>
                        {showConfirmPassword ? (
                          <AiFillEye />
                        ) : (
                          <AiFillEyeInvisible />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.confirm && errors.confirm.message}
                  </FormErrorMessage>
                </FormControl>
                <Button
                  mt={4}
                  isLoading={isSubmit}
                  bg={colorMode == "light" ? "black" : "white"}
                  color={colorMode == "light" ? "white" : "black"}
                  type="submit"
                  transition="all 400ms ease-in-out"
                  _hover={{ transform: "scale(1.1)" }}
                >
                  Submit
                </Button>
              </form>
              <Text mt={8}>
                Already have an account?
                <Link href="/signin">
                  <a
                    style={{
                      color: colorMode == "light" ? "black" : "white",
                      fontWeight: "bold",
                      marginLeft: "0.5rem",
                    }}
                  >
                    sign in here
                  </a>
                </Link>
                !
              </Text>
            </Box>
          </Container>
        </Layout>
      )}
    </>
  );
};

export default SignUp;
