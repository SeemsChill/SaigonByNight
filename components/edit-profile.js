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
import EditForm from "./edit-form";
import { AiFillEdit } from "react-icons/ai";

export default function EditProfileModal() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { colorMode } = useColorMode();

  return (
    <>
      <Button
        bg={colorMode == "light" ? "#202023" : "#f0e7db"}
        _hover={{
          bg: colorMode == "light" ? "#555555" : "#f5f5f5",
          color: colorMode == "light" ? "white" : "black",
        }}
        color={colorMode == "light" ? "#f0e7db" : "#202023"}
        transition="all 300ms ease-in-out"
        ml="0.6rem"
        px="1.5rem"
        py="1rem"
        onClick={onOpen}
      >
        <AiFillEdit />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w={{ base: "20rem", md: "25rem" }} color="#202023">
          <ModalHeader bg="#dcc5a7" borderTopRadius="md" fontSize="3xl">
            Edit your profile?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody bg="#f0e7db" borderBottomRadius="lg">
            <EditForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
