import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import { styleConstants } from "../../theme/constants";
import Footer from "./Footer";
import Navbar from "./Navbar";

type Props = {};

function Layout({}: Props) {
  return (
    <Flex direction="column" minH="100vh" bg="blackAlpha.100">
      <Navbar />
      <Box flexGrow="1">
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  );
}

export default Layout;
