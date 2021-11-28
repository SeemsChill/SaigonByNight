import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  CloseButton,
  FormControl,
  Flex,
  FormErrorMessage,
  FormLabel,
  Input,
  InputLeftElement,
  InputGroup,
  NumberInput,
  NumberInputField,
  Select,
  Textarea,
  useColorMode,
} from "@chakra-ui/react";
import { BiPackage } from "react-icons/bi";
import { FiFile } from "react-icons/fi";
import { RiPriceTag3Line } from "react-icons/ri";
import {
  MdOutlineCreateNewFolder,
  MdOutlineDescription,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { useForm } from "react-hook-form";
import { onCreatingProduct } from "@/libs/engines/productEngine";
import { useAuth } from "@/libs/firebase/auth";
import axios from "axios";
import Cookies from "js-cookie";

const data = [{ id: 1, category: "Food" }];

function FileUpload(props) {
  const { children, multiple, register } = props;
  const inputRef = useRef(null);
  const { ref, ...rest } = register;

  const handleClick = () => inputRef.current?.click();

  return (
    <InputGroup onClick={handleClick}>
      <input
        accept="image/*"
        hidden
        multiple={multiple || false}
        type="file"
        {...rest}
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
      />
      <>{children}</>
    </InputGroup>
  );
}

export default function CreateProductForm() {
  const [message, setMessage] = useState("");

  const { colorMode } = useColorMode();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { signout } = useAuth();
  const router = useRouter();

  async function onCreateProductSubmit({
    productName,
    productCategory,
    productDescription,
    productImage,
    productQuantity,
    productPrice,
  }) {
    const profile = await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/get/user/profile/`, {
        headers: {
          csrftoken: Cookies.get("csrftoken"),
          Authorization: Cookies.get("Authorization"),
        },
      })
      .catch((err) => {
        return err.response;
      });

    if (profile.data.province) {
      const res = await onCreatingProduct(
        productName,
        productCategory,
        productDescription,
        productImage[0],
        productQuantity,
        productPrice
      );

      if (res.status == 202) {
        setMessage("We have created product for you.");
      } else {
        signout();
        router.push("/");
      }
    } else {
      setMessage("Please update your info.");
    }
  }

  function validateFiles(values) {
    if (values.length < 1) {
      return "Image is required.";
    }

    for (let file of Array.from(values)) {
      const fsMb = file.size / (1024 * 1024);
      const MAX_FILE_SIZE = 10;
      if (fsMb > MAX_FILE_SIZE) {
        return "Max file size is 10mb.";
      }
    }

    return true;
  }

  function onCloseAlert() {
    setMessage("");
  }

  return (
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
      <form onSubmit={handleSubmit(onCreateProductSubmit)}>
        <FormControl id="productName" isInvalid={errors.productName} mt={2}>
          <FormLabel fontSize="md" fontWeight="bold">
            {"product's name:"}
          </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <BiPackage />
            </InputLeftElement>
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
                required: "What's your product's name?",
                minLength: {
                  value: 8,
                  message: "Mimimum characters length is 8.",
                },
                maxLength: {
                  value: 40,
                  message: "Maximum characters length is 40.",
                },
              })}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.productName && errors.productName.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          id="productCategory"
          isInvalid={errors.productCategory}
          mt={2}
        >
          <FormLabel fontSize="md" fontWeight="bold">
            category:
          </FormLabel>
          <Select
            bg={colorMode == "light" ? "white" : "#e9e9ea"}
            color={colorMode == "light" ? "#202023" : "#646467"}
            fontWeight="bold"
            letterSpacing="1.2px"
            placeholder="カテゴリー"
            size="lg"
            {...register("productCategory", {
              required: "What's type of this product?",
            })}
          >
            {data.map((input) => (
              <option key={input.id} value={input.category}>
                {input.category}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {errors.productCategory && errors.productCategory.message}
          </FormErrorMessage>
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
                required: "Please describe the product you gonna sell.",
              })}
            />
          </InputGroup>
        </FormControl>
        <FormControl
          id="productImage"
          isInvalid={errors.productImage}
          mt={2}
          isRequired
        >
          <FormLabel fontSize="md" fontWeight="bold">
            image:
          </FormLabel>
          <FileUpload
            multiple
            register={register("productImage", { validate: validateFiles })}
          >
            <Button
              bg="#202023"
              _hover={{ transform: "scale(1.04)" }}
              color="white"
              leftIcon={<FiFile />}
              transition="all 300ms ease-in-out"
            >
              Upload
            </Button>
          </FileUpload>
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
            <NumberInput pl="3rem" w="100%">
              <NumberInputField
                bg={colorMode == "light" ? "white" : "#e9e9ea"}
                _placeholder={{
                  color: "gray.400",
                }}
                placeholder="量"
                {...register("productQuantity", {
                  required: "How many?",
                  pattern: {
                    value: /^\d{0,20}$/,
                    message: "Invalid syntax. (e.g: 3)",
                  },
                })}
              />
            </NumberInput>
          </InputGroup>
          <FormErrorMessage>
            {errors.productQuantity && errors.productQuantity.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="productPrice" isInvalid={errors.productPrice} mt={2}>
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
            Create
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
