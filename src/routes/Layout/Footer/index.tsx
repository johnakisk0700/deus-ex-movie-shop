import { Container } from "@chakra-ui/react";

type Props = {};

function Footer({}: Props) {
  return (
    <Container maxW="8xl" display="flex" justifyContent="center" mt={12}>
      MOVIE RENTER Copyright® 2022
    </Container>
  );
}

export default Footer;
