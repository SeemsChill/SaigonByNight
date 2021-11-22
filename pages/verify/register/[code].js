import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
} from "@chakra-ui/react";
import Layout from "@/components/layouts/format";
import Loading from "@/components/loading";
import onRegisterVerifySubmit from "@/libs/engines/registerEngine";

export async function getServerSideProps(context) {
  const { code } = context.query;

  const res = await onRegisterVerifySubmit(code);

  return { props: { res } };
}

const Verify = ({ res }) => {
  const [afterFetching, setFetching] = useState(false);
  const [getResponse, setGetResponse] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  if (res && !getResponse) {
    setGetResponse(true);

    if (res.status == 410) {
      setMessage(
        "This email verification was expired, it was either verified the user or expired."
      );
    } else {
      setMessage(
        "We have activated your account. Thanks for using our website."
      );
    }

    setTimeout(() => {
      router.push("/signin");
    }, 3000);
  }

  useEffect(() => {
    if (getResponse) {
      if (res.code == 401) {
        router.push("/");
      } else {
        setFetching(true);
      }
    }
  }, [getResponse]);

  return (
    <>
      {afterFetching ? (
        <Layout title="Verify register page">
          <Center
            display="flex"
            h="70vh"
            justifyContent="center"
            maxW="container.lg"
            pt="2rem"
          >
            <Box as="div" display="flex" p="2rem">
              {message && (
                <Alert
                  alignItems="center"
                  borderRadius="10px"
                  flexDirection="column"
                  justifyContent="center"
                  status={res.code == 410 ? "warning" : "success"}
                  textAlign="center"
                  variant="subtle"
                >
                  <AlertIcon boxSize="40px" mr={0} />
                  <AlertTitle mt={4} mb={1} fontSize="lg">
                    {res.code == 410
                      ? "Email was expired."
                      : "Verified successfully."}
                  </AlertTitle>
                  <AlertDescription maxWidth="sm">{message}</AlertDescription>
                </Alert>
              )}
            </Box>
          </Center>
        </Layout>
      ) : (
        <Layout title="Verify register page">
          <Center
            display="flex"
            h="70vh"
            justifyContent="center"
            maxW="container.lg"
            pt="2rem"
          >
            <Loading />
          </Center>
        </Layout>
      )}
    </>
  );
};

export default Verify;
