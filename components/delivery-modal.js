import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  CloseButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { GrDeliver } from "react-icons/gr";
import { onFetchingDelivery } from "@/libs/engines/bill-engine";

export default function DeliveryModal({ bill }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { isOpen, onClose, onOpen } = useDisclosure();
  const router = useRouter();

  async function onDeliveryButton() {
    setLoading(true);

    const res = await onFetchingDelivery(bill.bill_uid);

    if (res.status == 202) {
      setLoading(false);
      setMessage("process was executed.");
    } else {
      setLoading(false);
      router.push("/");
    }
  }

  function onCloseAlert() {
    setMessage("");
  }

  return (
    <>
      <Button
        colorScheme="green"
        ml="0.6rem"
        px="1.5rem"
        py="1rem"
        onClick={onOpen}
      >
        <GrDeliver />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w={{ base: "20rem", md: "25rem" }}>
          <ModalHeader fontSize={{ base: "xl", md: "3xl" }}>
            Are you sure?
          </ModalHeader>
          <ModalCloseButton size="lg" top={{ base: "0.9em", md: "1.5em" }} />
          <ModalBody>
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
            <Text>Make sure client got the package.</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={loading}
              colorScheme="green"
              onClick={onDeliveryButton}
            >
              Yes!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
