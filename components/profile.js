import React from "react";
import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { ImProfile } from "react-icons/im";
import { useAuth } from "@/libs/firebase/auth";

export default function ProfileModal() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { colorMode } = useColorMode();
  const { user } = useAuth();

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
        px="1.5rem"
        py="1rem"
        onClick={onOpen}
      >
        <ImProfile />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w={{ base: "20rem", md: "25rem" }} color="#202023">
          <ModalHeader bg="#dcc5a7" borderTopRadius="md" fontSize="3xl">
            {"Here's your profile"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody bg="#f0e7db">
            <Heading as="h3" color="" mt="0.2rem" size="lg">
              {user.name}
            </Heading>{" "}
            <Heading as="h4" bg="#dcc5a7" borderRadius="md" mt="1rem" size="md">
              {user.email}
            </Heading>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
