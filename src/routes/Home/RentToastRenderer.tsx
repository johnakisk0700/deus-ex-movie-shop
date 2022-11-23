import { CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Image,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { styleConstants } from "../../theme/constants";
import { IMovie } from "./Movie";

type Props = {
  movie: IMovie;
};

export const RentToastRenderer = ({ movie }: Props) => {
  const bg = useColorModeValue("white", "black");
  const toast = useToast();
  const navigate = useNavigate();
  return (
    <Flex
      flexDir="column"
      align="center"
      bg={bg}
      boxShadow="lg"
      p={6}
      px={12}
      borderRadius={styleConstants.borderRadius}
    >
      <Text
        textAlign="center"
        fontWeight="bold"
        fontSize="lg"
        display="flex"
        alignItems="center"
        gap={2}
        mx="auto"
      >
        Success! <CheckIcon color="green.300" fontSize="xl" />
      </Text>
      <Flex
        flexDir="column"
        mt={6}
        width="max-content"
        align="center"
        mx="auto"
      >
        <Image src={movie.poster_url} maxW="150px" />
        <Text fontSize="xl" maxWidth="150px" textAlign="center">
          {movie.title}
        </Text>
        <Flex
          justify="space-between"
          align="center"
          w="100%"
          my={4}
          bg="blackAlpha.100"
          p={1}
          borderRadius={styleConstants.borderRadius}
        >
          <Text fontSize="sm">Price:</Text>
          <Text fontWeight="bold">
            <Text as="span" fontSize="xs" fontStyle="italic" fontWeight="200">
              (on return){" "}
            </Text>
            1.00€
          </Text>
        </Flex>
        <Text color="GrayText" fontStyle="italic" fontSize="xs">
          Happy Watching!
        </Text>
      </Flex>
    </Flex>
  );
};
