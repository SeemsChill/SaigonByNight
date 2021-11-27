import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import DeleteProductForm from "./delete-product-form";

export default function DeleteProductModal({ product }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { colorMode } = useColorMode();

  return (
    <>
      <Button
        colorScheme="red"
        ml="0.6rem"
        px="1.5rem"
        py="1rem"
        onClick={onOpen}
      >
        <AiOutlineDelete />
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
            {"Delete your product"}
          </ModalHeader>
          <ModalCloseButton
            color={colorMode == "ligth" ? "#202023" : "#f0e7db"}
            top={{ base: "0.9em", md: "1.5em" }}
            size="lg"
          />
          <ModalBody
            bg={colorMode == "dark" ? "#202023" : "white"}
            border="4px solid #f0e7db"
            borderBottomRadius="lg"
          >
            <DeleteProductForm product={product} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
