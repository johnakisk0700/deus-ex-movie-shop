import { Box, Flex, Text } from "@chakra-ui/react";
import { MdMovie } from "react-icons/md";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <Flex maxW="max-content">
        <MdMovie size={"46px"} />
        <Box>
          <Text fontSize="md" fontWeight="1000" height="0.845rem">
            MOVIE
          </Text>
          <Text
            fontSize="xl"
            fontWeight="1000"
            color="brand.200"
            textShadow="1px 1px 1px rgba(0,0,0,0.25)"
          >
            RENTER
          </Text>
        </Box>
      </Flex>
    </Link>
  );
}

export default Logo;
