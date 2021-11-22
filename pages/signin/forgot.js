import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  Checkbox,
  CloseButton,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Layout from "@/components/layouts/format";
import { onResetRequestSubmit } from "@/libs/engines/resetEngine";

const Forgot = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [statusCode, setStatusCode] = useState(0);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  async function onResetRequest({ email, isChecked }) {
    setLoading(true);

    const res = await onResetRequestSubmit(email, isChecked);

    setStatusCode(res.status);

    if (res.status == 201) {
      setMessage(
        "If the account existed, we've sent password reset instruction linked with the account."
      );
    } else if (res.status == 202) {
      setMessage(
        "The email links with this account is created with other platform."
      );
    } else if (res.status == 401) {
      router.push("/signin");
    } else if (res.status == 404) {
      setMessage(
        "Email address is either invalid or still not associated with any personal account."
      );
    }

    setLoading(false);
  }

  function onCloseAlert(e) {
    e.preventDefault();

    setMessage("");
    setStatusCode(0);
  }

  return (
    <Layout title="Forgot password">
      <Center display="flex" h="70vh" justifyContent="center" pt="3rem">
        <Box as="div" p="2rem" w="container.sm">
          {message && statusCode && (
            <Alert
              alignItems="center"
              borderRadius="10px"
              flexDirection="column"
              h={{ base: "11em", md: "9.375em" }}
              justifyContent="center"
              mt={{ base: "10em", md: "0em" }}
              status={statusCode == 201 ? "success" : "warning"}
              textAlign="center"
              variant="subtle"
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle fontSize="lg" mb={1} mt={4}>
                {statusCode == 404
                  ? "Email not found."
                  : statusCode == 201
                  ? "Email has been sent."
                  : ""}
              </AlertTitle>
              <AlertDescription maxW="sm">{message}</AlertDescription>
              <CloseButton
                position="absolute"
                right="4.6875em"
                top="1.4em"
                onClick={onCloseAlert}
              />
            </Alert>
          )}
          <Box
            as="div"
            border={`10px solid ${useColorModeValue("black", "white")}`}
            borderRadius="10px"
            mt="1rem"
            p="1rem"
          >
            <Heading>Retrieve password</Heading>
            <form onSubmit={handleSubmit(onResetRequest)}>
              <FormControl
                id="forgot-password-email"
                isInvalid={errors.email}
                mt={4}
              >
                <FormLabel mt={4}>email:</FormLabel>
                <Input
                  placeholder="君のEメール"
                  {...register("email", {
                    required: "This field is required.",
                    pattern: {
                      value: /^[A-Z0-9-_]+@[A-Z0-9]+\.[A-Z]{2,4}$/,
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
                <Box
                  as="div"
                  display={{ base: "block", md: "flex" }}
                  alignItems="center"
                >
                  <Heading as="h2" mr="1rem" size="sm">
                    With generating secured password?
                  </Heading>
                  <Checkbox
                    bg={useColorModeValue("black", "white")}
                    mt={{ base: 4, md: 0 }}
                    {...register("isChecked", {})}
                    size="lg"
                    iconColor="black"
                  />
                </Box>
              </FormControl>
              <Button
                bg={useColorModeValue("black", "white")}
                _hover={{ transform: "scale(1.1)" }}
                color={useColorModeValue("white", "black")}
                isLoading={loading}
                mt={4}
                transition="all 400ms ease-in-out"
                type="submit"
              >
                Submit
              </Button>
            </form>
            <Heading as="h2" mt="1rem" size="md">
              (このフォームは、パスワードを取り戻すために使用されます)
            </Heading>
          </Box>
        </Box>
      </Center>
    </Layout>
  );
};

export default Forgot;
