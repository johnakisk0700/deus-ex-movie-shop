import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import { styleConstants } from "../../theme/constants";
import Footer from "./Footer";
import Navbar from "./Navbar";

type Props = {};

function Layout({}: Props) {
  const bg = useColorModeValue("white", "gray.900");
  return (
    <Flex direction="column" minH="100vh" bg={bg}>
      <Navbar />
      <Box flexGrow="1">
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  );
}

export default Layout;
