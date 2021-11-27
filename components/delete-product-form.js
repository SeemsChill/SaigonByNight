import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Alert,
  AlertIcon,
  AlertDescription,
  Box,
  Button,
  CloseButton,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useColorMode,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { onDeletingProduct } from "@/libs/engines/productEngine";
import { useAuth } from "@/libs/firebase/auth";

export default function DeleteProductForm({ product }) {
  const [message, setMessage] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { colorMode } = useColorMode();
  const { signout } = useAuth();
  const router = useRouter();

  async function onDeleteProduct() {
    const res = await onDeletingProduct(product.uid);

    if (res.status == 202) {
      setMessage("We deleted your product.");
    } else {
      signout();
      router.push("/");
    }
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
      <form onSubmit={handleSubmit(onDeleteProduct)}>
        <FormControl id="inputConfirm" isInvalid={errors.inputConfirm} mt={2}>
          <FormLabel fontSize="sm" fontWeight="bold">
            {`Please type ${product.uid} to confirm.`}
          </FormLabel>
          <Input
            bg={colorMode == "light" ? "white" : "#e9e9ea"}
            _placeholder={{
              color: "gray.400",
            }}
            color={colorMode == "light" ? "#202023" : "#646467"}
            fontSize="sm"
            fontWeight="bold"
            letterSpacing="1.2px"
            placeholder="type exactly like above."
            {...register("inputConfirm", {
              required: "This field is required",
              maxLength: {
                value: product.uid.length,
                message: "You overpass the character length.",
              },
              minLength: {
                value: 8,
                message: "Minimum characters length is 8.",
              },
              validate: (value) =>
                value === product.uid || "The confirm text do not match.",
            })}
          />
          <FormErrorMessage>
            {errors.inputConfirm && errors.inputConfirm.message}
          </FormErrorMessage>
        </FormControl>
        <Flex justifyContent="right">
          <Button
            bg="#202023"
            _hover={{ transform: "scale(1.04)" }}
            color="white"
            transition="all 300ms ease-in-out"
            type="submit"
            mt={2}
            size="lg"
          >
            delete this.
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
