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

export default function EditProfileModal({
  real_name,
  province,
  district,
  ward,
  phoneNumber,
  detailAddress,
}) {
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
        <ModalContent w={{ base: "20rem", md: "30rem" }} color="#202023">
          <ModalHeader
            bg={colorMode == "dark" ? "#202023" : "white"}
            border="4px solid #f0e7db"
            borderTopRadius="md"
            color={colorMode == "dark" ? "#f0e7db" : "#202023"}
            fontSize={{ base: "xl", md: "3xl" }}
          >
            {"Edit your profile ?"}
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
            <EditForm
              real_name={real_name}
              province={province}
              district={district}
              ward={ward}
              phoneNumber={phoneNumber}
              detailAddress={detailAddress}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
