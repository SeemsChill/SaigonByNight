import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  CloseButton,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Textarea,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineEdit } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { BiPackage } from "react-icons/bi";
import {
  MdOutlineCreateNewFolder,
  MdOutlineDescription,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { RiPriceTag3Line } from "react-icons/ri";
import { onUpdatingProduct } from "@/libs/engines/productEngine";
import { useAuth } from "@/libs/firebase/auth";

export default function EditProductModal({ product }) {
  const [message, setMessage] = useState("");

  const { isOpen, onClose, onOpen } = useDisclosure();
  const { colorMode } = useColorMode();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { signout } = useAuth();
  const router = useRouter();

  async function onEditProductSubmit({
    productName,
    productDescription,
    productQuantity,
    productPrice,
  }) {
    const res = await onUpdatingProduct(
      productName,
      productDescription,
      productQuantity,
      productPrice,
      product.uid
    );
    if (res.status == 202) {
      setMessage("Product has been updated.");
    } else {
      signout();
      router.push("/");
    }
  }

  function onCloseAlert() {
    setMessage("");
  }

  return (
    <>
      <Button
        bg={colorMode == "light" ? "#f0e7db" : "#202023"}
        _hover={{
          bg: colorMode == "light" ? "#f5f5f5" : "#555555",
          color: colorMode == "light" ? "black" : "white",
        }}
        color={colorMode == "light" ? "#f0e7db" : "#202023"}
        transition="all 300ms ease-in-out"
        px="1.5rem"
        py="1rem"
        onClick={onOpen}
      >
        <AiOutlineEdit color={colorMode == "light" ? "#202023" : "#f0e7db"} />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent color="#202023" w={{ base: "20rem", md: "30rem" }}>
          <ModalHeader
            bg={colorMode == "dark" ? "#202023" : "white"}
            border="4px solid #f0e7db"
            borderTopRadius="md"
            color={colorMode == "dark" ? "#f0e7db" : "#202023"}
            fontSize={{ base: "xl", md: "3xl" }}
          >
            {"Edit your product?"}
          </ModalHeader>
          <ModalCloseButton
            color={colorMode == "light" ? "#202023" : "#f0e7db"}
            top={{ base: "0.9em", md: "1.5em" }}
            size="lg"
          />
          <ModalBody
            bg={colorMode == "dark" ? "#202023" : "white"}
            border="4px solid #f0e7db"
            borderBottomRadius="lg"
          >
            <Box
              as="div"
              borderRadius="lg"
              my="1rem"
              p="1rem"
              bg={colorMode == "dark" ? "white" : "#f0e7db"}
            >
              {message && (
                <Alert status="success">
                  <AlertIcon />
                  <AlertDescription>{message}</AlertDescription>
                  <CloseButton
                    position="absolute"
                    right="8px"
                    top="8px"
                    onClick={onCloseAlert}
                  />
                </Alert>
              )}
              <form onSubmit={handleSubmit(onEditProductSubmit)}>
                <FormControl
                  id="productName"
                  isInvalid={errors.productName}
                  mt={2}
                >
                  <FormLabel fontSize="md" fontWeight="bold">
                    {"product's name:"}
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <BiPackage />
                    </InputLeftElement>
                  </InputGroup>
                  <Input
                    bg={colorMode == "light" ? "white" : "#e9e9ea"}
                    color={colorMode == "light" ? "#202023" : "#646467"}
                    fontWeight="bold"
                    letterSpacing="1.2px"
                    pl="3em"
                    placeholder="君の製品名"
                    _placeholder={{
                      color: "gray.400",
                    }}
                    {...register("productName", {
                      required: "What's your product name.",
                      minLength: {
                        value: 8,
                        message: "Minimum characters length is 8.",
                      },
                      maxLength: {
                        value: 40,
                        message: "Maximum characters length is 40.",
                      },
                    })}
                  />
                </FormControl>
                <FormControl
                  id="productDescription"
                  isInvalid={errors.productDescription}
                  mt={2}
                >
                  <FormLabel fontSize="md" fontWeight="bold">
                    description:
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <MdOutlineDescription />
                    </InputLeftElement>
                    <Textarea
                      bg={colorMode == "light" ? "white" : "#e9e9ea"}
                      _placeholder={{
                        color: "gray.400",
                      }}
                      color={colorMode == "light" ? "#202023" : "#646467"}
                      fontWeight="bold"
                      letterSpacing="1.2px"
                      pl="3em"
                      placeholder="製品の説明"
                      {...register("productDescription", {
                        required: "Please describe the product you're selling.",
                      })}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl
                  id="productQuantity"
                  isInvalid={errors.productQuantity}
                  mt={2}
                >
                  <FormLabel fontSize="md" fontWeight="bold">
                    quantity:
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      bg="white"
                      borderBottomRadius="md"
                      borderTopRadius="md"
                      pointerEvents="none"
                    >
                      <MdOutlineProductionQuantityLimits />
                    </InputLeftElement>
                  </InputGroup>
                  <NumberInput pl="3rem" w="100%">
                    <NumberInputField
                      bg={colorMode == "light" ? "white" : "#e9e9ea"}
                      _placeholder={{
                        color: "gray.400",
                      }}
                      placeholder="価格"
                      {...register("productQuantity", {
                        required: "How many?",
                        pattern: {
                          value: /^\d{0,20}$/,
                          message: "Invalid syntax. (e.g: 3)",
                        },
                      })}
                    />
                  </NumberInput>
                </FormControl>
                <FormControl
                  id="productPrice"
                  isInvalid={errors.productPrice}
                  mt={2}
                >
                  <FormLabel fontSize="md" fontWeight="bold">
                    price:
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      bg="white"
                      borderBottomRadius="md"
                      borderTopRadius="md"
                      pointerEvents="none"
                    >
                      <RiPriceTag3Line />
                    </InputLeftElement>
                    <NumberInput pl="3rem" w="100%">
                      <NumberInputField
                        bg={colorMode == "light" ? "white" : "#e9e9ea"}
                        _placeholder={{
                          color: "gray.400",
                        }}
                        placeholder="価格"
                        {...register("productPrice", {
                          required: "How much is this?",
                          pattern: {
                            value: /^\d{0,20}$/,
                            message: "Invalid price format. (e.g: 20000)",
                          },
                        })}
                      />
                    </NumberInput>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.productPrice && errors.productPrice.message}
                  </FormErrorMessage>
                </FormControl>
                <Flex justifyContent="right">
                  <Button
                    bg="#202023"
                    _hover={{ transform: "scale(1.04)" }}
                    color="white"
                    leftIcon={<MdOutlineCreateNewFolder />}
                    transition="all 300ms ease-in-out"
                    type="submit"
                    mt={6}
                    size="lg"
                  >
                    Edit
                  </Button>
                </Flex>
              </form>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
