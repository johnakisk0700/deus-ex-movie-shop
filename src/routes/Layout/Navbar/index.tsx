import {
  Box,
  Button,
  Container,
  Flex,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useLocation } from "react-router-dom";
import Logo from "../../../components/Logo";
import { styleConstants } from "../../../theme/constants";
import UserDropdown from "./UserDropdown";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

type Props = {};

function Navbar({}: Props) {
  const { pathname } = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("white", "black");
  const modeBtnColor = useColorModeValue("black", "white");
  return (
    <>
      <Box
        height={styleConstants.navbarSize}
        position="sticky"
        top={0}
        zIndex={10}
        width="100%"
        bg={bg}
      >
        <Container
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          height="100%"
        >
          <Logo />
          <Flex align="center" gap={2}>
            {pathname !== "/login" ? <UserDropdown /> : null}
            <Button
              onClick={toggleColorMode}
              borderRadius="full"
              p={0.5}
              bg="transparent"
              colorScheme="brand"
              color={modeBtnColor}
            >
              {colorMode === "light" ? <SunIcon /> : <MoonIcon />}
            </Button>
          </Flex>
        </Container>
      </Box>
    </>
  );
}

export default Navbar;
