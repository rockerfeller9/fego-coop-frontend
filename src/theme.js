import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const styles = {
  global: {
    "html, body, #__next": {
      height: "100%",
      minHeight: "100%",
    },
  },
};

const theme = extendTheme({ config, styles });

export default theme;
