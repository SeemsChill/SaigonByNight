import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  CloseButton,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  FormLabel,
  Text,
  useClipboard,
  useColorMode,
} from "@chakra-ui/react";
import {
  AiFillCopy,
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineCopy,
} from "react-icons/ai";
import { useForm } from "react-hook-form";
import Layout from "@/components/layouts/format";
import Loading from "@/components/loading";
import { onResetSubmit, onResetVerifySubmit } from "@/libs/engines/resetEngine";

export async function getServerSideProps(context) {
  const { code } = context.query;

  const res = await onResetVerifySubmit(code);

  return { props: { code, res } };
}

const Verify = ({ code, res }) => {
  const [afterFetching, setFetching] = useState(false);
  const [getResponse, setGetResponse] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");

  const { hasCopied, onCopy } = useClipboard(value);
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm();
  const { colorMode } = useColorMode();
  const router = useRouter();

  const password = useRef({});
  password.current = watch("password", "");

  async function resetPassword(values) {
    setLoading(true);

    const res = await onResetSubmit(code, values.password);

    if (res.status == 202) {
      setMessage(
        `Password has been reset, ${res.data.name}. Automatically return to login page.`
      );

      setTimeout(() => {
        router.push("/signin");
      }, 3000);
    } else if (res.status == 410) {
      router.push("/signin");
    } else {
      router.push("/signin");
    }

    setLoading(false);
  }

  function handleShow(e) {
    e.preventDefault();

    setShow(!show);
  }

  function onCloseAlert(e) {
    e.preventDefault();

    setMessage("");
  }

  if (res && !getResponse) {
    setGetResponse(true);

    if (res.password) {
      setValue(res.password);
    }
  }

  useEffect(() => {
    if (getResponse) {
      if (res.code == 401) {
        router.push("/");
      }

      setFetching(true);
    }
  }, [getResponse]);

  return (
    <>
      {afterFetching && res.code != 401 ? (
        <Layout title="Verify page">
          <Center
            display="flex"
            h="70vh"
            justifyContent="center"
            maxW="container.lg"
            pt="2rem"
          >
            <Box
              as="div"
              display="flex"
              flexDirection="column"
              mt={{ base: "2.4em", md: "0em" }}
              p="2rem"
            >
              {res.status == "reject" ? (
                <Alert
                  alignItems="center"
                  borderRadius="10px"
                  flexDirection="column"
                  h={{ base: "250px", med: "220px" }}
                  justifyContent="center"
                  status="warning"
                  textAlign="center"
                  variant="subtle"
                >
                  <AlertIcon boxSize="40px" mr={0} />
                  <AlertTitle mt={4} mb={1} fontSize="lg">
                    This token has already been expired.
                  </AlertTitle>
                  <AlertDescription maxWidth="sm">
                    Password was reset or this token has already been expired or
                    verified.
                  </AlertDescription>
                  <Text fontWeight="bold" mt={4}>
                    (パスワードはすでにリセットされています)
                  </Text>
                </Alert>
              ) : (
                <>
                  {message && (
                    <Alert
                      alignItems="center"
                      borderRadius="10px"
                      flexDirection="column"
                      h={{ base: "11em", md: "9.375em" }}
                      justifyContent="center"
                      mt={{ base: "12.76em", md: "4em" }}
                      status="success"
                      textAlign="center"
                      variant="subtle"
                    >
                      <AlertIcon boxSize="40px" mr={0} />
                      <AlertTitle fontSize="lg" mb={1} mt={4}>
                        Password is reset.
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
                    border={
                      res.status == "reject"
                        ? ""
                        : `10px solid ${
                            colorMode == "light" ? "black" : "white"
                          }`
                    }
                    borderRadius="10px"
                    mt="1rem"
                    p="2rem"
                  >
                    <Heading>Reset password.</Heading>
                    {value && (
                      <>
                        <Text fontWeight="bold" mt="1em">
                          Generated password:
                        </Text>
                        <Text fontSize="14px">(生成たパスワード)</Text>
                        <Flex mt="0.6em">
                          <Input
                            value={value}
                            isReadOnly
                            placeholder="Secured password."
                          />
                          <Button onClick={onCopy} ml={2}>
                            {hasCopied ? <AiFillCopy /> : <AiOutlineCopy />}
                          </Button>
                        </Flex>
                      </>
                    )}
                    <form onSubmit={handleSubmit(resetPassword)}>
                      <FormControl
                        id="new-password-input"
                        isInvalid={errors.password}
                        mt={4}
                      >
                        <FormLabel mt={4}>New password:</FormLabel>
                        <InputGroup>
                          <Input
                            placeholder="新しいパスワード"
                            pr="3.5rem"
                            type={show ? "text" : "password"}
                            {...register("password", {
                              required: "Please modify your password.",
                              pattern: {
                                value: /^[A-Z0-9@_]{2,}$/i,
                                message: "Invalid syntax password.",
                              },
                              minLength: {
                                value: 8,
                                message:
                                  "Mimimum password characters length is 8.",
                              },
                              maxLength: {
                                value: 40,
                                message:
                                  "Maximum password characters length is 40.",
                              },
                            })}
                          />
                          <InputRightElement w="3.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleShow}>
                              {show ? <AiFillEye /> : <AiFillEyeInvisible />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {errors.password && errors.password.message}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl
                        id="confirm-new-password-input"
                        isInvalid={errors.confirmPassword}
                        mt={4}
                      >
                        <FormLabel mt={4}>Confirm new password:</FormLabel>
                        <InputGroup>
                          <Input
                            placeholder="新しいパスワードを再入力"
                            pr="3.5rem"
                            type={show ? "text" : "password"}
                            {...register("confirmPassword", {
                              required: "Please modify your password again.",
                              pattern: {
                                value: /^[A-Z0-9@_]{2,}$/i,
                                message: "Invalid syntax password.",
                              },
                              minLength: {
                                value: 8,
                                message:
                                  "Minimum password characters length is 8.",
                              },
                              maxLength: {
                                value: 40,
                                message:
                                  "Maximum password characters length is 40.",
                              },
                              validate: (value) =>
                                value === password.current ||
                                "The passwords do not match",
                            })}
                          />
                          <InputRightElement w="3.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleShow}>
                              {show ? <AiFillEye /> : <AiFillEyeInvisible />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {errors.confirmPassword &&
                            errors.confirmPassword.message}
                        </FormErrorMessage>
                      </FormControl>
                      <Button
                        bg={colorMode == "light" ? "black" : "white"}
                        _hover={{ transform: "scale(1.1)" }}
                        color={colorMode == "light" ? "white" : "black"}
                        isLoading={loading}
                        mt={4}
                        transition="all 400ms ease-in-out"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </form>
                  </Box>
                </>
              )}
            </Box>
          </Center>
        </Layout>
      ) : (
        <Layout title="Verify page">
          <Center
            display="flex"
            h="70vh"
            justifyContent="center"
            maxW="container.lg"
            pt="2rem"
          >
            <Loading />
          </Center>
        </Layout>
      )}
    </>
  );
};

export default Verify;
