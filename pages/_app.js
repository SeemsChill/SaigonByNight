import { ChakraProvider } from "@chakra-ui/react";
import Main from "../components/layouts/main";
import theme from "../styles/theme";

// Global components.
const Global = ({ Component, pageProps, router }) => {
  return (
    <ChakraProvider theme={theme}>
      <Main router={router}>
        <Component {...pageProps} key={router.route} />
      </Main>
    </ChakraProvider>
  );
};

//	Export component.
export default Global;
