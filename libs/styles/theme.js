import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const colors = {
  grassTeal: "#88ccca",
};

const fonts = {
  heading: "Roboto, Open Sans, sans-serif",
  body: "Roboto, Open Sans, sans-serif",
};

const styles = {
  global: (props) => ({
    body: {
      bg: mode("#f0e7db", "#202023")(props),
    },
  }),
};

const config = {
  initialColorMode: "light",
  useSystemColorMode: "true",
};

const components = {
  Link: {
    baseStyle: (props) => ({
      color: mode("#3d7aed", "#ff63c3")(props),
      textUnderlineOffset: 3,
    }),
  },
};

const theme = extendTheme({ config, styles, fonts, colors, components });
export default theme;
