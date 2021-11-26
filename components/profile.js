import React from "react";
import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { ImProfile } from "react-icons/im";

export default function ProfileModal({
  username,
  email,
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
        px="1.5rem"
        py="1rem"
        onClick={onOpen}
      >
        <ImProfile />
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
            {"Here's your profile"}
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
            <Heading
              as="h3"
              color={colorMode == "dark" ? "white" : "#202023"}
              mt="0.2rem"
              size="lg"
            >
              {username}
            </Heading>
            <Box
              as="div"
              borderRadius="lg"
              my="1rem"
              p="1rem"
              bg={colorMode == "dark" ? "white" : "#f0e7db"}
            >
              <Text color="#202023" fontWeight="bold">
                email:
              </Text>
              <Text color="#202023" fontWeight="bold" pl="1em">
                {email}
              </Text>
              <Text color="#202023" fontWeight="bold" mt="0.5em">
                full name:
              </Text>
              {real_name ? (
                <Text color="#202023" fontWeight="bold" pl="1em">
                  {real_name}
                </Text>
              ) : (
                <Text
                  color="#f0e7db"
                  bg={colorMode == "light" ? "white" : "#646467"}
                  borderRadius="md"
                  fontStyle="italic"
                  pl="1em"
                >
                  empty
                </Text>
              )}
              <Text color="#202023" fontWeight="bold" mt="0.5em">
                province:
              </Text>
              {province ? (
                <Text color="#202023" fontWeight="bold" pl="1em">
                  {province}
                </Text>
              ) : (
                <Text
                  color="#f0e7db"
                  bg={colorMode == "light" ? "white" : "#646467"}
                  borderRadius="md"
                  fontStyle="italic"
                  pl="1em"
                >
                  empty
                </Text>
              )}
              <Text color="#202023" fontWeight="bold" mt="1em">
                district:
              </Text>
              {district ? (
                <Text color="#202023" fontWeight="bold" pl="0.5em">
                  {district}
                </Text>
              ) : (
                <Text
                  color="#f0e7db"
                  bg={colorMode == "light" ? "white" : "#646467"}
                  borderRadius="md"
                  fontStyle="italic"
                  pl="1em"
                >
                  empty
                </Text>
              )}
              <Text color="#202023" fontWeight="bold" mt="1em">
                ward:
              </Text>
              {ward ? (
                <Text color="#202023" fontWeight="bold" pl="0.5em">
                  {ward}
                </Text>
              ) : (
                <Text
                  color="#f0e7db"
                  bg={colorMode == "light" ? "white" : "#646467"}
                  borderRadius="md"
                  fontStyle="italic"
                  pl="1em"
                >
                  empty
                </Text>
              )}
              <Text color="#202023" fontWeight="bold" mt="1em">
                phone number:
              </Text>
              {phoneNumber ? (
                <Text color="#202023" fontWeight="bold" pl="1em">
                  {`+84${phoneNumber}`}
                </Text>
              ) : (
                <Text
                  color="#f0e7db"
                  bg={colorMode == "light" ? "white" : "#646467"}
                  borderRadius="md"
                  fontStyle="italic"
                  pl="1em"
                >
                  empty
                </Text>
              )}
              <Text color="#202023" fontWeight="bold" mt="1em">
                detail address:
              </Text>
              {detailAddress ? (
                <Text color="#202023 " fontWeight="bold" pl="1em">
                  {detailAddress}
                </Text>
              ) : (
                <Text
                  color="#f0e7db"
                  bg={colorMode == "light" ? "white" : "#646467"}
                  borderRadius="md"
                  fontStyle="italic"
                  pl="1em"
                >
                  empty
                </Text>
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
