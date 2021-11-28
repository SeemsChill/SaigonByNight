import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  CloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  InputLeftElement,
  InputGroup,
  NumberInput,
  NumberInputField,
  Modal,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import {
  MdProductionQuantityLimits,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { useForm } from "react-hook-form";
import { useAuth } from "@/libs/firebase/auth";
import axios from "axios";
import Cookies from "js-cookie";

export default function BuydModal({ product }) {
  const [message, setMessage] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  async function onBuyingProduct({ quantity }) {
    if (!user) {
      router.push("/signin");
    } else {
      const res = await axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/get/user/profile/`, {
          headers: {
            csrftoken: Cookies.get("csrftoken"),
            Authorization: Cookies.get("Authorization"),
          },
        })
        .catch((err) => {
          return err.response;
        });

      if (res.data.province) {
        const buy = await axios
          .post(
            `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/post/buy/product/`,
            {
              clientUid: user.uid,
              ownerUid: product.owner_uid,
              productUid: product.prod_uid,
              quantity: quantity,
            },
            {
              headers: {
                "Content-Type": "application/json",
                csrftoken: Cookies.get("csrftoken"),
                Authorization: Cookies.get("Authorization"),
              },
            }
          )
          .catch((err) => {
            return err.response;
          });
        if (buy.status == 401) {
          router.push("/");
        }

        if (buy.status == 202) {
          setMessage("Purchased successfully.");
        }
      } else {
        router.push(`/user/${res.data.username}`);
      }
    }
  }

  return (
    <>
      <Button colorScheme="yellow" onClick={onOpen} px="1.5rem" py="1rem">
        <MdProductionQuantityLimits />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w={{ base: "20rem", md: "30rem" }}>
          <ModalHeader fontSize={{ base: "xl", md: "3xl" }}>
            {"Buy this product?"}
          </ModalHeader>
          <ModalCloseButton size="lg" top={{ base: "0.9em", md: "1.5em" }} />
          <ModalBody>
            {message && (
              <Alert status="success">
                <AlertIcon />
                <AlertDescription>{message}</AlertDescription>
                <CloseButton position="absolute" right="8px" top="8px" />
              </Alert>
            )}
            <form onSubmit={handleSubmit(onBuyingProduct)}>
              <FormControl id="quantity" isInvalid={errors.quantity}>
                <FormLabel fontSize="md" fontWeight="bold">
                  {"How many:"}
                </FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <MdOutlineProductionQuantityLimits />
                  </InputLeftElement>
                  <NumberInput pl="3rem" w="100%">
                    <NumberInput>
                      <NumberInputField
                        placeholder="quantity..."
                        {...register("quantity", {
                          required: "How many?",
                          pattern: {
                            value: /^\d{0,20}$/,
                            message: "Invalid syntax. (e.g: 3)",
                          },
                          validate: (value) =>
                            value < product.prod_current_quantity ||
                            "given quantity is larger than product's current.",
                        })}
                      />
                    </NumberInput>
                  </NumberInput>
                </InputGroup>
                <FormErrorMessage>
                  {errors.quantity && errors.quantity.message}
                </FormErrorMessage>
              </FormControl>
              <Flex justifyContent="right" mt={4} mb={4}>
                <Button colorScheme="green" type="submit">
                  Buy
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
