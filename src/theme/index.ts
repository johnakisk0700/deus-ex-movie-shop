import { extendTheme } from "@chakra-ui/react";
import { menuTheme } from "./menu";

const colors = {
  brand: {
    50: "#cd002b",
    100: "#c40026",
    200: "#bb0121",
    300: "#b2011d",
    400: "#a90118",
    500: "#a10114",
    600: "#98010f",
    700: "#90010b",
    800: "#870005",
    900: "#7f0000",
  },
};
const components = {
  Container: {
    baseStyle: {
      maxW: "8xl",
    },
  },
  Menu: menuTheme,
};

const deusTheme = extendTheme({ colors, components });

export { deusTheme };
