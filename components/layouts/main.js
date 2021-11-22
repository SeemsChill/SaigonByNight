import Head from "next/head";
import Navbar from "../navbar";
import { Box, Container } from "@chakra-ui/react";

const Main = ({ children }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="SaigonByNight e-commerse web site." />
        <meta name="author" content="SeemsChill - BaTau - DaiZaDongThap." />
        <meta name="author" content="Devcat." />
        <title>Saigon-by-night</title>
      </Head>

      <Navbar />

      <Container maxW="container.lg" pt={"5rem"}>
        {children}
      </Container>
    </Box>
  );
};

export default Main;
