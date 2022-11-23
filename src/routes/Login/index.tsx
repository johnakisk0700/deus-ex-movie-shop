import { Box, Container, Flex } from "@chakra-ui/react";
import Logo from "../../components/Logo";
import LoginForm from "./LoginForm";

type Props = {};

function LoginPage({}: Props) {
  return (
    <Box mt={36}>
      <Container maxW="md">
        <LoginForm />
      </Container>
    </Box>
  );
}

export default LoginPage;
