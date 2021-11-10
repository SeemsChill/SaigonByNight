import { ChakraProvider } from "@chakra-ui/react";
import Main from "@/components/layouts/main";
import theme from "@/libs/styles/theme";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/libs/firebase/auth";

const Global = ({ Component, pageProps, router }) => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Main router={router}>
          <AnimatePresence exitBeforeEnter initial={true}>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </Main>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default Global;
