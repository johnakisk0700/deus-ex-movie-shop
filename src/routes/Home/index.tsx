import { Container } from "@chakra-ui/react";
import React from "react";
import Movies from "./Movies";

type Props = {};

function HomePage({}: Props) {
  return (
    <Container maxW="8xl">
      <Movies />
    </Container>
  );
}

export default HomePage;
