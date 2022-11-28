import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { deusTheme } from "./theme";

export const Providers = ({ children }: { children: JSX.Element }) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ChakraProvider theme={deusTheme} resetCSS={true}>
          {children}
        </ChakraProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
