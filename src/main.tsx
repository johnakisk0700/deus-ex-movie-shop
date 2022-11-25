import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { deusTheme } from "./theme";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ChakraProvider theme={deusTheme} resetCSS={true}>
          <App />
        </ChakraProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
