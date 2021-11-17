import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Layout from "@/components/layouts/format";
import { fetcherForgot } from "@/libs/engines/fetcher";

const Forgot = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  async function onSubmit(values) {
    console.log(values);
    const res = await fetcherForgot(values.email, values.isChecked);
    if (res == 404) {
      setSuccess("");
      setError("User not found.");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else if (res == 202) {
      setSuccess("");
      setError(
        "This email is using with other credential (google, github, ...)."
      );
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      setError("");
      setSuccess("Email has been sent. Please check it.");
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    }
  }

  return (
    <Layout title="Forgot password">
      <Container
        display="flex"
        maxW="container.lg"
        position="relative"
        pt={"4rem"}
        justifyContent="center"
      >
        <Box as="div" width={{ base: "20em", md: "30em" }} position="relative">
          {success && (
            <Alert
              status="success"
              w={"50%"}
              borderRadius={"40px"}
              position="absolute"
              transform={"translateY(-2rem)"}
              bg={"green"}
              color={"white"}
            >
              <AlertIcon color={"white"} />
              <AlertTitle mr={2}>{success}</AlertTitle>
            </Alert>
          )}
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
          <Heading>Retrieve password</Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl
              id="forgot-password-email"
              isInvalid={errors.email}
              mt={4}
            >
              <FormLabel mt={4}>email:</FormLabel>
              <Input
                w="90%"
                transition="all 300ms ease-in-out"
                _hover={{ transform: "scale(1.1)" }}
                placeholder="君のEメール"
                {...register("email", {
                  required: "This field is required.",
                  pattern: {
                    value: /^[A-Z0-9-_]+@[A-Z0-9]+\.[A-Z]{2,}$/i,
                    message:
                      "Invalid email address (allow only alphabets, numbers, [_, -]).",
                  },
                  minLength: {
                    value: 8,
                    message: "Minimum email characters length is 8.",
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
            <FormControl mt={4} id="isChecked">
              <Heading as="h2" size="md" w="90%">
                With generating secured password?
              </Heading>
              <Checkbox
                mt={4}
                {...register("isChecked", {})}
                size="lg"
                iconColor="black"
              />
            </FormControl>
            <Button
              mt={4}
              bg={useColorModeValue("black", "white")}
              color={useColorModeValue("white", "black")}
              transition="all 400ms ease-in-out"
              type="submit"
              _hover={{ transform: "scale(1.1)" }}
            >
              Submit
            </Button>
          </form>
          <Heading as="h2" size="md" w="90%" mt="6rem">
            (このフォームは、パスワードを取り戻すために使用されます)
          </Heading>
        </Box>
      </Container>
    </Layout>
  );
};

export default Forgot;
